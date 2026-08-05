import { getPortfolioRepos } from "@/lib/notion";

export const dynamic = "force-dynamic";

export default async function Page() {
  const repos = await getPortfolioRepos();

  return (
    <main className="mx-auto max-w-5xl p-6 sm:p-10">
      <section className="mb-10 overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 px-6 py-10 sm:px-10 sm:py-14">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold text-white sm:text-4xl">포트폴리오</h1>
            <p className="mt-2 max-w-md text-sm text-indigo-100 sm:text-base">
              Vibe Coding 수업에서 만든 프로젝트 중 실제로 배포까지 완료한 작업들입니다.
            </p>
          </div>
          <svg
            viewBox="0 0 200 140"
            className="h-28 w-40 shrink-0 drop-shadow-lg sm:h-32 sm:w-48"
            aria-hidden="true"
          >
            <rect x="10" y="55" width="80" height="60" rx="10" fill="#ffffff" fillOpacity="0.95" />
            <rect x="18" y="65" width="64" height="8" rx="4" fill="#a5b4fc" />
            <rect x="18" y="80" width="46" height="6" rx="3" fill="#e0e7ff" />
            <rect x="18" y="92" width="54" height="6" rx="3" fill="#e0e7ff" />

            <rect x="100" y="30" width="90" height="65" rx="10" fill="#ffffff" />
            <circle cx="114" cy="44" r="4" fill="#f472b6" />
            <circle cx="126" cy="44" r="4" fill="#facc15" />
            <circle cx="138" cy="44" r="4" fill="#34d399" />
            <rect x="112" y="56" width="66" height="7" rx="3.5" fill="#c7d2fe" />
            <rect x="112" y="68" width="50" height="6" rx="3" fill="#e0e7ff" />
            <rect x="112" y="80" width="60" height="6" rx="3" fill="#e0e7ff" />
          </svg>
        </div>
      </section>
      {repos.length === 0 ? (
        <p className="text-zinc-500">표시할 저장소가 없습니다.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {repos.map((repo) => (
            <a
              key={repo.id}
              href={repo.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block overflow-hidden rounded-xl border border-zinc-200 bg-white transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              {repo.coverUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={repo.coverUrl}
                  alt={repo.title}
                  className="h-40 w-full object-cover"
                />
              ) : (
                <div className="h-40 w-full bg-zinc-100" />
              )}
              <div className="p-4">
                <h2 className="font-semibold text-zinc-900">{repo.title}</h2>
                {repo.description && (
                  <p className="mt-1 text-sm text-zinc-600">{repo.description}</p>
                )}
              </div>
            </a>
          ))}
        </div>
      )}
    </main>
  );
}
