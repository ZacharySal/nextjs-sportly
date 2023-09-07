"use client";

import useSwr from "swr";
import { useState } from "react";
import GameHeader from "@/app/_components/GameHeader";
import ContainerBox from "@/app/_components/ContainerBox";
import Articles from "@/app/_components/Articles";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import {
  Box,
  Typography,
  TableRow,
  TableCell,
  TableHead,
  TableContainer,
  TableBody,
  Table,
  useMediaQuery,
} from "@mui/material";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Page({ params }: { params: { gameId: string } }) {
  const [userSelection, setUserSelection] = useState("gameInfo");

  const { data, isLoading } = useSwr(
    `https://nextjs-sportly.vercel.app/api/nba/gameData/${params.gameId}`,
    fetcher
  );

  const isDesktopScreen = useMediaQuery("(min-width:1000px)");
  const isSelected = (selection: string) => selection === userSelection;

  function getTeamName(id: string) {
    return id === data.homeTeam.id
      ? data.homeTeam.team.name
      : data.awayTeam.team.name;
  }

  function stadiumInfo() {
    return (
      <Box className="w-full flex flex-col bg-white rounded-xl drop-shadow-md gap-2 p-3">
        <Typography className="text-sm opacity-70 font-semibold text-start">
          Stadium Information
        </Typography>
        <Image
          src={data.gameData.gameInfo.venue.images[0]?.href}
          width={1000}
          height={1000}
          className="rounded"
          alt="stadium"
        />
        <Typography className="opacity-80 font-bold">
          {data.gameData.gameInfo.venue.fullName}
        </Typography>
        <Typography className="opacity-80 text-sm mt-[-0.5rem]">
          {data.gameData.gameInfo.venue.address.city},{" "}
          {data.gameData.gameInfo.venue.address.state}
        </Typography>
      </Box>
    );
  }

  function divisionStandings() {
    return data.gameData.standings.groups.map((group: any) => {
      return (
        <Box
          key={uuidv4()}
          className="w-full bg-white rounded-xl drop-shadow-md p-3"
        >
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
                          data.homeTeam.team.location.includes(team.team) ||
                          data.awayTeam.team.location.includes(team.team)
                            ? "700"
                            : "400",
                      }}
                    >
                      {team.team}
                    </TableCell>

                    <TableCell
                      sx={{
                        fontWeight:
                          data.homeTeam.team.location.includes(team.team) ||
                          data.awayTeam.team.location.includes(team.team)
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
                          data.homeTeam.team.location.includes(team.team) ||
                          data.awayTeam.team.location.includes(team.team)
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
                          data.homeTeam.team.location.includes(team.team) ||
                          data.awayTeam.team.location.includes(team.team)
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
          <Image
            src={`/nba/${data.homeTeam.team.name
              .replace(" ", "")
              .toLowerCase()}.png`}
            width={100}
            height={100}
            className="w-10 object-contain"
            alt="home team logo"
          />
          <Typography className="font-semibold">
            {data.homeTeam.team.name}
          </Typography>
          <Typography className="text-sm opacity-60">
            {data.homeTeam.record[0].displayValue}
          </Typography>
        </Box>

        <Box className="col-span-3 row-start-3 flex flex-row justify-start items-center gap-2">
          <Image
            src={`/nba/${data.awayTeam.team.name
              .replace(" ", "")
              .toLowerCase()}.png`}
            width={100}
            height={100}
            className="w-10 object-contain"
            alt="away team logo"
          />
          <Typography className="font-semibold">
            {data.awayTeam.team.name}
          </Typography>
          <Typography className="text-sm opacity-60">
            {data.awayTeam.record[0].displayValue}
          </Typography>
        </Box>

        <Typography className="opacity-70 col-start-4 row-start-2">
          {data.homeTeam.linescores[0].displayValue}
        </Typography>
        <Typography className="opacity-70 col-start-5 row-start-2">
          {data.homeTeam.linescores[1].displayValue}
        </Typography>
        <Typography className="opacity-70 col-start-6 row-start-2">
          {data.homeTeam.linescores[2].displayValue}
        </Typography>
        <Typography className="opacity-70 col-start-7 row-start-2">
          {data.homeTeam.linescores[3].displayValue}
        </Typography>
        <Typography className="opacity-70 col-start-8 row-start-2">
          {data.homeTeam.score}
        </Typography>

        <Typography className="opacity-70 col-start-4 row-start-3">
          {data.awayTeam.linescores[0].displayValue}
        </Typography>
        <Typography className="opacity-70 col-start-5 row-start-3">
          {data.awayTeam.linescores[1].displayValue}
        </Typography>
        <Typography className="opacity-70 col-start-6 row-start-3">
          {data.awayTeam.linescores[2].displayValue}
        </Typography>
        <Typography className="opacity-70 col-start-7 row-start-3">
          {data.awayTeam.linescores[3].displayValue}
        </Typography>
        <Typography className="font-bold col-start-8 row-start-3">
          {data.awayTeam.score}
        </Typography>
      </Box>
    );
  }

  function teamStats() {
    return (
      <>
        <Box className="w-full flex flex-col gap-2 mb-5">
          <Box className="flex flex-row gap-1 justify-start items-center">
            <Image
              src={`/nba/${data.homeTeam.team.name
                .replace(" ", "")
                .toLowerCase()}.png`}
              width={100}
              height={100}
              className="w-8 object-contain"
              alt="home team logo"
            />
            <Typography className="opacity-70 font-semibold">
              {data.homeTeam.team.name} Stats
            </Typography>
          </Box>
          <Box className="grid grid-cols-3 gap-1">
            {Object.entries(data.awayTeamStats).map(
              ([statName, value]: [string, any]) => (
                <Box
                  key={uuidv4()}
                  className="w-auto flex justify-center items-center flex-row p-3 bg-white gap-1 drop-shadow-md"
                >
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
              )
            )}
          </Box>
        </Box>
        <Box className="w-full flex flex-col gap-1">
          <Box className="flex flex-row gap-1 justify-start items-center">
            <Image
              src={`/nba/${data.awayTeam.team.name
                .replace(" ", "")
                .toLowerCase()}.png`}
              width={100}
              height={100}
              className="w-8 object-contain"
              alt="away team logo"
            />
            <Typography className="opacity-70 font-semibold">
              {data.awayTeam.team.name} Stats
            </Typography>
          </Box>
          <Box className="grid grid-cols-3 gap-1">
            {Object.entries(data.homeTeamStats).map(
              ([statName, value]: [string, any]) => (
                <Box
                  key={uuidv4()}
                  className="w-auto flex justify-center items-center flex-row p-3 bg-white gap-1 drop-shadow-md"
                >
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
              )
            )}
          </Box>
        </Box>
      </>
    );
  }

  if (!isLoading) {
    return isDesktopScreen ? (
      <>
        <GameHeader
          backgroundColor={data.backgroundColor}
          homeTeam={data.homeTeam}
          awayTeam={data.awayTeam}
          winningTeam={data.winningTeam}
          isGameStarted={data.isGameStarted}
          league="nba"
          gameInfo={data.gameInfo}
          isDesktopScreen={isDesktopScreen}
        />

        <ContainerBox
          altColor={
            data.isGameStarted ? data.winningTeam.team.alternateColor : "gray"
          }
          mainColor={data.isGameStarted ? data.winningTeam.team.color : "gray"}
          isDesktopScreen={isDesktopScreen}
        >
          <Box className="w-1/3 flex flex-col justify-center items-center gap-3">
            {stadiumInfo()}
            {divisionStandings()}
          </Box>

          <Box className="w-7/12 flex flex-col gap-5">
            {data.isGameStarted && boxScore()}
            {teamStats()}
          </Box>

          <Articles
            title="NBA News"
            teamNews={data.gameData.news}
            articleLimit={6}
          />
        </ContainerBox>
      </>
    ) : (
      <>
        <GameHeader
          backgroundColor={"#013369"}
          homeTeam={data.homeTeam}
          awayTeam={data.awayTeam}
          winningTeam={data.winningTeam}
          isGameStarted={data.isGameStarted}
          league="nba"
          gameInfo={data.gameInfo}
          isDesktopScreen={isDesktopScreen}
        />
        <Box className="block md:hidden w-full h-10 flex justify-start items-center gap-3 bg-white pl-5">
          <Typography
            onClick={() => setUserSelection("gameInfo")}
            sx={{ fontWeight: isSelected("gameInfo") ? "700" : "400" }}
            className="opacity-70 text-sm"
          >
            Game Info
          </Typography>
          <Typography
            onClick={() => setUserSelection("stats")}
            sx={{ fontWeight: isSelected("stats") ? "700" : "400" }}
            className="opacity-70 text-sm"
          >
            Stats
          </Typography>
          {data.isGameStarted && (
            <>
              <Typography
                onClick={() => setUserSelection("scoreInfo")}
                sx={{ fontWeight: isSelected("scoreInfo") ? "700" : "400" }}
                className="opacity-70 text-sm"
              >
                Score Info
              </Typography>
            </>
          )}
          <Typography
            onClick={() => setUserSelection("standings")}
            sx={{ fontWeight: isSelected("standings") ? "700" : "400" }}
            className="opacity-70 text-sm"
          >
            Standings
          </Typography>
        </Box>

        <ContainerBox
          altColor={
            data.isGameStarted ? data.winningTeam.team.alternateColor : "gray"
          }
          mainColor={data.isGameStarted ? data.winningTeam.team.color : "gray"}
          isDesktopScreen={isDesktopScreen}
        >
          {userSelection === "gameInfo" && (
            <Box className="w-full flex flex-col justify-center items-center gap-3">
              {stadiumInfo()}
              {divisionStandings()}
            </Box>
          )}

          {userSelection === "scoreInfo" && (
            <Box className="w-full flex flex-col gap-5">
              <>{data.isGameStarted && boxScore()}</>
            </Box>
          )}

          {userSelection === "stats" && teamStats()}

          {userSelection === "news" && (
            <Articles
              title="NBA News"
              teamNews={data.gameData.news}
              articleLimit={6}
            />
          )}
        </ContainerBox>
      </>
    );
  }
}
