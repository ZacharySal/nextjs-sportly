"use server";

type League = "nba" | "nfl" | "mlb";
import type { ScoreData } from "@/types";

export async function getNBAGameData(gameId: string) {
  const gameDataResponse = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/summary?event=${gameId}`
  );

  if (!gameDataResponse.ok) {
    throw new Error("Failed to fetch game data");
  }

  const gameData = await gameDataResponse.json();

  const gameInfo = gameData.header.competitions[0];

  return {
    gameData: gameData,
    homeTeam: gameData.header.competitions[0].competitors[0],
    awayTeam: gameData.header.competitions[0].competitors[1],
    isGameStarted: gameData.lastFiveGames ? false : true,
    gameInfo: gameInfo,
  };
}

export async function getNFLGameData(gameId: string) {
  const gameDataResponse = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/football/nfl/summary?event=${gameId}`
  );

  if (!gameDataResponse.ok) {
    throw new Error("Failed to fetch game data");
  }

  const gameData = await gameDataResponse.json();

  const gameInfo = gameData.header.competitions[0];

  let firstQuarterScoringPlays: any[] = [];
  let secondQuarterScoringPlays: any[] = [];
  let thirdQuarterScoringPlays: any[] = [];
  let fourthQuarterScoringPlays: any[] = [];
  const isGameStarted = gameData.drives ? true : false;

  if (isGameStarted && gameData.scoringPlays?.length > 0) {
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

  return {
    gameData: gameData,
    homeTeam: gameData.header.competitions[0].competitors[0],
    awayTeam: gameData.header.competitions[0].competitors[1],
    isGameStarted: gameData.lastFiveGames ? false : true,
    gameInfo: gameInfo,
    firstQuarterScoringPlays: firstQuarterScoringPlays,
    secondQuarterScoringPlays: secondQuarterScoringPlays,
    thirdQuarterScoringPlays: thirdQuarterScoringPlays,
    fourthQuarterScoringPlays: fourthQuarterScoringPlays,
  };
}

export async function getLeagueScoreData(league: League) {
  const scoreData = await fetch(`https://cdn.espn.com/core/${league}/scoreboard?xhr=1`);

  if (!scoreData.ok) {
    throw new Error("Failed to fetch NBA score data");
  }

  const scoreDataResponse: ScoreData = await scoreData.json();

  return {
    scoreData: scoreDataResponse,
  };
}

export async function getLeagueNewsData(league: League) {
  const newsData = await fetch(`https://cdn.espn.com/core/${league}/scoreboard?xhr=1`);

  if (!newsData.ok) {
    throw new Error("Failed to fetch NBA score data");
  }

  const newsDataResponse = await newsData.json();

  return newsDataResponse.news;
}

export async function getLeagueStandingsData(league: League) {
  const newsData = await getLeagueNewsData(league);
  const standingsData = await fetch(`https://cdn.espn.com/core/${league}/standings?xhr=1`, {
    cache: "no-cache",
  });

  if (!standingsData.ok) {
    throw new Error("Failed to fetch NBA standings data");
  }

  const standingsDataResponse = await standingsData.json();

  return {
    newsData: newsData,
    standingsData: standingsDataResponse,
  };
}

export async function getTeamNews(league: League, teamId: string) {
  const sport = league === "nba" ? "basketball" : league === "mlb" ? "baseball" : "football";
  const teamNewsResponse = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/${sport}/${league}/news?team=${teamId}`
  );

  if (!teamNewsResponse.ok) {
    throw new Error("Failed to fetch team news");
  }

  const teamNews = await teamNewsResponse.json();

  return teamNews;
}

export async function getTeamRoster(league: League, teamId: string) {
  const sport = league === "nba" ? "basketball" : league === "mlb" ? "baseball" : "football";
  const teamRosterResponse = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/${sport}/${league}/teams/${teamId}/roster`
  );

  if (!teamRosterResponse.ok) {
    throw new Error("Failed to fetch team data");
  }

  const teamRoster = await teamRosterResponse.json();
  return teamRoster;
}

export async function getTeamSchedule(league: League, teamId: string) {
  const sport = league === "nba" ? "basketball" : league === "mlb" ? "baseball" : "football";
  const teamScheduleResponse = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/${sport}/${league}/teams/${teamId}/schedule`
  );

  if (!teamScheduleResponse.ok) {
    throw new Error("Failed to fetch team data");
  }

  const teamSchedule = await teamScheduleResponse.json();
  return teamSchedule;
}

export async function getNBATeamStats(teamId: string) {
  const teamStatsResponse = await fetch(
    `https://sports.core.api.espn.com/v2/sports/basketball/leagues/nba/seasons/2024/types/2/teams/${teamId}/statistics`
  );

  if (!teamStatsResponse.ok) {
    throw new Error("Failed to fetch team data");
  }

  const teamStats = await teamStatsResponse.json();

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

  return {
    displayStats,
    fullStats,
  };
}

export async function getNFLTeamStats(teamId: string) {
  const teamStatsResponse = await fetch(
    `https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2023/types/2/teams/${teamId}/statistics`
  );

  if (!teamStatsResponse.ok) {
    throw new Error("Failed to fetch team data");
  }

  const teamStats = await teamStatsResponse.json();

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

  return {
    displayStats,
    fullStats,
  };
}

export async function getMLBTeamStats(teamId: string) {
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

  return displayStats;
}

export async function getTeamData(league: League, teamId: string) {
  const sport = league === "nba" ? "basketball" : league === "mlb" ? "baseball" : "football";
  const teamDataResponse = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/${sport}/${league}/teams/${teamId}`
  );

  if (!teamDataResponse.ok) {
    throw new Error("Failed to fetch team data");
  }

  const teamData = await teamDataResponse.json();
  return teamData;
}
