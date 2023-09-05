import GameHeader from "@/app/_components/GameHeader";
import ContainerBox from "@/app/_components/ContainerBox";
import Articles from "@/app/_components/Articles";
import { v4 as uuidv4 } from "uuid";

import {
  Box,
  Typography,
  Divider,
  TableRow,
  TableCell,
  TableHead,
  TableContainer,
  TableBody,
  Table,
} from "@mui/material";

async function getGameData(gameId: string) {
  const response = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/summary?event=${gameId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch game data");
  }

  return response.json();
}

async function getTeamStats(teamId: string) {
  const response = await fetch(
    `https://sports.core.api.espn.com/v2/sports/basketball/leagues/nba/seasons/2023/types/2/teams/${teamId}/statistics`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch team stats");
  }

  return response.json();
}

export default async function page({ params }: { params: { gameId: string } }) {
  const gameData = await getGameData(params.gameId);

  const homeTeam = gameData.header.competitions[0].competitors[0];
  const awayTeam = gameData.header.competitions[0].competitors[1];

  const homeTeamStats = await getTeamStats(homeTeam.id);
  const awayTeamStats = await getTeamStats(awayTeam.id);

  const winningTeam = homeTeam.winner ? homeTeam : awayTeam;

  const isGameStarted = gameData.lastFiveGames ? false : true;

  const backgroundColor = isGameStarted ? `#${winningTeam.team.color}` : "gray";

  const gameStatus = gameData.header.competitions[0].status.type.shortDetail;

  function getTeamName(id: string) {
    return id === homeTeam.id ? homeTeam.team.name : awayTeam.team.name;
  }

  function stadiumInfo() {
    return (
      <Box className="w-full flex flex-col bg-white rounded-xl drop-shadow-md gap-2 p-3">
        <Typography className="text-sm opacity-70 font-semibold text-start">
          Stadium Information
        </Typography>
        <img
          className="rounded"
          src={gameData.gameInfo.venue.images[0]?.href}
        />
        <Typography className="opacity-80 font-bold">
          {gameData.gameInfo.venue.fullName}
        </Typography>
        <Typography className="opacity-80 text-sm mt-[-0.5rem]">
          {gameData.gameInfo.venue.address.city},{" "}
          {gameData.gameInfo.venue.address.state}
        </Typography>
      </Box>
    );
  }

  function divisionStandings() {
    return gameData.standings.groups.map((group: any) => {
      return (
        <Box className="w-full bg-white rounded-xl drop-shadow-md p-3">
          <Typography className="font-semibold opacity-70 text-sm">
            {group.header}
          </Typography>

          <TableContainer
            style={{ maxWidth: "100%", marginTop: "0.5rem" }}
            component={Box}
          >
            <Table aria-label="simple table" size="small">
              <TableHead
                sx={{
                  borderTop: "1px solid rgba(224, 224, 224, 1)",
                }}
              >
                <TableRow>
                  <TableCell
                    className=" text-sm font-semibold"
                    align="left"
                    style={{ width: "6rem" }}
                  >
                    Team
                  </TableCell>
                  <TableCell
                    className=" text-sm font-semibold"
                    style={{ width: "4rem" }}
                    align="center"
                  >
                    W
                  </TableCell>
                  <TableCell
                    className=" text-sm font-semibold"
                    style={{ width: "4rem" }}
                    align="center"
                  >
                    L
                  </TableCell>
                  <TableCell
                    style={{ fontStyle: "bold", width: "4rem" }}
                    className=" text-sm font-semibold"
                    align="center"
                  >
                    WP
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {group.standings.entries.map((team: any) => (
                  <TableRow
                    key={uuidv4()}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      "&:nth-child(odd) td, &:nth-child(odd) th": {
                        backgroundColor: "#edeef0;",
                      },
                    }}
                  >
                    <TableCell
                      className="text-xs"
                      component="th"
                      scope="row"
                      sx={{
                        fontWeight:
                          homeTeam.team.location.includes(team.team) ||
                          awayTeam.team.location.includes(team.team)
                            ? "700"
                            : "400",
                      }}
                    >
                      {team.team}
                    </TableCell>

                    <TableCell
                      sx={{
                        fontWeight:
                          homeTeam.team.location.includes(team.team) ||
                          awayTeam.team.location.includes(team.team)
                            ? "700"
                            : "400",
                      }}
                      align="center"
                    >
                      {team.stats[4].displayValue}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight:
                          homeTeam.team.location.includes(team.team) ||
                          awayTeam.team.location.includes(team.team)
                            ? "700"
                            : "400",
                      }}
                      align="center"
                    >
                      {team.stats[1].displayValue}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight:
                          homeTeam.team.location.includes(team.team) ||
                          awayTeam.team.location.includes(team.team)
                            ? "700"
                            : "400",
                      }}
                      align="center"
                    >
                      {team.stats[3].displayValue}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      );
    });
  }

  function boxScore() {
    return (
      <Box className="w-full bg-white p-3 rounded-xl drop-shadow-md grid items-center text-center grid-cols-8 grid-rows-[0.25rem, 0.5rem, 0.5rem] gap-y-2 gap-x-0">
        <Typography className="text-sm font-semibold opacity-70 col-start-1 col-span-2 text-start">
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
            src={`/mlb/${homeTeam.team.name.replace(" ", "")}.png`}
          />
          <Typography className="font-semibold">
            {homeTeam.team.name}
          </Typography>
          <Typography className="text-sm opacity-60">
            {homeTeam.record[0].displayValue}
          </Typography>
        </Box>

        <Box className="col-span-3 row-start-3 flex flex-row justify-start items-center gap-2">
          <img
            className="w-10 obejct-cotain"
            src={`/mlb/${awayTeam.team.name.replace(" ", "")}.png`}
          />
          <Typography className="font-semibold">
            {awayTeam.team.name}
          </Typography>
          <Typography className="text-sm opacity-60">
            {awayTeam.record[0].displayValue}
          </Typography>
        </Box>

        <Typography className="opacity-70 col-start-4 row-start-2">
          {homeTeam.linescores[0].displayValue}
        </Typography>
        <Typography className="opacity-70 col-start-5 row-start-2">
          {homeTeam.linescores[1].displayValue}
        </Typography>
        <Typography className="opacity-70 col-start-6 row-start-2">
          {homeTeam.linescores[2].displayValue}
        </Typography>
        <Typography className="opacity-70 col-start-7 row-start-2">
          {homeTeam.linescores[3].displayValue}
        </Typography>
        <Typography className="opacity-70 col-start-8 row-start-2">
          {homeTeam.score}
        </Typography>

        <Typography className="opacity-70 col-start-4 row-start-3">
          {awayTeam.linescores[0].displayValue}
        </Typography>
        <Typography className="opacity-70 col-start-5 row-start-3">
          {awayTeam.linescores[1].displayValue}
        </Typography>
        <Typography className="opacity-70 col-start-6 row-start-3">
          {awayTeam.linescores[2].displayValue}
        </Typography>
        <Typography className="opacity-70 col-start-7 row-start-3">
          {awayTeam.linescores[3].displayValue}
        </Typography>
        <Typography className="font-bold col-start-8 row-start-3">
          {awayTeam.score}
        </Typography>
      </Box>
    );
  }

  function teamStats() {
    return (
      <>
        <Box className="w-full flex flex-col gap-1">
          <Typography className="">{homeTeam.team.name} Stats</Typography>
          <Box className="grid grid-cols-3 gap-1">
            {Object.entries(awayTeamDisplayStats).map(
              ([statName, value]: [string, any]) => (
                <>
                  <Box className="w-auto flex justify-center items-center flex-row p-3 bg-white gap-1 drop-shadow-md">
                    <Box className="flex flex-col justify-center gap-2 items-center">
                      <Typography className="text-sm">{statName}</Typography>
                      <Typography className="font-semibold text-3xl">
                        {value.displayValue}
                      </Typography>
                      <Typography className="text-base opacity-70">
                        {value.rankDisplayValue}
                      </Typography>
                    </Box>
                  </Box>
                </>
              )
            )}
          </Box>
        </Box>
        <Box className="w-full flex flex-col gap-1">
          <Typography className="">{awayTeam.team.name} Stats</Typography>
          <Box className="grid grid-cols-3 gap-1">
            {Object.entries(homeTeamDisplayStats).map(
              ([statName, value]: [string, any]) => (
                <>
                  <Box className="w-auto flex justify-center items-center flex-row p-3 bg-white gap-1 drop-shadow-md">
                    <Box className="flex flex-col justify-center gap-2 items-center">
                      <Typography className="text-sm">{statName}</Typography>
                      <Typography className="font-semibold text-3xl">
                        {value.displayValue}
                      </Typography>
                      <Typography className="text-base opacity-70">
                        {value.rankDisplayValue}
                      </Typography>
                    </Box>
                  </Box>
                </>
              )
            )}
          </Box>
        </Box>
      </>
    );
  }

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

  return (
    <>
      <GameHeader
        backgroundColor={backgroundColor}
        homeTeam={homeTeam}
        awayTeam={awayTeam}
        isGameStarted={isGameStarted}
        league="nba"
        gameStatus={gameStatus}
      />

      <ContainerBox
        altColor={isGameStarted ? winningTeam.team.alternateColor : "gray"}
        mainColor={isGameStarted ? winningTeam.team.color : "gray"}
      >
        <Box className="w-1/3 flex flex-col justify-center items-center gap-3">
          {stadiumInfo()}
          {divisionStandings()}
        </Box>

        <Box className="w-7/12 flex flex-col gap-5">
          {isGameStarted && boxScore()}
          {teamStats()}
        </Box>

        <Articles title="NBA News" teamNews={gameData.news} articleLimit={6} />
      </ContainerBox>
    </>
  );
}
