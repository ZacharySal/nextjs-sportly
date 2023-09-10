import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { gameId: string }}) {
    const gameDataResponse = await fetch(
        `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/summary?event=${params.gameId}`,  {
          cache: "no-cache",
    }
    );
    
    if (!gameDataResponse.ok) {
    throw new Error("Failed to fetch game data");
    }
    
    const gameData = await gameDataResponse.json();

    const homeTeam = gameData.header.competitions[0].competitors[0];
    const awayTeam = gameData.header.competitions[0].competitors[1];

    const homeTeamId = homeTeam.id;
    const awayTeamId = awayTeam.id;

    const homeTeamStatsResponse = await fetch(`https://sports.core.api.espn.com/v2/sports/basketball/leagues/nba/seasons/2023/types/2/teams/${homeTeamId}/statistics`);

    if (!homeTeamStatsResponse.ok) {
        throw new Error("Failed to fetch home team stats")
    }

    const homeTeamStats = await homeTeamStatsResponse.json();

    const awayTeamStatsResponse = await fetch(`https://sports.core.api.espn.com/v2/sports/basketball/leagues/nba/seasons/2023/types/2/teams/${awayTeamId}/statistics`);

    if (!awayTeamStatsResponse.ok) {
        throw new Error("Failed to fetch home team stats")
    }

    const awayTeamStats = await awayTeamStatsResponse.json();


  const winningTeam = homeTeam.winner ? homeTeam : awayTeam;

  const isGameStarted = gameData.lastFiveGames ? false : true;

  const backgroundColor = isGameStarted ? `#${winningTeam.team.color}` : "#013369";

  const gameInfo = gameData.header.competitions[0];

  const homeTeamDisplayStats: Record<string, any> = {
    "Points Per Game": homeTeamStats.splits.categories[2].stats[32],
    "Assists Per Game": homeTeamStats.splits.categories[2].stats[34],
    "Rebounds Per Game": homeTeamStats.splits.categories[1].stats[12],
    "Field Goal %": homeTeamStats.splits.categories[2].stats[5],
    "3 Point %": homeTeamStats.splits.categories[1].stats[13],
  };

  const awayTeamDisplayStats: Record<string, any> = {
    "Points Per Game": awayTeamStats.splits.categories[2].stats[32],
    "Assists Per Game": awayTeamStats.splits.categories[2].stats[34],
    "Rebounds Per Game": awayTeamStats.splits.categories[1].stats[12],
    "Field Goal %": awayTeamStats.splits.categories[2].stats[5],
    "3 Point %": awayTeamStats.splits.categories[1].stats[13],
  };

  return NextResponse.json({"gameData":gameData, "homeTeam":homeTeam, "awayTeam":awayTeam, "homeTeamStats":homeTeamDisplayStats, "awayTeamStats":awayTeamDisplayStats, "winningTeam":winningTeam, "isGameStarted":isGameStarted, "backgroundColor": backgroundColor, "gameInfo":gameInfo});
}