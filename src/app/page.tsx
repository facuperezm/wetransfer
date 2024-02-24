import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Uploader from "@/components/uploader";

export default function Home() {
  return (
    <main className="flex justify-center items-center h-screen p-3">
      <Card>
        <CardHeader className="pb-0">
          <CardTitle>Upload your files</CardTitle>
          <CardDescription>You can upload up to 2GB of files</CardDescription>
        </CardHeader>
        <CardContent className="">
          <Uploader />
        </CardContent>
      </Card>
    </main>
  );
}
