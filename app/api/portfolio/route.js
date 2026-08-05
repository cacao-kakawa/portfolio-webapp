import { NextResponse } from "next/server";
import { getPortfolioRepos } from "@/lib/notion";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const repos = await getPortfolioRepos();
    return NextResponse.json({ repos });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
