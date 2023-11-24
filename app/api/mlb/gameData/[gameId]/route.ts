import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: { gameId: string } }) {
  const gameDataResponse = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/summary?event=${params.gameId}`
  );

  if (!gameDataResponse.ok) {
    throw new Error("Failed to fetch game data");
  }

  const gameData = await gameDataResponse.json();

  const homeTeam = gameData.header.competitions[0].competitors[0];
  const awayTeam = gameData.header.competitions[0].competitors[1];
  const homeTeamId = homeTeam.id;
  const awayTeamId = awayTeam.id;

  const homeTeamStatsResponse = await fetch(
    `https://sports.core.api.espn.com/v2/sports/baseball/leagues/mlb/seasons/2023/types/2/teams/${homeTeamId}/statistics`
  );

  if (!homeTeamStatsResponse.ok) {
    throw new Error("Failed to fetch home team stats");
  }

  const homeTeamStats = await homeTeamStatsResponse.json();

  const awayTeamStatsResponse = await fetch(
    `https://sports.core.api.espn.com/v2/sports/baseball/leagues/mlb/seasons/2023/types/2/teams/${awayTeamId}/statistics`
  );

  if (!awayTeamStatsResponse.ok) {
    throw new Error("Failed to fetch home team stats");
  }

  const awayTeamStats = await awayTeamStatsResponse.json();

  const homeTeamDisplayStats: Record<string, any> = {
    Runs: homeTeamStats.splits.categories[0].stats[11],
    "Batting Avg": homeTeamStats.splits.categories[0].stats[37],
    "On Base %": homeTeamStats.splits.categories[0].stats[41],
    "Slugging %": homeTeamStats.splits.categories[0].stats[39],
    "Strike Outs": homeTeamStats.splits.categories[1].stats[4],
    "Quality Starts": homeTeamStats.splits.categories[1].stats[40],
    WHIP: homeTeamStats.splits.categories[1].stats[53],
    OBA: homeTeamStats.splits.categories[1].stats[61],
    Errors: homeTeamStats.splits.categories[2].stats[4],
  };

  const awayTeamDisplayStats: Record<string, any> = {
    Runs: awayTeamStats.splits.categories[0].stats[11],
    "Batting Avg": awayTeamStats.splits.categories[0].stats[37],
    "On Base %": awayTeamStats.splits.categories[0].stats[41],
    "Slugging %": awayTeamStats.splits.categories[0].stats[39],
    "Strike Outs": awayTeamStats.splits.categories[1].stats[4],
    "Quality Starts": awayTeamStats.splits.categories[1].stats[40],
    WHIP: awayTeamStats.splits.categories[1].stats[53],
    OBA: awayTeamStats.splits.categories[1].stats[61],
    Errors: awayTeamStats.splits.categories[2].stats[4],
  };

  const winningTeam = homeTeam.winner ? homeTeam : awayTeam;
  const isGameStarted = gameData.lastFiveGames ? false : true;
  const backgroundColor = isGameStarted ? `#${winningTeam.team.color}` : "gray";
  const gameInfo = gameData.header.competitions[0];

  return NextResponse.json({
    gameData: gameData,
    homeTeam: homeTeam,
    awayTeam: awayTeam,
    homeTeamStats: homeTeamDisplayStats,
    awayTeamStats: awayTeamDisplayStats,
    winningTeam: winningTeam,
    isGameStarted: isGameStarted,
    backgroundColor: backgroundColor,
    gameInfo: gameInfo,
  });
}
