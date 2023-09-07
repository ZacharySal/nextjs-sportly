"use client";

import GameHeader from "@/app/_components/GameHeader";
import ContainerBox from "@/app/_components/ContainerBox";
import Articles from "@/app/_components/Articles";
import { v4 as uuidv4 } from "uuid";
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
import Image from "next/image";
import useSwr from "swr";
import { useState } from "react";
import React from "react";
import StadiumInfo from "@/app/_components/StadiumInfo";
import MLBBoxscore from "@/app/_components/MLBBoxscore";
import DivisionStandings from "@/app/_components/DivisionStandings";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Page({ params }: { params: { gameId: string } }) {
  const [userSelection, setUserSelection] = useState("gameInfo");

  const { data, isLoading } = useSwr(
    `https://nextjs-sportly.vercel.app/api/mlb/gameData/${params.gameId}`,
    fetcher
  );

  const isDesktopScreen = useMediaQuery("(min-width:1000px)");
  const isSelected = (selection: string) => selection === userSelection;

  function getTeamName(id: string) {
    return id === data.homeTeam.id
      ? data.homeTeam.team.name
      : data.awayTeam.team.name;
  }

  function divisionStandings() {
    return data.gameData.standings.groups.map((group: any) => {
      return (
        <React.Fragment key={uuidv4()}>
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
                        "&:nth-of-type(odd) td, &:nth-of-type(odd) th": {
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
        </React.Fragment>
      );
    });
  }

  function scoringPlays() {
    const allScoringPlays = data.gameData.plays.filter(
      (play: any) => play.scoringPlay == true
    );

    const finalScoringPlays = allScoringPlays.filter(
      (play: any) => play.type.text === "Play Result"
    );

    if (finalScoringPlays.length === 0) return null;
    return (
      <Box className="grid grid-cols-[25px_5px_20px_auto_15px_15px] grid-rows-[20px_auto] gap-x-3 gap-y-2 bg-white p-3 items-center rounded-xl">
        <Typography className="text-sm opacity-70 font-semibold row-1 col-span-6">
          Scoring Plays
        </Typography>
        {finalScoringPlays.map((play: any) => (
          <React.Fragment key={uuidv4()}>
            <Image
              src={`/mlb/${getTeamName(play.team.id)
                .replace(" ", "")
                .toLowerCase()}.png`}
              width={100}
              height={100}
              alt="home team logo"
              style={{ width: "25px" }}
              className="object-contain col-start-1"
            />
            <Typography
              style={{
                paddingBottom: play.period.type === "Top" ? "15px" : "5px",
              }}
              sx={{
                "&::before": {
                  content: `" "`,
                  borderColor:
                    play.period.type === "Top"
                      ? "transparent transparent gray"
                      : "gray transparent transparent transparent",
                  borderStyle: "solid",
                  borderWidth: "5px",
                  position: "absolute",
                },
              }}
              className="col-start-2 opacity-70 text-xs"
            ></Typography>
            <Typography className="col-start-3 opacity-70 text-xs">
              {play.period.displayValue.slice(0, 3)}
            </Typography>
            <Typography className="col-start-4 opacity-70 text-xs">
              {play.text}
            </Typography>
            <Typography
              sx={{
                fontWeight: play.team.id === data.awayTeam.id ? "700" : "400",
              }}
              className="col-start-5 opacity-70 text-xs"
            >
              {play.awayScore}
            </Typography>
            <Typography
              sx={{
                fontWeight: play.team.id === data.homeTeam.id ? "700" : "400",
              }}
              className="col-start-6 opacity-70 text-xs"
            >
              {play.homeScore}
            </Typography>
          </React.Fragment>
        ))}
      </Box>
    );
  }

  function teamStats() {
    return (
      <>
        <Box className="w-full flex flex-col gap-2 mb-5">
          <Box className="flex flex-row gap-1 justify-start items-center">
            <Image
              src={`/mlb/${data.homeTeam.team.name
                .replace(" ", "")
                .toLowerCase()}.png`}
              width={100}
              height={100}
              alt="home team logo"
              className="w-8 object-contain"
            />
            <Typography className="opacity-70 font-semibold">
              {data.homeTeam.team.name} Stats
            </Typography>
          </Box>
          <Box className="grid grid-cols-3 gap-1">
            {Object.entries(data.awayTeamStats).map(
              ([statName, value]: [string, any]) => (
                <React.Fragment key={uuidv4()}>
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
                </React.Fragment>
              )
            )}
          </Box>
        </Box>
        <Box className="w-full flex flex-col gap-2">
          <Box className="flex flex-row gap-1 justify-start items-center">
            <Image
              src={`/mlb/${data.awayTeam.team.name
                .replace(" ", "")
                .toLowerCase()}.png`}
              width={100}
              height={100}
              alt="away team logo"
              className="w-8 object-contain"
            />
            <Typography className="opacity-70 font-semibold">
              {data.awayTeam.team.name} Stats
            </Typography>
          </Box>
          <Box className="grid grid-cols-3 gap-1">
            {Object.entries(data.homeTeamStats).map(
              ([statName, value]: [string, any]) => (
                <React.Fragment key={uuidv4()}>
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
                </React.Fragment>
              )
            )}
          </Box>
        </Box>
      </>
    );
  }

  if (!isLoading) {
    return (
      <>
        {isDesktopScreen ? (
          <>
            <GameHeader
              backgroundColor={"#002D72"}
              homeTeam={data.homeTeam}
              awayTeam={data.awayTeam}
              winningTeam={data.winningTeam}
              isGameStarted={data.isGameStarted}
              league="mlb"
              gameInfo={data.gameInfo}
              isDesktopScreen={isDesktopScreen}
            />

            <ContainerBox
              altColor={
                data.isGameStarted
                  ? data.winningTeam.team.alternateColor
                  : "gray"
              }
              mainColor={
                data.isGameStarted ? data.winningTeam.team.color : "gray"
              }
              isDesktopScreen={isDesktopScreen}
            >
              <Box className="w-1/3 flex flex-col justify-center items-center gap-3">
                <StadiumInfo data={data} />
                <DivisionStandings data={data} />
              </Box>

              <Box className="w-7/12 flex flex-col gap-5">
                {data.isGameStarted && <MLBBoxscore data={data} />}
                {data.isGameStarted && scoringPlays()}
                {teamStats()}
              </Box>

              <Articles
                title="MLB News"
                teamNews={data.gameData.news}
                articleLimit={6}
              />
            </ContainerBox>
          </>
        ) : (
          <>
            <GameHeader
              backgroundColor={"#002D72"}
              homeTeam={data.homeTeam}
              awayTeam={data.awayTeam}
              winningTeam={data.winningTeam}
              isGameStarted={data.isGameStarted}
              league="mlb"
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
                data.isGameStarted
                  ? data.winningTeam.team.alternateColor
                  : "gray"
              }
              mainColor={
                data.isGameStarted ? data.winningTeam.team.color : "gray"
              }
              isDesktopScreen={isDesktopScreen}
            >
              {userSelection === "gameInfo" && (
                <Box className="w-full flex flex-col justify-center items-center gap-3">
                  <StadiumInfo data={data} />
                  <DivisionStandings data={data} />
                </Box>
              )}

              {userSelection === "scoreInfo" && (
                <Box className="w-full flex flex-col gap-5">
                  {data.isGameStarted && <MLBBoxscore data={data} />}
                  {data.isGameStarted && scoringPlays()}
                </Box>
              )}

              {userSelection === "stats" && teamStats()}

              {userSelection === "news" && (
                <Articles
                  title="MLB News"
                  teamNews={data.gameData.news}
                  articleLimit={6}
                />
              )}
            </ContainerBox>
          </>
        )}
      </>
    );
  }
}
