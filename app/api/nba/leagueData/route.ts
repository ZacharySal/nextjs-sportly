import { NextResponse } from "next/server";

export async function GET() {
  const scoreData = await fetch(`https://cdn.espn.com/core/nba/scoreboard?xhr=1`, {
    next: { revalidate: 10 },
  });

  if (!scoreData.ok) {
    throw new Error("Failed to fetch NBA score data");
  }

  const scoreDataResponse = await scoreData.json();

  return NextResponse.json({
    scoreData: scoreDataResponse,
  });
}
