"use server";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { r2 } from "./cloudflare";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export async function uploadFile(fd: FormData) {
  const file = fd.get("file");

  if (!file) {
    return;
  }

  const signedUrl = await getSignedUrl(
    r2,
    new PutObjectCommand({
      Bucket: "wetransferclone-dev",
      Key: (file as File).name,
      ContentType: "image/jpg",
    }),
    { expiresIn: 10000 }
  );

  console.log((file as File).name, signedUrl);
  await fetch(signedUrl, {
    method: "PUT",
    body: fd.get("file")!,
    headers: {
      "Content-Type": "image/jpg",
    },
  });

  return;
}
