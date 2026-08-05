export default function Loading() {
  return (
    <main className="mx-auto max-w-5xl p-6 sm:p-10">
      <h1 className="mb-8 text-2xl font-bold text-zinc-900">포트폴리오</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse overflow-hidden rounded-xl border border-zinc-200"
          >
            <div className="h-40 w-full bg-zinc-200" />
            <div className="space-y-2 p-4">
              <div className="h-4 w-2/3 rounded bg-zinc-200" />
              <div className="h-3 w-full rounded bg-zinc-200" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
