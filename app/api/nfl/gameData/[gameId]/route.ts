import { NFLPlay } from "@/types";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { gameId: string } },
) {
  const gameDataResponse = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/football/nfl/summary?event=${params.gameId}`,
    {
      cache: "no-cache",
    },
  );

  if (!gameDataResponse.ok) {
    throw new Error("Failed to fetch game data");
  }

  const gameData = await gameDataResponse.json();

  const gameInfo = gameData.header.competitions[0];

  let firstQuarterScoringPlays: Array<NFLPlay> = [];
  let secondQuarterScoringPlays: Array<NFLPlay> = [];
  let thirdQuarterScoringPlays: Array<NFLPlay> = [];
  let fourthQuarterScoringPlays: Array<NFLPlay> = [];

  const isGameStarted = gameData.drives ? true : false;

  if (isGameStarted && gameData?.scoringPlays?.length > 0) {
    gameData.scoringPlays.map((play: any) => {
      if (play.period.number === 1) {
        firstQuarterScoringPlays.push(play);
      } else if (play.period.number === 2) {
        secondQuarterScoringPlays.push(play);
      } else if (play.period.number === 3) {
        thirdQuarterScoringPlays.push(play);
      } else if (play.period.number === 4) {
        fourthQuarterScoringPlays.push(play);
      }
    });
  }

  return NextResponse.json({
    gameData: gameData,
    homeTeam: gameData.header.competitions[0].competitors[0],
    awayTeam: gameData.header.competitions[0].competitors[1],
    isGameStarted: gameData.lastFiveGames ? false : true,
    gameInfo: gameInfo,
    scoringPlays: {
      firstQuarterScoringPlays,
      secondQuarterScoringPlays,
      thirdQuarterScoringPlays,
      fourthQuarterScoringPlays,
    },
  });
}
