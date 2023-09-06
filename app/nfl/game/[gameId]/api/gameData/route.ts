import { NextResponse } from "next/server"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const gameId = searchParams.get('gameId');

    console.log(`Game ID in api route: ${gameId}`);
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


  let firstQuarterScoringPlays: any[] = [];
  let secondQuarterScoringPlays: any[] = [];
  let thirdQuarterScoringPlays: any[] = [];
  let fourthQuarterScoringPlays: any[] = [];

  const homeTeam = gameData.header.competitions[0].competitors[0];
  const awayTeam = gameData.header.competitions[0].competitors[1];

  const winningTeam = homeTeam.winner ? homeTeam : awayTeam;
  const isGameStarted = gameData.lastFiveGames ? false : true;
  // backgroundColor = isGameStarted ? `#${winningTeam.team.color}` : "#013369";
  const backgroundColor = "#013369";
  const gameInfo = gameData.header.competitions[0];

  const homeTeamDisplayStats = {
    "Passing YPG": homeTeamStats.splits.categories[1].stats[9],
    "Rushing YPG": homeTeamStats.splits.categories[2].stats[13],
    "Total YPG": homeTeamStats.splits.categories[1].stats[10],
    "Total PPG": homeTeamStats.splits.categories[1].stats[30],
    YAC: homeTeamStats.splits.categories[3].stats[13],
    "3rd Down %": homeTeamStats.splits.categories[10].stats[14],
    "Turnover Diff":
      homeTeamStats.splits.categories[10].stats[21],
    Sacks: homeTeamStats.splits.categories[4].stats[14],
  };

  const awayTeamDisplayStats = {
    "Passing YPG": awayTeamStats.splits.categories[1].stats[9],
    "Rushing YPG": awayTeamStats.splits.categories[2].stats[13],
    "Total YPG": awayTeamStats.splits.categories[1].stats[10],
    "Total PPG": awayTeamStats.splits.categories[1].stats[30],
    YAC: awayTeamStats.splits.categories[3].stats[13],
    "3rd Down %": awayTeamStats.splits.categories[10].stats[14],
    "Turnover Diff":
      awayTeamStats.splits.categories[10].stats[21],
    Sacks: awayTeamStats.splits.categories[4].stats[14],
  };

  if (isGameStarted) {
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

    return NextResponse.json({"gameData": gameData, "homeTeam":homeTeam, "awayTeam":awayTeam, "homeTeamStats": homeTeamDisplayStats, "awayTeamStats": awayTeamDisplayStats, "gameInfo": gameInfo, "isGameStarted":isGameStarted, "winningTeam": winningTeam, "backgroundColor": backgroundColor, "firstQuarterScoringPlays": firstQuarterScoringPlays, "secondQuarterScoringPlays": secondQuarterScoringPlays, "thirdQuarterScoringPlays": thirdQuarterScoringPlays, "fourthQuarterScoringPlays": fourthQuarterScoringPlays});
}