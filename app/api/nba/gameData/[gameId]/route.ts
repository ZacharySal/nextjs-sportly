import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { gameId: string } }) {
  const gameDataResponse = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/summary?event=${params.gameId}`,
    {
      cache: "no-cache",
    }
  );

  if (!gameDataResponse.ok) {
    throw new Error("Failed to fetch game data");
  }

  const gameData = await gameDataResponse.json();

  const gameInfo = gameData.header.competitions[0];

  return NextResponse.json({
    gameData: gameData,
    homeTeam: gameData.header.competitions[0].competitors[0],
    awayTeam: gameData.header.competitions[0].competitors[1],
    isGameStarted: gameData.lastFiveGames ? false : true,
    gameInfo: gameInfo,
  });
}
