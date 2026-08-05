const NOTION_VERSION = "2025-09-03";

export async function getPortfolioRepos() {
  const dataSourceId = process.env.NOTION_DATA_SOURCE_ID;
  const token = process.env.NOTION_TOKEN;

  if (!token || !dataSourceId) {
    throw new Error("NOTION_TOKEN 또는 NOTION_DATA_SOURCE_ID 환경변수가 설정되지 않았습니다.");
  }

  const res = await fetch(`https://api.notion.com/v1/data_sources/${dataSourceId}/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      filter: {
        property: "포트폴리오 노출",
        checkbox: { equals: true },
      },
      sorts: [{ property: "마지막푸시일", direction: "descending" }],
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Notion API error (${res.status}): ${text}`);
  }

  const data = await res.json();

  return data.results.map((page) => {
    const props = page.properties;
    const title = props["저장소명"]?.title?.[0]?.plain_text ?? "(제목 없음)";
    const description = props["설명"]?.rich_text?.[0]?.plain_text ?? "";
    const coverFile = props["커버이미지"]?.files?.[0];
    const coverUrl = coverFile?.external?.url ?? coverFile?.file?.url ?? null;
    const deployUrl = props["배포 URL"]?.url ?? null;

    return {
      id: page.id,
      title,
      description,
      coverUrl,
      linkUrl: deployUrl ?? page.url,
    };
  });
}
