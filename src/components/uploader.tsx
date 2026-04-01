"use client";

import { useFormState, useFormStatus } from "react-dom";
import { uploadFile, type UploadResult } from "@/lib/actions";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type State = UploadResult | null;

async function action(_prev: State, fd: FormData): Promise<State> {
  return uploadFile(fd);
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Uploading\u2026" : "Upload"}
    </Button>
  );
}

export default function Uploader() {
  const [state, formAction] = useFormState<State, FormData>(action, null);

  return (
    <form action={formAction} className="flex flex-col gap-3 mt-2">
      <div className="flex md:flex-row flex-col gap-2">
        <Input
          type="file"
          name="file"
          aria-label="Choose a file to upload"
        />
        <SubmitButton />
      </div>

      {state?.success === true && (
        <p className="text-sm text-green-500" role="status">
          &ldquo;{state.fileName}&rdquo; uploaded successfully.
        </p>
      )}

      {state?.success === false && (
        <p className="text-sm text-destructive" role="alert">
          {state.error}
        </p>
      )}
    </form>
  );
}
