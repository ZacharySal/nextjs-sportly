"use client";

import {
  Box,
  Typography,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ContainerBox from "@/app/_components/ContainerBox";
import GameHeader from "@/app/_components/GameHeader";
import Articles from "@/app/_components/Articles";
import { nflDivisonTeams } from "@/app/_lib/constants";
import useSwr from "swr";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import React from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function TeamPage({ params }: { params: { gameId: string } }) {
  console.log(params.gameId);
  const { data, isLoading } = useSwr(
    `https://nextjs-sportly.vercel.app/api/nfl/gameData/${params.gameId}`,
    fetcher
  );

  if (!isLoading) {
    console.log(data);
  }

  const [userSelection, setUserSelection] = useState("gameInfo");
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");
  const isSelected = (selection: string) => selection === userSelection;

  function quarterHeader(text: string) {
    return (
      <Box className="w-full flex flex-row justify-between items-center mb-2">
        <Typography className="opacity-70 text-xs">{text}</Typography>
        {/* <Box className="flex flex-row items-center gap-2">
          <img
            className="w-8 object-contain"
            src={`/nfl/${gameData.header.competitions[0].competitors[0].team.name}.png`}
          />
          <img
            className="w-8 object-contain"
            src={`/nfl/${gameData.header.competitions[0].competitors[1].team.name}.png`}
          />
        </Box> */}
      </Box>
    );
  }

  function scoringPlays(allScoringPlays: any) {
    const plays = allScoringPlays.map((play: any) => {
      return (
        <React.Fragment key={uuidv4()}>
          <Box className="w-full flex flex-row justify-between items-center mb-1">
            <Box className="flex flex-row items-center gap-2">
              <Image
                src={play.team.logo}
                width={100}
                height={100}
                alt="team logo"
                className="w-8 object-contain"
              />
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
                    play.team.displayName === data.homeTeam.team.displayName
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
                    play.team.displayName === data.awayTeam.team.displayName
                      ? "700"
                      : "400",
                }}
                className="w-4 text-center"
              >
                {play.awayScore}
              </Typography>
            </Box>
          </Box>
        </React.Fragment>
      );
    });
    return plays;
  }

  function scoringPlaysComponent() {
    return (
      <Box className="w-full bg-white rounded-xl drop-shadow-md flex flex-col justify-center items-center p-3">
        <Typography className=" w-full text-left text-sm opacity-70 font-semibold">
          Scoring Plays
        </Typography>
        <Divider className="w-full color-[#edeef0] my-[0.5rem]" />
        {quarterHeader("1ST QUARTER")}
        {scoringPlays(data.firstQuarterScoringPlays)}
        <Divider className="w-full color-[#edeef0] my-[0.5rem]" />
        {quarterHeader("2ND QUARTER")}
        {scoringPlays(data.secondQuarterScoringPlays)}
        <Divider className="w-full color-[#edeef0] my-[0.5rem]" />
        {quarterHeader("3RD QUARTER")}
        {scoringPlays(data.thirdQuarterScoringPlays)}
        <Divider className="w-full color-[#edeef0] my-[0.5rem]" />
        {quarterHeader("4TH QUARTER")}
        {scoringPlays(data.fourthQuarterScoringPlays)}
      </Box>
    );
  }

  function boxScore() {
    return (
      <Box className="w-full bg-white p-3 rounded-xl drop-shadow-md grid items-center text-center grid-cols-8 grid-rows-[0.25rem, 0.5rem, 0.5rem] gap-y-2">
        <Typography className="text-sm font-semibold opacity-70 col-start-1 col-span-2 text-start">
          Box Score
        </Typography>
        <Typography className="text-sm opacity-60 col-start-4">1</Typography>
        <Typography className="text-sm opacity-60 col-start-5">2</Typography>
        <Typography className="text-sm opacity-60 col-start-6">3</Typography>
        <Typography className="text-sm opacity-60 col-start-7">4</Typography>
        <Typography className="text-sm opacity-60 col-start-8">T</Typography>

        <Box className="col-span-3 row-start-2 flex flex-row justify-start items-center gap-1 md:gap-2">
          <Image
            src={`/nfl/${data.gameData.header.competitions[0].competitors[0].team.name
              .replace(" ", "")
              .toLowerCase()}.png`}
            width={100}
            height={100}
            className="w-8 object-contain"
            alt="home team logo"
          />
          <Typography className=" text-sm md:text-base font-semibold opacity-80">
            {data.gameData.header.competitions[0].competitors[0].team.name}
          </Typography>
          <Typography className="hidden md:block text-sm opacity-60">
            {
              data.gameData.header.competitions[0].competitors[0].record[0]
                .displayValue
            }
          </Typography>
        </Box>

        <Box className="col-span-3 row-start-3 flex flex-row justify-start items-center gap-1 md:gap-2">
          <Image
            src={`/nfl/${data.gameData.header.competitions[0].competitors[1].team.name.toLowerCase()}.png`}
            width={100}
            height={100}
            alt="away team logo"
            className="w-8 object-contain"
          />
          <Typography className="text-sm md:text-base font-semibold opacity-80">
            {data.gameData.header.competitions[0].competitors[1].team.name}
          </Typography>
          <Typography className="hidden md:block text-sm opacity-60">
            {
              data.gameData.header.competitions[0].competitors[1].record[0]
                .displayValue
            }
          </Typography>
        </Box>

        <Typography className="text-sm md:text-base opacity-70 col-start-4 row-start-2">
          {
            data.gameData.header.competitions[0].competitors[0].linescores[0]
              .displayValue
          }
        </Typography>
        <Typography className="text-sm md:text-base opacity-70 col-start-5 row-start-2">
          {data.homeTeam.linescores[1].displayValue}
        </Typography>
        <Typography className="text-sm md:text-base opacity-70 col-start-6 row-start-2">
          {data.homeTeam.linescores[2].displayValue}
        </Typography>
        <Typography className="text-sm md:text-base opacity-70 col-start-7 row-start-2">
          {data.homeTeam.linescores[3].displayValue}
        </Typography>
        <Typography className="text-sm md:text-base font-bold col-start-8 row-start-2">
          {data.gameData.header.competitions[0].competitors[0].score}
        </Typography>

        <Typography className="text-sm md:text-base opacity-70 col-start-4 row-start-3">
          {data.awayTeam.linescores[0].displayValue}
        </Typography>
        <Typography className="text-sm md:text-base opacity-70 col-start-5 row-start-3">
          {data.awayTeam.linescores[1].displayValue}
        </Typography>
        <Typography className="text-sm md:text-base opacity-70 col-start-6 row-start-3">
          {data.awayTeam.linescores[2].displayValue}
        </Typography>
        <Typography className="text-sm md:text-base opacity-70 col-start-7 row-start-3">
          {data.awayTeam.linescores[3].displayValue}
        </Typography>
        <Typography className="text-sm md:text-base  font-bold col-start-8 row-start-3">
          {data.gameData.header.competitions[0].competitors[1].score}
        </Typography>
      </Box>
    );
  }

  function stadiumInfo() {
    return (
      <Box className="w-full flex flex-col bg-white rounded-xl drop-shadow-md gap-2 p-3">
        <Typography className="text-sm opacity-70 font-semibold text-start">
          Stadium Information
        </Typography>

        <Image
          src={data.gameData.gameInfo.venue.images[0].href}
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

  function gameLeaders() {
    return (
      <Box className="w-full bg-white rounded-xl drop-shadow-md p-3">
        <Typography className="text-sm opacity-70 font-semibold text-start">
          Game Leaders
        </Typography>

        <Box className="grid grid-cols-2 grid-rows-[0.25rem, 1rem, 0.25rem, 1rem, 0.25rem, 1rem] gap-x-2 gap-y-0">
          <Typography className="text-sm col-span-2 text-center opacity-70 mb-[-0.5rem]">
            Passing Yards
          </Typography>

          {/* HOME TEAM PASSING LEADER */}
          <Box className="flex flex-row justify-between items-center">
            <Box className="flex flex-col justify-center items-center gap-1">
              <Image
                src={
                  data.gameData.leaders[0].leaders[0].leaders[0].athlete
                    .headshot.href
                }
                width={100}
                height={100}
                alt="player"
                className="w-10 h-10 md:w-[30px] md:h-[30px] border rounded-full object-cover"
              />
              <Typography className="text-xs opacity-80">
                {data.gameData.leaders[0].team.abbreviation}
              </Typography>
            </Box>
            <Box className="flex flex-col items-end">
              <Typography className="max-w-[6rem] truncate text-sm opacity-80 font-bold">
                {
                  data.gameData.leaders[0].leaders[0].leaders[0].athlete
                    .shortName
                }
              </Typography>
              <Typography className="max-w-[6rem] text-[10px] opacity-90 word truncate">
                {data.gameData.leaders[0].leaders[0].leaders[0].displayValue}
              </Typography>
            </Box>
          </Box>

          {/* AWAY TEAM PASSING LEADER */}
          <Box className="flex flex-row justify-between items-center">
            <Box className="flex flex-col items-start">
              <Typography className=" max-w-[6rem] truncate text-sm opacity-80 font-bold">
                {
                  data.gameData.leaders[1].leaders[0].leaders[0].athlete
                    .shortName
                }
              </Typography>
              <Typography className=" max-w-[6rem] text-[10px] opacity-90 word truncate">
                {data.gameData.leaders[1].leaders[0].leaders[0].displayValue}
              </Typography>
            </Box>
            <Box className="flex flex-col justify-center items-center gap-1">
              <Image
                src={
                  data.gameData.leaders[1].leaders[0].leaders[0].athlete
                    .headshot.href
                }
                width={100}
                height={100}
                alt="player"
                className="w-10 h-10 md:w-[30px] md:h-[30px] border rounded-full object-cover"
              />
              <Typography className="text-xs opacity-80">
                {data.gameData.leaders[1].team.abbreviation}
              </Typography>
            </Box>
          </Box>

          <Typography className="text-sm col-span-2 text-center opacity-70 mb-[-0.5rem]">
            Rushing Yards
          </Typography>

          {/* HOME TEAM RUSHING LEADER */}
          <Box className="flex flex-row justify-between items-center">
            <Box className="flex flex-col justify-center items-center gap-1">
              <Image
                src={
                  data.gameData.leaders[0].leaders[1].leaders[0].athlete
                    .headshot.href
                }
                width={100}
                height={100}
                alt="player"
                className="w-10 h-10 md:w-[30px] md:h-[30px] border rounded-full object-cover"
              />
              <Typography className="text-xs opacity-80">
                {data.gameData.leaders[0].team.abbreviation}
              </Typography>
            </Box>
            <Box className="flex flex-col items-end">
              <Typography className="max-w-[6rem] truncate text-sm opacity-80 font-bold">
                {
                  data.gameData.leaders[0].leaders[1].leaders[0].athlete
                    .shortName
                }
              </Typography>
              <Typography className=" max-w-[6rem] text-[10px] opacity-90 word truncate">
                {data.gameData.leaders[0].leaders[1].leaders[0].displayValue}
              </Typography>
            </Box>
          </Box>

          {/* AWAY TEAM RUSHING LEADER */}
          <Box className="flex flex-row justify-between items-center">
            <Box className="flex flex-col items-start">
              <Typography className="max-w-[6rem] truncate text-sm opacity-80 font-bold">
                {
                  data.gameData.leaders[1].leaders[1].leaders[0].athlete
                    .shortName
                }
              </Typography>
              <Typography className=" max-w-[6rem] text-[10px] opacity-90 word truncate">
                {data.gameData.leaders[1].leaders[1].leaders[0].displayValue}
              </Typography>
            </Box>
            <Box className="flex flex-col justify-center items-center gap-1">
              <Image
                src={
                  data.gameData.leaders[1].leaders[1].leaders[0].athlete
                    .headshot.href
                }
                width={100}
                height={100}
                alt="player"
                className="w-10 h-10 md:w-[30px] md:h-[30px] border rounded-full object-cover"
              />
              <Typography className="text-xs opacity-80">
                {data.gameData.leaders[1].team.abbreviation}
              </Typography>
            </Box>
          </Box>
          <Typography className="text-sm col-span-2 text-center opacity-70 mb-[-0.5rem]">
            Recieving Yards
          </Typography>
          {/* HOME TEAM RECIEVING */}
          <Box className="flex flex-row justify-between items-center">
            <Box className="flex flex-col justify-center items-center gap-1">
              <Image
                src={
                  data.gameData.leaders[0].leaders[2].leaders[0].athlete
                    .headshot.href
                }
                width={100}
                height={100}
                alt="player"
                className="w-10 h-10 md:w-[30px] md:h-[30px] border rounded-full object-cover"
              />
              <Typography className="text-xs opacity-80">
                {data.gameData.leaders[0].team.abbreviation}
              </Typography>
            </Box>
            <Box className="flex flex-col items-end">
              <Typography className="max-w-[6rem] truncate text-sm opacity-80 font-bold">
                {
                  data.gameData.leaders[0].leaders[2].leaders[0].athlete
                    .shortName
                }
              </Typography>
              <Typography className=" max-w-[6rem] text-[10px] opacity-90 word truncate">
                {data.gameData.leaders[0].leaders[2].leaders[0].displayValue}
              </Typography>
            </Box>
          </Box>

          {/* AWAY TEAM RECIEVING LEADER */}
          <Box className="flex flex-row justify-between items-center">
            <Box className="flex flex-col items-start">
              <Typography className="text-sm opacity-80 font-bold">
                {
                  data.gameData.leaders[1].leaders[2].leaders[0].athlete
                    .shortName
                }
              </Typography>
              <Typography className=" max-w-[6rem] text-[10px] opacity-90 word truncate">
                {data.gameData.leaders[1].leaders[2].leaders[0].displayValue}
              </Typography>
            </Box>
            <Box className="flex flex-col justify-center items-center gap-1">
              <Image
                src={
                  data.gameData.leaders[1].leaders[2].leaders[0].athlete
                    .headshot.href
                }
                width={100}
                height={100}
                alt="player"
                className="w-10 h-10 md:w-[30px] md:h-[30px] border rounded-full object-cover"
              />
              <Typography className="text-xs opacity-80">
                {data.gameData.leaders[1].team.abbreviation}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }

  function gameDrives() {
    return (
      <Box className="w-full bg-white rounded-xl p-3">
        <Typography className="text-sm opacity-70 font-semibold mb-4">
          Game Drives
        </Typography>
        <Divider className="w-full color-[#edeef0] my-[0.5rem]" />
        <Box id="style-1" className="w-full max-h-[40rem] overflow-y-auto ">
          {data.gameData.drives.previous.map((drive: any) => (
            <Accordion key={uuidv4()}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Box className="w-full grid grid-cols-[1fr_1fr] text-center mr-2">
                  <Box className="flex flex-row items-center gap-2">
                    <Image
                      src={drive.team.logos[0].href}
                      width={100}
                      height={100}
                      alt="team logo"
                      className="w-8 md:w-10 object-contain"
                    />
                    <Typography className="text-sm md:text-lg font-bold">
                      {drive.displayResult}
                    </Typography>
                  </Box>
                  <Box className="grid grid-cols-3 items-center gap-5">
                    <Box className="flex flex-col justify-center items-center">
                      <Typography className="text-sm font-semibold">
                        {drive.plays.length}
                      </Typography>
                      <Typography className="text-xs opacity-70">
                        Plays
                      </Typography>
                    </Box>
                    <Box className="hidden md:block flex flex-col justify-center items-center">
                      <Typography className=" text-sm font-semibold">
                        {drive.start.text}
                      </Typography>
                      <Typography className="text-xs opacity-70">
                        Start
                      </Typography>
                    </Box>
                    <Box className="flex flex-col justify-center items-center">
                      <Typography className="text-sm font-semibold">
                        {drive.yards}
                      </Typography>
                      <Typography className="text-xs opacity-70">
                        Yards
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ backgroundColor: "#edeef0;" }}>
                <Box className="flex flex-col gap-3">
                  {drive.plays.map((play: any) => (
                    <React.Fragment key={uuidv4()}>
                      <Box
                        sx={{
                          borderColor: drive.team?.name
                            ? drive.team.name === data.homeTeam.team.name
                              ? `#${data.homeTeam.team.color}`
                              : `#${data.awayTeam.team.color}`
                            : "gray",
                        }}
                        className="flex flex-col justify-start items-start bg-white rounded p-3 border-l-8"
                      >
                        <Typography className="opacity-100 text-base font-semibold">
                          {play.type.text}
                        </Typography>
                        <Typography className="text-sm opacity-80">
                          {play.text}
                        </Typography>
                        <Typography className="text-xs opacity-80 mt-5">
                          {play.start.downDistanceText}
                        </Typography>
                      </Box>
                    </React.Fragment>
                  ))}
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
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
                      {team.stats[5].displayValue}
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
                      {team.stats[0].displayValue}
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      );
    });
  }

  function findTeamDivison(teamName: string) {
    for (const conference in nflDivisonTeams) {
      for (const team of nflDivisonTeams[conference]) {
        if (team[0] == teamName) return conference;
      }
    }
  }

  function teamStats() {
    return (
      <>
        <Box className="w-full flex flex-col gap-2 mb-5">
          <Box className="flex flex-row gap-1 justify-start items-center">
            <Image
              src={`/nfl/${data.gameData.header.competitions[0].competitors[0].team.name}.png`}
              width={100}
              height={100}
              alt="team logo"
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
              src={`/nfl/${data.gameData.header.competitions[0].competitors[1].team.name
                .replace(" ", "")
                .toLowerCase()}.png`}
              width={100}
              height={100}
              alt="team logo"
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
              backgroundColor={data.backgroundColor}
              homeTeam={data.homeTeam}
              awayTeam={data.awayTeam}
              winningTeam={data.winningTeam}
              gameInfo={data.gameInfo}
              league="nfl"
              isGameStarted={data.isGameStarted}
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
                {stadiumInfo()}
                {data.isGameStarted && gameLeaders()}
                {divisionStandings()}
              </Box>

              <Box className="w-7/12 flex flex-col gap-5">
                {data.isGameStarted && (
                  <>
                    {boxScore()}
                    {scoringPlaysComponent()}
                    {gameDrives()}
                  </>
                )}
                {!data.isGameStarted && teamStats()}
              </Box>

              <Articles
                title="NFL News"
                teamNews={data.gameData.news}
                articleLimit={6}
              />
            </ContainerBox>
          </>
        ) : (
          <>
            <GameHeader
              backgroundColor={data.backgroundColor}
              homeTeam={data.homeTeam}
              awayTeam={data.awayTeam}
              winningTeam={data.winningTeam}
              gameInfo={data.gameInfo}
              league="nfl"
              isGameStarted={data.isGameStarted}
              isDesktopScreen={isDesktopScreen}
            />

            <Box className="block w-full h-10 flex justify-start items-center gap-3 bg-white pl-5">
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
                Team Stats
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
                onClick={() => setUserSelection("news")}
                sx={{ fontWeight: isSelected("news") ? "700" : "400" }}
                className="opacity-70 text-sm"
              >
                News
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
                <>
                  <Box className="w-full flex flex-col justify-center items-center gap-3">
                    {stadiumInfo()}
                    {data.isGameStarted && gameLeaders()}
                    {divisionStandings()}
                  </Box>
                </>
              )}

              {userSelection === "stats" && teamStats()}

              {userSelection === "scoreInfo" && (
                <>
                  <Box className="w-full flex flex-col gap-5">
                    {data.isGameStarted && (
                      <>
                        {boxScore()}
                        {scoringPlaysComponent()}
                        {gameDrives()}
                      </>
                    )}
                  </Box>
                </>
              )}

              {userSelection === "news" && (
                <>
                  <Articles
                    title="NFL News"
                    teamNews={data.gameData.news}
                    articleLimit={6}
                  />
                </>
              )}
            </ContainerBox>
          </>
        )}
      </>
    );
  }
}
