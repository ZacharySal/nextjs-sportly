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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ContainerBox from "@/app/_components/ContainerBox";
import GameHeader from "@/app/_components/GameHeader";
import Articles from "@/app/_components/Articles";
import { nflDivisonTeams } from "@/app/_lib/constants";
import useSwr from "swr";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function TeamPage({ params }: { params: { gameId: string } }) {
  const { data: allGameData, isLoading } = useSwr(
    `http://localhost:3000/nfl/game/401547353/api/gameData?gameId=${params.gameId}`,
    fetcher
  );

  const [userSelection, setUserSelection] = useState("gameInfo");
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");
  const isSelected = (selection: string) => selection === userSelection;

  let homeTeam: any,
    awayTeam: any,
    winningTeam: any,
    isGameStarted: boolean,
    backgroundColor: string,
    gameInfo: any,
    homeTeamDisplayStats: any,
    awayTeamDisplayStats: any,
    allScoringPlays: any;

  let firstQuarterScoringPlays: any[] = [];
  let secondQuarterScoringPlays: any[] = [];
  let thirdQuarterScoringPlays: any[] = [];
  let fourthQuarterScoringPlays: any[] = [];

  if (!isLoading) {
    homeTeam = allGameData.gameData.header.competitions[0].competitors[0];
    awayTeam = allGameData.gameData.header.competitions[0].competitors[1];

    winningTeam = homeTeam.winner ? homeTeam : awayTeam;
    isGameStarted = allGameData.gameData.lastFiveGames ? false : true;
    // backgroundColor = isGameStarted ? `#${winningTeam.team.color}` : "#013369";
    backgroundColor = "#013369";
    gameInfo = allGameData.gameData.header.competitions[0];

    homeTeamDisplayStats = {
      "Passing YPG": allGameData.homeTeamStats.splits.categories[1].stats[9],
      "Rushing YPG": allGameData.homeTeamStats.splits.categories[2].stats[13],
      "Total YPG": allGameData.homeTeamStats.splits.categories[1].stats[10],
      "Total PPG": allGameData.homeTeamStats.splits.categories[1].stats[30],
      YAC: allGameData.homeTeamStats.splits.categories[3].stats[13],
      "3rd Down %": allGameData.homeTeamStats.splits.categories[10].stats[14],
      "Turnover Diff":
        allGameData.homeTeamStats.splits.categories[10].stats[21],
      Sacks: allGameData.homeTeamStats.splits.categories[4].stats[14],
    };

    awayTeamDisplayStats = {
      "Passing YPG": allGameData.awayTeamStats.splits.categories[1].stats[9],
      "Rushing YPG": allGameData.awayTeamStats.splits.categories[2].stats[13],
      "Total YPG": allGameData.awayTeamStats.splits.categories[1].stats[10],
      "Total PPG": allGameData.awayTeamStats.splits.categories[1].stats[30],
      YAC: allGameData.awayTeamStats.splits.categories[3].stats[13],
      "3rd Down %": allGameData.awayTeamStats.splits.categories[10].stats[14],
      "Turnover Diff":
        allGameData.awayTeamStats.splits.categories[10].stats[21],
      Sacks: allGameData.awayTeamStats.splits.categories[4].stats[14],
    };

    if (isGameStarted) {
      allScoringPlays = allGameData.gameData.scoringPlays;
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
    }
  }

  function quarterHeader(text: string) {
    return (
      <Box className="w-full flex flex-row justify-between items-center mb-2">
        <Typography className="opacity-70 text-xs">{text}</Typography>
        {/* <Box className="flex flex-row items-center gap-2">
          <img
            className="w-8 obejct-cotain"
            src={`/nfl/${gameData.header.competitions[0].competitors[0].team.name}.png`}
          />
          <img
            className="w-8 obejct-cotain"
            src={`/nfl/${gameData.header.competitions[0].competitors[1].team.name}.png`}
          />
        </Box> */}
      </Box>
    );
  }

  function scoringPlays(allScoringPlays: any) {
    const plays = allScoringPlays.map((play: any) => {
      return (
        <Box className="w-full flex flex-row justify-between items-center mb-1">
          <Box className="flex flex-row items-center gap-2">
            <img className="w-8 object-contain" src={play.team.logo} />
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

  function scoringPlaysComponent() {
    return (
      <Box className="w-full bg-white rounded-xl drop-shadow-md flex flex-col justify-center items-center p-3">
        <Typography className=" w-full text-left text-sm opacity-70 font-semibold">
          Scoring Plays
        </Typography>
        <Divider className="w-full color-[#edeef0] my-[0.5rem]" />
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
          <img
            className="w-8 obejct-cotain"
            src={`/nfl/${allGameData.gameData.header.competitions[0].competitors[0].team.name}.png`}
          />
          <Typography className=" text-sm md:text-base font-semibold opacity-80">
            {
              allGameData.gameData.header.competitions[0].competitors[0].team
                .name
            }
          </Typography>
          <Typography className="hidden md:block text-sm opacity-60">
            {
              allGameData.gameData.header.competitions[0].competitors[0]
                .record[0].displayValue
            }
          </Typography>
        </Box>

        <Box className="col-span-3 row-start-3 flex flex-row justify-start items-center gap-1 md:gap-2">
          <img
            className="w-8 obejct-cotain"
            src={`/nfl/${allGameData.gameData.header.competitions[0].competitors[1].team.name}.png`}
          />
          <Typography className="text-sm md:text-base font-semibold opacity-80">
            {
              allGameData.gameData.header.competitions[0].competitors[1].team
                .name
            }
          </Typography>
          <Typography className="hidden md:block text-sm opacity-60">
            {
              allGameData.gameData.header.competitions[0].competitors[1]
                .record[0].displayValue
            }
          </Typography>
        </Box>

        <Typography className="text-sm md:text-base opacity-70 col-start-4 row-start-2">
          {
            allGameData.gameData.header.competitions[0].competitors[0]
              .linescores[0].displayValue
          }
        </Typography>
        <Typography className="text-sm md:text-base opacity-70 col-start-5 row-start-2">
          {homeTeam.linescores[1].displayValue}
        </Typography>
        <Typography className="text-sm md:text-base opacity-70 col-start-6 row-start-2">
          {homeTeam.linescores[2].displayValue}
        </Typography>
        <Typography className="text-sm md:text-base opacity-70 col-start-7 row-start-2">
          {homeTeam.linescores[3].displayValue}
        </Typography>
        <Typography className="text-sm md:text-base font-bold col-start-8 row-start-2">
          {allGameData.gameData.header.competitions[0].competitors[0].score}
        </Typography>

        <Typography className="text-sm md:text-base opacity-70 col-start-4 row-start-3">
          {awayTeam.linescores[0].displayValue}
        </Typography>
        <Typography className="text-sm md:text-base opacity-70 col-start-5 row-start-3">
          {awayTeam.linescores[1].displayValue}
        </Typography>
        <Typography className="text-sm md:text-base opacity-70 col-start-6 row-start-3">
          {awayTeam.linescores[2].displayValue}
        </Typography>
        <Typography className="text-sm md:text-base opacity-70 col-start-7 row-start-3">
          {awayTeam.linescores[3].displayValue}
        </Typography>
        <Typography className="text-sm md:text-base  font-bold col-start-8 row-start-3">
          {allGameData.gameData.header.competitions[0].competitors[1].score}
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
        <img
          className="rounded"
          src={allGameData.gameData.gameInfo.venue.images[0].href}
        />
        <Typography className="opacity-80 font-bold">
          {allGameData.gameData.gameInfo.venue.fullName}
        </Typography>
        <Typography className="opacity-80 text-sm mt-[-0.5rem]">
          {allGameData.gameData.gameInfo.venue.address.city},{" "}
          {allGameData.gameData.gameInfo.venue.address.state}
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
              <img
                className="w-10 h-10 md:w-[30px] md:h-[30px] border rounded-full object-cover"
                src={
                  allGameData.gameData.leaders[0].leaders[0].leaders[0].athlete
                    .headshot.href
                }
              />
              <Typography className="text-xs opacity-80">
                {allGameData.gameData.leaders[0].team.abbreviation}
              </Typography>
            </Box>
            <Box className="flex flex-col items-end">
              <Typography className="max-w-[6rem] truncate text-sm opacity-80 font-bold">
                {
                  allGameData.gameData.leaders[0].leaders[0].leaders[0].athlete
                    .shortName
                }
              </Typography>
              <Typography className="max-w-[6rem] text-[10px] opacity-90 word truncate">
                {
                  allGameData.gameData.leaders[0].leaders[0].leaders[0]
                    .displayValue
                }
              </Typography>
            </Box>
          </Box>

          {/* AWAY TEAM PASSING LEADER */}
          <Box className="flex flex-row justify-between items-center">
            <Box className="flex flex-col items-start">
              <Typography className=" max-w-[6rem] truncate text-sm opacity-80 font-bold">
                {
                  allGameData.gameData.leaders[1].leaders[0].leaders[0].athlete
                    .shortName
                }
              </Typography>
              <Typography className=" max-w-[6rem] text-[10px] opacity-90 word truncate">
                {
                  allGameData.gameData.leaders[1].leaders[0].leaders[0]
                    .displayValue
                }
              </Typography>
            </Box>
            <Box className="flex flex-col justify-center items-center gap-1">
              <img
                className="w-10 h-10 md:w-[30px] md:h-[30px] border rounded-full object-cover"
                src={
                  allGameData.gameData.leaders[1].leaders[0].leaders[0].athlete
                    .headshot.href
                }
              />
              <Typography className="text-xs opacity-80">
                {allGameData.gameData.leaders[1].team.abbreviation}
              </Typography>
            </Box>
          </Box>

          <Typography className="text-sm col-span-2 text-center opacity-70 mb-[-0.5rem]">
            Rushing Yards
          </Typography>

          {/* HOME TEAM RUSHING LEADER */}
          <Box className="flex flex-row justify-between items-center">
            <Box className="flex flex-col justify-center items-center gap-1">
              <img
                className="w-10 h-10 md:w-[30px] md:h-[30px] border rounded-full object-cover"
                src={
                  allGameData.gameData.leaders[0].leaders[1].leaders[0].athlete
                    .headshot.href
                }
              />
              <Typography className="text-xs opacity-80">
                {allGameData.gameData.leaders[0].team.abbreviation}
              </Typography>
            </Box>
            <Box className="flex flex-col items-end">
              <Typography className="max-w-[6rem] truncate text-sm opacity-80 font-bold">
                {
                  allGameData.gameData.leaders[0].leaders[1].leaders[0].athlete
                    .shortName
                }
              </Typography>
              <Typography className=" max-w-[6rem] text-[10px] opacity-90 word truncate">
                {
                  allGameData.gameData.leaders[0].leaders[1].leaders[0]
                    .displayValue
                }
              </Typography>
            </Box>
          </Box>

          {/* AWAY TEAM RUSHING LEADER */}
          <Box className="flex flex-row justify-between items-center">
            <Box className="flex flex-col items-start">
              <Typography className="max-w-[6rem] truncate text-sm opacity-80 font-bold">
                {
                  allGameData.gameData.leaders[1].leaders[1].leaders[0].athlete
                    .shortName
                }
              </Typography>
              <Typography className=" max-w-[6rem] text-[10px] opacity-90 word truncate">
                {
                  allGameData.gameData.leaders[1].leaders[1].leaders[0]
                    .displayValue
                }
              </Typography>
            </Box>
            <Box className="flex flex-col justify-center items-center gap-1">
              <img
                className="w-10 h-10 md:w-[30px] md:h-[30px] border rounded-full object-cover"
                src={
                  allGameData.gameData.leaders[1].leaders[1].leaders[0].athlete
                    .headshot.href
                }
              />
              <Typography className="text-xs opacity-80">
                {allGameData.gameData.leaders[1].team.abbreviation}
              </Typography>
            </Box>
          </Box>
          <Typography className="text-sm col-span-2 text-center opacity-70 mb-[-0.5rem]">
            Recieving Yards
          </Typography>
          {/* HOME TEAM RECIEVING */}
          <Box className="flex flex-row justify-between items-center">
            <Box className="flex flex-col justify-center items-center gap-1">
              <img
                className="w-10 h-10 md:w-[30px] md:h-[30px] border rounded-full object-cover"
                src={
                  allGameData.gameData.leaders[0].leaders[2].leaders[0].athlete
                    .headshot.href
                }
              />
              <Typography className="text-xs opacity-80">
                {allGameData.gameData.leaders[0].team.abbreviation}
              </Typography>
            </Box>
            <Box className="flex flex-col items-end">
              <Typography className="max-w-[6rem] truncate text-sm opacity-80 font-bold">
                {
                  allGameData.gameData.leaders[0].leaders[2].leaders[0].athlete
                    .shortName
                }
              </Typography>
              <Typography className=" max-w-[6rem] text-[10px] opacity-90 word truncate">
                {
                  allGameData.gameData.leaders[0].leaders[2].leaders[0]
                    .displayValue
                }
              </Typography>
            </Box>
          </Box>

          {/* AWAY TEAM RECIEVING LEADER */}
          <Box className="flex flex-row justify-between items-center">
            <Box className="flex flex-col items-start">
              <Typography className="text-sm opacity-80 font-bold">
                {
                  allGameData.gameData.leaders[1].leaders[2].leaders[0].athlete
                    .shortName
                }
              </Typography>
              <Typography className=" max-w-[6rem] text-[10px] opacity-90 word truncate">
                {
                  allGameData.gameData.leaders[1].leaders[2].leaders[0]
                    .displayValue
                }
              </Typography>
            </Box>
            <Box className="flex flex-col justify-center items-center gap-1">
              <img
                className="w-10 h-10 md:w-[30px] md:h-[30px] border rounded-full object-cover"
                src={
                  allGameData.gameData.leaders[1].leaders[2].leaders[0].athlete
                    .headshot.href
                }
              />
              <Typography className="text-xs opacity-80">
                {allGameData.gameData.leaders[1].team.abbreviation}
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
          {allGameData.gameData.drives.previous.map((drive: any) => (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Box className="w-full grid grid-cols-[1fr_1fr] text-center">
                  <Box className="flex flex-row items-center gap-2">
                    <img
                      className="w-8 md:w-10 object-contain"
                      src={drive.team.logos[0].href}
                    />
                    <Typography className="text-sm md:text-lg font-bold">
                      {drive.displayResult}
                    </Typography>
                  </Box>
                  <Box className="flex flex-row justify-center items-center gap-5 mr-5">
                    <Box className="flex flex-col justify-center items-center">
                      <Typography className="text-sm font-semibold">
                        {drive.plays.length}
                      </Typography>
                      <Typography className="text-sm opacity-70">
                        Plays
                      </Typography>
                    </Box>
                    <Box className="hidden md:block flex flex-col justify-center items-center">
                      <Typography className=" text-sm font-semibold">
                        {drive.start.text}
                      </Typography>
                      <Typography className="text-sm opacity-70">
                        Start
                      </Typography>
                    </Box>
                    <Box className="flex flex-col justify-center items-center">
                      <Typography className="text-sm font-semibold">
                        {drive.yards}
                      </Typography>
                      <Typography className="text-sm opacity-70">
                        Yards
                      </Typography>
                    </Box>
                    <Box className="hidden md:block flex flex-col justify-center items-center">
                      <Typography className="text-sm font-semibold">
                        {drive.timeElapsed.displayValue}
                      </Typography>
                      <Typography className="text-sm opacity-70">
                        Total Time
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ backgroundColor: "#edeef0;" }}>
                <Box className="flex flex-col gap-3">
                  {drive.plays.map((play: any) => (
                    <Box
                      sx={{
                        borderColor: drive.team?.name
                          ? drive.team.name === homeTeam.team.name
                            ? `#${homeTeam.team.color}`
                            : `#${awayTeam.team.color}`
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
    return allGameData.gameData.standings.groups.map((group: any) => {
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
                      {team.stats[5].displayValue}
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
                      {team.stats[0].displayValue}
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
        <Box className="w-full flex flex-col gap-1">
          <Box className="flex flex-row gap-1 justify-start items-center">
            <img
              className="w-8 object-contain"
              src={`/nfl/${allGameData.gameData.header.competitions[0].competitors[0].team.name}.png`}
            />
            <Typography className="opacity-70 font-semibold">
              {homeTeam.team.name} Stats
            </Typography>
          </Box>
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
          <Box className="flex flex-row gap-1 justify-start items-center">
            <img
              className="w-8 object-contain"
              src={`/nfl/${allGameData.gameData.header.competitions[0].competitors[1].team.name}.png`}
            />
            <Typography className="opacity-70 font-semibold">
              {awayTeam.team.name} Stats
            </Typography>
          </Box>
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

  if (!isLoading) {
    return (
      <>
        {isDesktopScreen ? (
          <>
            <GameHeader
              backgroundColor={backgroundColor}
              homeTeam={homeTeam}
              awayTeam={awayTeam}
              winningTeam={winningTeam}
              gameInfo={gameInfo}
              league="nfl"
              isGameStarted={isGameStarted}
              isDesktopScreen={isDesktopScreen}
            />

            <ContainerBox
              altColor={
                isGameStarted ? winningTeam.team.alternateColor : "gray"
              }
              mainColor={isGameStarted ? winningTeam.team.color : "gray"}
              isDesktopScreen={isDesktopScreen}
            >
              <Box className="w-1/3 flex flex-col justify-center items-center gap-3">
                {stadiumInfo()}
                {isGameStarted && gameLeaders()}
                {divisionStandings()}
              </Box>

              <Box className="w-7/12 flex flex-col gap-5">
                {isGameStarted && (
                  <>
                    {boxScore()}
                    {scoringPlaysComponent()}
                    {gameDrives()}
                  </>
                )}
                {!isGameStarted && teamStats()}
              </Box>

              <Articles
                title="NFL News"
                teamNews={allGameData.gameData.news}
                articleLimit={6}
              />
            </ContainerBox>
          </>
        ) : (
          <>
            <GameHeader
              backgroundColor={backgroundColor}
              homeTeam={homeTeam}
              awayTeam={awayTeam}
              gameInfo={gameInfo}
              league="nfl"
              isGameStarted={isGameStarted}
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
              {isGameStarted && (
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
                isGameStarted ? winningTeam.team.alternateColor : "gray"
              }
              mainColor={isGameStarted ? winningTeam.team.color : "gray"}
              isDesktopScreen={isDesktopScreen}
            >
              {userSelection === "gameInfo" && (
                <>
                  <Box className="w-full flex flex-col justify-center items-center gap-3">
                    {stadiumInfo()}
                    {isGameStarted && gameLeaders()}
                    {divisionStandings()}
                  </Box>
                </>
              )}

              {userSelection === "stats" && teamStats()}

              {userSelection === "scoreInfo" && (
                <>
                  <Box className="w-full flex flex-col gap-5">
                    {isGameStarted && (
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
                    teamNews={allGameData.gameData.news}
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
