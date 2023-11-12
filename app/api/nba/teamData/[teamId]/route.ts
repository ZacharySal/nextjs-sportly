import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { teamId: string } }) {
  const teamDataResponse = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/${params.teamId}`,
    {
      cache: "no-cache",
    }
  );

  if (!teamDataResponse.ok) {
    throw new Error("Failed to fetch team data");
  }

  const teamData = await teamDataResponse.json();

  const teamScheduleResponse = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/${params.teamId}/schedule`,
    {
      cache: "no-cache",
    }
  );

  if (!teamScheduleResponse.ok) {
    throw new Error("Failed to fetch team data");
  }

  const teamSchedule = await teamScheduleResponse.json();

  const teamStatsResponse = await fetch(
    `https://sports.core.api.espn.com/v2/sports/basketball/leagues/nba/seasons/2024/types/2/teams/${params.teamId}/statistics`,
    {
      cache: "no-cache",
    }
  );

  if (!teamStatsResponse.ok) {
    throw new Error("Failed to fetch team data");
  }

  const teamStats = await teamStatsResponse.json();

  const teamNewsResponse = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/news?team=${params.teamId}`,
    {
      cache: "no-cache",
    }
  );

  if (!teamNewsResponse.ok) {
    throw new Error("Failed to fetch team news");
  }

  const teamNews = await teamNewsResponse.json();

  const teamRosterResponse = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/${params.teamId}/roster`
  );

  if (!teamRosterResponse.ok) {
    throw new Error("Failed to fetch team data");
  }

  const teamRoster = await teamRosterResponse.json();

  const displayStats: Record<string, any> = {
    "Points Per Game": teamStats.splits.categories[2].stats[32],
    "Assists Per Game": teamStats.splits.categories[2].stats[34],
    "Rebounds Per Game": teamStats.splits.categories[1].stats[12],
    "Field Goal %": teamStats.splits.categories[2].stats[5],
    "3 Point %": teamStats.splits.categories[1].stats[13],
  };

  const fullStats: Record<string, any> = {
    Offensive: [
      teamStats.splits.categories[2].stats[0],
      teamStats.splits.categories[2].stats[2],
      teamStats.splits.categories[2].stats[5],
      teamStats.splits.categories[2].stats[7],
      teamStats.splits.categories[2].stats[10],
      teamStats.splits.categories[2].stats[11],
      teamStats.splits.categories[2].stats[12],
      teamStats.splits.categories[2].stats[13],
      teamStats.splits.categories[2].stats[18],
      teamStats.splits.categories[2].stats[20],
    ],
    Defensive: [
      teamStats.splits.categories[0].stats[0],
      teamStats.splits.categories[0].stats[1],
      teamStats.splits.categories[0].stats[2],
      teamStats.splits.categories[0].stats[3],
      teamStats.splits.categories[0].stats[6],
      teamStats.splits.categories[0].stats[7],
    ],
    General: [
      teamStats.splits.categories[1].stats[1],
      teamStats.splits.categories[1].stats[2],
      teamStats.splits.categories[1].stats[4],
      teamStats.splits.categories[1].stats[5],
      teamStats.splits.categories[1].stats[6],
    ],
  };

  return NextResponse.json({
    teamData: teamData,
    teamSchedule: teamSchedule,
    teamStats: displayStats,
    fullTeamStats: fullStats,
    teamNews: teamNews,
    teamRoster: teamRoster,
  });
}
