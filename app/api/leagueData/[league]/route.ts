import { ScoreData } from "@/types";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { league: string } },
) {
  console.log("HERE!");
  const scoreboardData = await fetch(
    `https://cdn.espn.com/core/${params.league}/scoreboard?xhr=1`,
    {
      cache: "no-cache",
    },
  );

  if (!scoreboardData.ok) {
    throw new Error("Failed to fetch NBA score data");
  }

  const scoreboardDataResponse: ScoreData = await scoreboardData.json();

  return NextResponse.json(scoreboardDataResponse);
}
