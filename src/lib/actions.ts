"use server";

import crypto from "node:crypto";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { r2 } from "./cloudflare";
import { env } from "@/env";

const MAX_FILE_SIZE = 2 * 1024 * 1024 * 1024; // 2 GB
const PRESIGNED_URL_TTL = 600; // 10 minutes

export type UploadResult =
  | { success: true; fileName: string }
  | { success: false; error: string };

export async function uploadFile(fd: FormData): Promise<UploadResult> {
  try {
    const file = fd.get("file");

    if (!file || !(file instanceof File) || file.size === 0) {
      return { success: false, error: "No file provided." };
    }

    if (file.size > MAX_FILE_SIZE) {
      return { success: false, error: "File exceeds the 2 GB size limit." };
    }

    const ext = file.name.includes(".")
      ? `.${file.name.split(".").pop()?.toLowerCase()}`
      : "";
    const safeKey = `${crypto.randomUUID()}${ext}`;
    const contentType = file.type || "application/octet-stream";

    const signedUrl = await getSignedUrl(
      r2,
      new PutObjectCommand({
        Bucket: env.R2_BUCKET_NAME,
        Key: safeKey,
        ContentType: contentType,
      }),
      { expiresIn: PRESIGNED_URL_TTL }
    );

    const response = await fetch(signedUrl, {
      method: "PUT",
      body: file,
      headers: { "Content-Type": contentType },
    });

    if (!response.ok) {
      return {
        success: false,
        error: "Upload to storage failed. Please try again.",
      };
    }

    return { success: true, fileName: file.name };
  } catch (error) {
    console.error(
      "Upload failed:",
      error instanceof Error ? error.message : error
    );
    return { success: false, error: "An unexpected error occurred." };
  }
}
