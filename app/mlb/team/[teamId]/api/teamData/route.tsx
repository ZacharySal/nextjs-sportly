import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const teamId = searchParams.get("teamId");

  const teamDataResponse = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/teams/${teamId}`
  );

  if (!teamDataResponse.ok) {
    throw new Error("Faied to fetch team data");
  }

  const teamData = await teamDataResponse.json();

  const teamScheduleResponse = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/teams/${teamId}/schedule`
  );

  if (!teamScheduleResponse.ok) {
    throw new Error("Faied to fetch team data");
  }

  const teamSchedule = await teamScheduleResponse.json();

  const teamStatsResponse = await fetch(
    `https://sports.core.api.espn.com/v2/sports/baseball/leagues/mlb/seasons/2023/types/2/teams/${teamId}/statistics`
  );

  if (!teamStatsResponse.ok) {
    throw new Error("Faied to fetch team data");
  }

  const teamStats = await teamStatsResponse.json();

  const displayStats: Record<string, any> = {
    Runs: teamStats.splits.categories[0].stats[11],
    "Batting Avg": teamStats.splits.categories[0].stats[37],
    "On Base %": teamStats.splits.categories[0].stats[41],
    "Slugging %": teamStats.splits.categories[0].stats[39],
    "Strike Outs": teamStats.splits.categories[1].stats[4],
    "Quality Starts": teamStats.splits.categories[1].stats[40],
    WHIP: teamStats.splits.categories[1].stats[53],
    OBA: teamStats.splits.categories[1].stats[61],
  };

  const teamNewsResponse = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/news?team=${teamId}`
  );

  if (!teamNewsResponse.ok) {
    throw new Error("Faied to fetch team data");
  }

  const teamNews = await teamNewsResponse.json();

  return NextResponse.json({
    teamData: teamData,
    teamSchedule: teamSchedule,
    teamStats: displayStats,
    teamNews: teamNews,
  });
}
