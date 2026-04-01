"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex flex-col justify-center items-center h-screen gap-4 p-3">
      <h2 className="text-lg font-semibold text-foreground">
        Something went wrong
      </h2>
      <p className="text-sm text-muted-foreground">
        {error.message || "An unexpected error occurred."}
      </p>
      <button
        onClick={reset}
        className="text-sm underline text-primary hover:text-primary/80"
      >
        Try again
      </button>
    </main>
  );
}
