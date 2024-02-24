"use client";

import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";

export default function Uploader() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h1>Transfer up to 1GB</h1>
        </CardTitle>
        <CardDescription>
          <p>Send up to 1GB of files for free. No registration required.</p>
        </CardDescription>
        <CardContent className="p-0">
          <form className="flex md:flex-row flex-col gap-2 mt-2">
            <Input
              type="file"
              accept="image/*"
              placeholder="Choose or select your file"
            />
            <Button>Upload</Button>
          </form>
        </CardContent>
      </CardHeader>
    </Card>
  );
}
