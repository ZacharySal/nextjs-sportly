import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { teamId: string } }) {
  const teamDataResponse = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${params.teamId}`,
    {
      cache: "no-cache",
    }
  );

  if (!teamDataResponse.ok) {
    throw new Error("Failed to fetch team data");
  }

  const teamData = await teamDataResponse.json();

  const teamScheduleResponse = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${params.teamId}/schedule`,
    {
      cache: "no-cache",
    }
  );

  if (!teamScheduleResponse.ok) {
    throw new Error("Failed to fetch team data");
  }

  const teamSchedule = await teamScheduleResponse.json();

  const teamStatsResponse = await fetch(
    `https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2023/types/2/teams/${params.teamId}/statistics`,
    {
      cache: "no-cache",
    }
  );

  if (!teamStatsResponse.ok) {
    throw new Error("Failed to fetch team data");
  }

  const teamStats = await teamStatsResponse.json();

  const teamNewsResponse = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/football/nfl/news?team=${params.teamId}`,
    {
      cache: "no-cache",
    }
  );

  if (!teamNewsResponse.ok) {
    throw new Error("Failed to fetch team news");
  }

  const teamNews = await teamNewsResponse.json();

  const displayStats = {
    "Passing YPG": teamStats.splits.categories[1].stats[9],
    "Rushing YPG": teamStats.splits.categories[2].stats[13],
    "Total PPG": teamStats.splits.categories[1].stats[30],
    "3rd Down %": teamStats.splits.categories[10].stats[14],
    "Turnover Diff": teamStats.splits.categories[10].stats[21],
  };

  const fullStats: Record<string, any> = {
    Scoring: [
      teamStats.splits.categories[9].stats[9],
      teamStats.splits.categories[9].stats[8],
      teamStats.splits.categories[9].stats[10],
    ],
    "1st downs": [
      teamStats.splits.categories[10].stats[0],
      teamStats.splits.categories[10].stats[4],
      teamStats.splits.categories[10].stats[1],
      teamStats.splits.categories[10].stats[2],
      teamStats.splits.categories[10].stats[15],
      teamStats.splits.categories[10].stats[6],
    ],
    Passing: [
      teamStats.splits.categories[1].stats[1],
      teamStats.splits.categories[1].stats[8],
      teamStats.splits.categories[1].stats[40],
      teamStats.splits.categories[1].stats[9],
      teamStats.splits.categories[1].stats[18],
      teamStats.splits.categories[1].stats[5],
      teamStats.splits.categories[1].stats[25],
    ],
    Rushing: [
      teamStats.splits.categories[2].stats[6],
      teamStats.splits.categories[2].stats[12],
      teamStats.splits.categories[2].stats[28],
      teamStats.splits.categories[2].stats[13],
      teamStats.splits.categories[2].stats[11],
    ],
    Returns: [
      teamStats.splits.categories[7].stats[32],
      teamStats.splits.categories[7].stats[31],
      teamStats.splits.categories[7].stats[27],
    ],
    Kicking: [
      teamStats.splits.categories[8].stats[4],
      teamStats.splits.categories[8].stats[14],
      teamStats.splits.categories[6].stats[17],
    ],
    Penalties: [
      teamStats.splits.categories[10].stats[18],
      teamStats.splits.categories[10].stats[19],
    ],
    "Time Of Possession": [teamStats.splits.categories[10].stats[9]],
    Miscellaneous: [
      teamStats.splits.categories[0].stats[0],
      teamStats.splits.categories[0].stats[1],
      teamStats.splits.categories[0].stats[2],
    ],
  };

  return NextResponse.json({
    teamData: teamData,
    teamSchedule: teamSchedule,
    teamStats: displayStats,
    fullTeamStats: fullStats,
    teamNews: teamNews,
  });
}
