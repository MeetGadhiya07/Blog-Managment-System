export default function Loading() {
  return (
    <article className="mx-auto max-w-4xl animate-pulse px-4 py-8">
      <div className="mb-4 h-4 w-32 rounded bg-gray-200" />
      <div className="mb-6 h-96 w-full rounded-lg bg-gray-200" />

      <header className="mb-8">
        <div className="mb-4 h-10 w-3/4 rounded bg-gray-200" />
        <div className="mb-4 flex gap-4">
          <div className="h-4 w-24 rounded bg-gray-200" />
          <div className="h-4 w-32 rounded bg-gray-200" />
        </div>
        <div className="mb-2 h-6 w-full rounded bg-gray-200" />
        <div className="h-6 w-5/6 rounded bg-gray-200" />
      </header>

      <div className="space-y-4">
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-4/5 rounded bg-gray-200" />
      </div>
    </article>
  );
}
