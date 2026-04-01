export default function NotFound() {
  return (
    <main className="flex flex-col justify-center items-center h-screen gap-4 p-3">
      <h2 className="text-lg font-semibold text-foreground">Page not found</h2>
      <p className="text-sm text-muted-foreground">
        The page you are looking for does not exist.
      </p>
    </main>
  );
}
