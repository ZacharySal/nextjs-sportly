import { Box, Typography, Divider, Container } from "@mui/material";
import ArticleCard from "@/app/_components/ArticleCard";
import ScoreCard from "@/app/_components/ScoreCard";
import ContainerBox from "@/app/_components/ContainerBox";
import { Play } from "next/font/google";
import Articles from "@/app/_components/Articles";

async function getGameData(gameId: string) {
  const response = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/football/nfl/summary?event=${gameId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch game data");
  }

  return response.json();
}

async function getScoreData(gameId: string) {
  const response = await fetch(
    `https://cdn.espn.com/core/nfl/game?xhr=1&gameId=${gameId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch game data");
  }

  return response.json();
}

export default async function TeamPage({
  params,
}: {
  params: { gameId: string };
}) {
  const gameData = await getGameData(params.gameId);
  const scoreData = await getScoreData(params.gameId);

  const awayTeam = scoreData.__gamepackage__.awayTeam;
  const homeTeam = scoreData.__gamepackage__.homeTeam;
  const homeTeamLinescore =
    gameData.header.competitions[0].competitors[0].linescores;
  const awayTeamLinescore =
    gameData.header.competitions[0].competitors[1].linescores;

  const winningTeam = homeTeam.winner ? homeTeam : awayTeam;

  console.log(gameData.leaders[0].leaders[0]);

  const allScoringPlays = gameData.scoringPlays;
  let firstQuarterScoringPlays: any[] = [];
  let secondQuarterScoringPlays: any[] = [];
  let thirdQuarterScoringPlays: any[] = [];
  let fourthQuarterScoringPlays: any[] = [];

  allScoringPlays.map((play: any) => {
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

  function quarterHeader(text: string) {
    return (
      <Box className="w-full flex flex-row justify-between items-center">
        <Typography className="opacity-70 text-sm">{text}</Typography>
        <Box className="flex flex-row items-center gap-2">
          <img
            className="w-8 obejct-cotain"
            src={`/nfl/${gameData.header.competitions[0].competitors[0].team.name}.png`}
          />
          <img
            className="w-8 obejct-cotain"
            src={`/nfl/${gameData.header.competitions[0].competitors[1].team.name}.png`}
          />
        </Box>
      </Box>
    );
  }
  function scoringPlays(allScoringPlays: any) {
    const plays = allScoringPlays.map((play: any) => {
      return (
        <Box className="w-full flex flex-row justify-between items-center mb-1">
          <Box className="flex flex-row items-center gap-2">
            <img className="w-10 object-contain" src={play.team.logo} />
            <Box className="flex flex-col">
              <Box className="text-sm font-bold">
                {play.type.text}
                <span className="pl-1 text-xs opacity-70">
                  {play.clock.displayValue}
                </span>
              </Box>
              <Box className="text-sm opacity-70">{play.text}</Box>
            </Box>
          </Box>
          <Box className="flex flex-row gap-6 pr-2">
            <Typography
              sx={{
                fontWeight:
                  play.team.displayName === homeTeam.team.displayName
                    ? "700"
                    : "400",
              }}
              className="w-4 text-center"
            >
              {play.homeScore}
            </Typography>
            <Typography
              sx={{
                fontWeight:
                  play.team.displayName === awayTeam.team.displayName
                    ? "700"
                    : "400",
              }}
              className="w-4 text-center"
            >
              {play.awayScore}
            </Typography>
          </Box>
        </Box>
      );
    });
    return plays;
  }

  function boxScore() {
    return (
      <Box className="w-full bg-white p-3 rounded-xl drop-shadow-md grid items-center text-center grid-cols-8 grid-rows-[0.25rem, 0.5rem, 0.5rem] gap-y-2 gap-x-0">
        <Typography className="text-base opacity-60 col-start-1 col-span-2 text-start">
          Box Score
        </Typography>
        <Typography className="text-sm opacity-60 col-start-4">1</Typography>
        <Typography className="text-sm opacity-60 col-start-5">2</Typography>
        <Typography className="text-sm opacity-60 col-start-6">3</Typography>
        <Typography className="text-sm opacity-60 col-start-7">4</Typography>
        <Typography className="text-sm opacity-60 col-start-8">T</Typography>

        <Box className="col-span-3 row-start-2 flex flex-row justify-start items-center gap-2">
          <img
            className="w-10 obejct-cotain"
            src={`/nfl/${gameData.header.competitions[0].competitors[0].team.name}.png`}
          />
          <Typography className="font-semibold">
            {gameData.header.competitions[0].competitors[0].team.name}
          </Typography>
          <Typography className="text-sm opacity-60">
            {
              gameData.header.competitions[0].competitors[0].record[0]
                .displayValue
            }
          </Typography>
        </Box>

        <Box className="col-span-3 row-start-3 flex flex-row justify-start items-center gap-2">
          <img
            className="w-10 obejct-cotain"
            src={`/nfl/${gameData.header.competitions[0].competitors[1].team.name}.png`}
          />
          <Typography className="font-semibold">
            {gameData.header.competitions[0].competitors[1].team.name}
          </Typography>
          <Typography className="text-sm opacity-60">
            {
              gameData.header.competitions[0].competitors[1].record[0]
                .displayValue
            }
          </Typography>
        </Box>

        <Typography className="opacity-70 col-start-4 row-start-2">
          {
            gameData.header.competitions[0].competitors[0].linescores[0]
              .displayValue
          }
        </Typography>
        <Typography className="opacity-70 col-start-5 row-start-2">
          {homeTeamLinescore[1].displayValue}
        </Typography>
        <Typography className="opacity-70 col-start-6 row-start-2">
          {homeTeamLinescore[2].displayValue}
        </Typography>
        <Typography className="opacity-70 col-start-7 row-start-2">
          {homeTeamLinescore[3].displayValue}
        </Typography>
        <Typography className="font-bold col-start-8 row-start-2">
          {gameData.header.competitions[0].competitors[0].score}
        </Typography>

        <Typography className="opacity-70 col-start-4 row-start-3">
          {awayTeamLinescore[0].displayValue}
        </Typography>
        <Typography className="opacity-70 col-start-5 row-start-3">
          {awayTeamLinescore[1].displayValue}
        </Typography>
        <Typography className="opacity-70 col-start-6 row-start-3">
          {awayTeamLinescore[2].displayValue}
        </Typography>
        <Typography className="opacity-70 col-start-7 row-start-3">
          {awayTeamLinescore[3].displayValue}
        </Typography>
        <Typography className="font-bold col-start-8 row-start-3">
          {gameData.header.competitions[0].competitors[1].score}
        </Typography>
      </Box>
    );
  }

  return (
    <>
      {/* HEADER */}
      <Box
        sx={{ backgroundColor: `#${winningTeam.team.color}` }}
        className="w-full h-40 flex-row flex justify-center items-center gap-10 drop-shadow-md"
      >
        <Box className="flex flex-row justify-center items-center gap-3">
          <img
            className="w-32 object-cover"
            src={`/nfl/${homeTeam.team.name}.png`}
          />
          <Box className="flex flex-col text-white opacity-80">
            <Typography className="text-3xl opacity-70">
              {homeTeam.team.location}
            </Typography>
            <Typography className="text-3xl font-bold">
              {homeTeam.team.name}
            </Typography>
          </Box>
        </Box>
        <Box className="flex flex-row justify-center items-center gap-3">
          <Typography className="text-white text-6xl opacity-80">
            {homeTeam.score}
          </Typography>
          <Typography className="text-white text-7xl opacity-80 pb-3">
            -
          </Typography>
          <Typography className="text-white text-6xl opacity-80">
            {awayTeam.score}
          </Typography>
        </Box>

        <Box className="flex flex-row justify-center items-center gap-3">
          <Box className="flex flex-col text-white opacity-80">
            <Typography className="text-3xl opacity-70">
              {awayTeam.team.location}
            </Typography>
            <Typography className="text-3xl font-bold">
              {awayTeam.team.name}
            </Typography>
          </Box>
          <img
            className="w-32 object-cover"
            src={`/nfl/${awayTeam.team.name}.png`}
          />
        </Box>
      </Box>

      {/* CONTAINER BOXES */}
      <ContainerBox
        altColor={winningTeam.altColor}
        mainColor={winningTeam.color}
      >
        <Box className="w-1/3 flex flex-col justify-center items-center gap-3">
          <Box className="w-full flex flex-col bg-white rounded-xl drop-shadow-md gap-2 p-3">
            <Typography className="text-sm opacity-70 font-semibold text-start">
              Stadium Information
            </Typography>
            <img
              className="rounded"
              src={gameData.gameInfo.venue.images[0].href}
            />
            <Typography className="opacity-80 font-bold">
              {gameData.gameInfo.venue.fullName}
            </Typography>
            <Typography className="opacity-80 text-sm mt-[-0.5rem]">
              {gameData.gameInfo.venue.address.city},{" "}
              {gameData.gameInfo.venue.address.state}
            </Typography>
          </Box>
          <Box className="w-full bg-white rounded-xl drop-shadow-md p-3">
            <Typography className="text-sm opacity-70 font-semibold text-start">
              Game Leaders
            </Typography>

            <Box className="grid grid-cols-2 grid-rows-[0.25rem, 1rem, 0.25rem, 1rem, 0.25rem, 1rem] gap-x-2 gap-y-0">
              <Typography className="text-sm col-span-2 text-center opacity-70">
                Passing Yards
              </Typography>

              {/* HOME TEAM PASSING LEADER */}
              <Box className="flex flex-row justify-between items-center">
                <Box className="flex flex-col justify-center items-center gap-1">
                  <img
                    className="w-14 object-cover"
                    src={
                      gameData.leaders[0].leaders[0].leaders[0].athlete.headshot
                        .href
                    }
                  />
                  <Typography className="text-xs opacity-80">
                    {gameData.leaders[0].team.abbreviation}
                  </Typography>
                </Box>
                <Box className="flex flex-col items-end">
                  <Typography className="text-sm opacity-80 font-bold">
                    {
                      gameData.leaders[0].leaders[0].leaders[0].athlete
                        .shortName
                    }
                  </Typography>
                  <Typography className="text-[11px] opacity-80">
                    {gameData.leaders[0].leaders[0].leaders[0].displayValue}
                  </Typography>
                </Box>
              </Box>

              {/* AWAY TEAM PASSING LEADER */}
              <Box className="flex flex-row justify-between items-center">
                <Box className="flex flex-col items-start">
                  <Typography className="text-sm opacity-80 font-bold">
                    {
                      gameData.leaders[1].leaders[0].leaders[0].athlete
                        .shortName
                    }
                  </Typography>
                  <Typography className="text-[11px] opacity-80">
                    {gameData.leaders[1].leaders[0].leaders[0].displayValue}
                  </Typography>
                </Box>
                <Box className="flex flex-col justify-center items-center gap-1">
                  <img
                    className="w-14 object-cover"
                    src={
                      gameData.leaders[1].leaders[0].leaders[0].athlete.headshot
                        .href
                    }
                  />
                  <Typography className="text-xs opacity-80">
                    {gameData.leaders[1].team.abbreviation}
                  </Typography>
                </Box>
              </Box>

              <Typography className="text-sm col-span-2 text-center opacity-70">
                Rushing Yards
              </Typography>

              {/* HOME TEAM RUSHING LEADER */}
              <Box className="flex flex-row justify-between items-center">
                <Box className="flex flex-col justify-center items-center gap-1">
                  <img
                    className="w-14 object-cover"
                    src={
                      gameData.leaders[0].leaders[1].leaders[0].athlete.headshot
                        .href
                    }
                  />
                  <Typography className="text-xs opacity-80">
                    {gameData.leaders[0].team.abbreviation}
                  </Typography>
                </Box>
                <Box className="flex flex-col items-end">
                  <Typography className="text-sm opacity-80 font-bold">
                    {
                      gameData.leaders[0].leaders[1].leaders[0].athlete
                        .shortName
                    }
                  </Typography>
                  <Typography className="text-[11px] opacity-80">
                    {gameData.leaders[0].leaders[1].leaders[0].displayValue}
                  </Typography>
                </Box>
              </Box>

              {/* AWAY TEAM RUSHING LEADER */}
              <Box className="flex flex-row justify-between items-center">
                <Box className="flex flex-col items-start">
                  <Typography className="text-sm opacity-80 font-bold">
                    {
                      gameData.leaders[1].leaders[1].leaders[0].athlete
                        .shortName
                    }
                  </Typography>
                  <Typography className="text-[11px] opacity-80">
                    {gameData.leaders[1].leaders[1].leaders[0].displayValue}
                  </Typography>
                </Box>
                <Box className="flex flex-col justify-center items-center gap-1">
                  <img
                    className="w-14 object-cover"
                    src={
                      gameData.leaders[1].leaders[1].leaders[0].athlete.headshot
                        .href
                    }
                  />
                  <Typography className="text-xs opacity-80">
                    {gameData.leaders[1].team.abbreviation}
                  </Typography>
                </Box>
              </Box>

              <Typography className="text-sm col-span-2 text-center opacity-70">
                Recieving Yards
              </Typography>

              {/* HOME TEAM RECIEVING */}
              <Box className="flex flex-row justify-between items-center">
                <Box className="flex flex-col justify-center items-center gap-1">
                  <img
                    className="w-14 object-cover"
                    src={
                      gameData.leaders[0].leaders[2].leaders[0].athlete.headshot
                        .href
                    }
                  />
                  <Typography className="text-xs opacity-80">
                    {gameData.leaders[0].team.abbreviation}
                  </Typography>
                </Box>
                <Box className="flex flex-col items-end">
                  <Typography className="text-sm opacity-80 font-bold">
                    {
                      gameData.leaders[0].leaders[2].leaders[0].athlete
                        .shortName
                    }
                  </Typography>
                  <Typography className="text-[11px] opacity-80">
                    {gameData.leaders[0].leaders[2].leaders[0].displayValue}
                  </Typography>
                </Box>
              </Box>

              {/* AWAY TEAM RECIEVING LEADER */}
              <Box className="flex flex-row justify-between items-center">
                <Box className="flex flex-col items-start">
                  <Typography className="text-sm opacity-80 font-bold">
                    {
                      gameData.leaders[1].leaders[2].leaders[0].athlete
                        .shortName
                    }
                  </Typography>
                  <Typography className="text-[11px] opacity-80">
                    {gameData.leaders[1].leaders[2].leaders[0].displayValue}
                  </Typography>
                </Box>
                <Box className="flex flex-col justify-center items-center gap-1">
                  <img
                    className="w-14 object-cover"
                    src={
                      gameData.leaders[1].leaders[2].leaders[0].athlete.headshot
                        .href
                    }
                  />
                  <Typography className="text-xs opacity-80">
                    {gameData.leaders[1].team.abbreviation}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Box Score */}
        <Box className="w-7/12 flex flex-col gap-5">
          {boxScore()}
          <Box className="w-full bg-white rounded-xl drop-shadow-md flex flex-col justify-center items-center p-3">
            {quarterHeader("1ST QUARTER")}
            {scoringPlays(firstQuarterScoringPlays)}
            <Divider className="w-full color-[#edeef0] my-[0.5rem]" />
            {quarterHeader("2ND QUARTER")}
            {scoringPlays(secondQuarterScoringPlays)}
            <Divider className="w-full color-[#edeef0] my-[0.5rem]" />
            {quarterHeader("3RD QUARTER")}
            {scoringPlays(thirdQuarterScoringPlays)}
            <Divider className="w-full color-[#edeef0] my-[0.5rem]" />
            {quarterHeader("4TH QUARTER")}
            {scoringPlays(fourthQuarterScoringPlays)}
          </Box>
        </Box>
        <Articles title="NFL News" teamNews={gameData.news} articleLimit={4} />
      </ContainerBox>
    </>
  );
}
