"use client";

import { uploadFile } from "@/lib/actions";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function Uploader() {
  return (
    <form action={(fd) => { uploadFile(fd); }} className="flex md:flex-row flex-col gap-2 mt-2">
      <Input type="file" name="file" />
      <Button>Upload</Button>
    </form>
  );
}
