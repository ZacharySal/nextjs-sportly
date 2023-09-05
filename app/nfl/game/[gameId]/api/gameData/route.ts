import { NextResponse } from "next/server"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const gameId = searchParams.get('gameId');

    const gameDataResponse = await fetch(
        `https://site.api.espn.com/apis/site/v2/sports/football/nfl/summary?event=${gameId}`
      );
    
      if (!gameDataResponse.ok) {
        throw new Error("Failed to fetch game data");
      }
    
    const gameData = await gameDataResponse.json();

    const homeTeamId = gameData.header.competitions[0].competitors[0].id;
    const awayTeamId = gameData.header.competitions[0].competitors[1].id;

    const homeTeamStatsResponse = await fetch(`https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2023/types/1/teams/${homeTeamId}/statistics`);

    if (!homeTeamStatsResponse.ok) {
        throw new Error("Failed to fetch home team stats")
    }

    const homeTeamStats = await homeTeamStatsResponse.json();

    const awayTeamStatsResponse = await fetch(`https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2023/types/1/teams/${awayTeamId}/statistics`);

    if (!awayTeamStatsResponse.ok) {
        throw new Error("Failed to fetch home team stats")
    }

    const awayTeamStats = await awayTeamStatsResponse.json();

    return NextResponse.json({"gameData": gameData, "homeTeamStats": homeTeamStats, "awayTeamStats": awayTeamStats});
}