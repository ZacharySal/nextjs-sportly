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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ContainerBox from "@/app/_components/ContainerBox";
import GameHeader from "@/app/_components/GameHeader";
import Articles from "@/app/_components/Articles";
import { nflDivisonTeams } from "@/app/_lib/constants";

async function getGameData(gameId: string) {
  const response = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/football/nfl/summary?event=${gameId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch game data");
  }

  return response.json();
}

async function getNflWeeks() {
  const response = await fetch(
    "https://cdn.espn.com/core/nfl/scoreboard?xhr=1&limit=50"
  );

  if (!response.ok) {
    throw new Error("Failed to get NFL weeks data");
  }

  const data = await response.json();

  let seasonInfo: any = [];
  let weeks: any;
  let finalWeeks: any = [];

  data.content.sbData.leagues[0].calendar.map(
    (week: any) => (
      (weeks = week.entries.map((weekEntry: any) => ({
        weekEndDate: weekEntry.endDate,
        weekStartDate: weekEntry.startDate,
        weekLabel: weekEntry.alternateLabel,
        weekDisplayDateRange: weekEntry.detail,
        weekValue: weekEntry.value,
        seasonValue: week.value,
      }))),
      seasonInfo.push({
        seasonStartDate: week.startDate,
        seasonEndDate: week.endDate,
        seasonLabel: week.label,
        seasonWeeks: weeks,
      }),
      (weeks = []),
      finalWeeks.push(seasonInfo)
    )
  );

  return finalWeeks[0];
}

async function getTeamStats(teamId: string) {
  {
    /* TODO: Change type to 2 for current season, or add use context to always get current year and season*/
  }
  const response = await fetch(
    `https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2023/types/1/teams/${teamId}/statistics`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch team stats");
  }

  return response.json();
}

export default async function TeamPage({
  params,
}: {
  params: { gameId: string };
}) {
  const gameData = await getGameData(params.gameId);
  const seasonWeeks = await getNflWeeks();

  const homeTeam = gameData.header.competitions[0].competitors[0];
  const awayTeam = gameData.header.competitions[0].competitors[1];

  const homeTeamStats = await getTeamStats(homeTeam.id);
  const awayTeamStats = await getTeamStats(awayTeam.id);

  const homeTeamLinescore = homeTeam.linescores;
  const awayTeamLinescore = awayTeam.linescores;

  const winningTeam = homeTeam.winner ? homeTeam : awayTeam;

  const isGameStarted = gameData.lastFiveGames ? false : true;

  const homeTeamDisplayStats = {
    "Passing YPG": homeTeamStats.splits.categories[1].stats[9],
    "Rushing YPG": homeTeamStats.splits.categories[2].stats[13],
    "Total YPG": homeTeamStats.splits.categories[1].stats[10],
    "Total PPG": homeTeamStats.splits.categories[1].stats[30],
    YAC: homeTeamStats.splits.categories[3].stats[13],
    "3rd Down %": homeTeamStats.splits.categories[10].stats[14],
    "Turnover Diff": homeTeamStats.splits.categories[10].stats[21],
    Sacks: homeTeamStats.splits.categories[4].stats[14],
  };

  const awayTeamDisplayStats = {
    "Passing YPG": awayTeamStats.splits.categories[1].stats[9],
    "Rushing YPG": awayTeamStats.splits.categories[2].stats[13],
    "Total YPG": awayTeamStats.splits.categories[1].stats[10],
    "Total PPG": awayTeamStats.splits.categories[1].stats[30],
    YAC: awayTeamStats.splits.categories[3].stats[13],
    "3rd Down %": awayTeamStats.splits.categories[10].stats[14],
    "Turnover Diff": awayTeamStats.splits.categories[10].stats[21],
    Sacks: awayTeamStats.splits.categories[4].stats[14],
  };

  let allScoringPlays;
  let firstQuarterScoringPlays: any[] = [];
  let secondQuarterScoringPlays: any[] = [];
  let thirdQuarterScoringPlays: any[] = [];
  let fourthQuarterScoringPlays: any[] = [];

  const backgroundColor = isGameStarted ? `#${winningTeam.team.color}` : "gray";
  const gameStatus = gameData.header.competitions[0].status.type.detail;

  if (isGameStarted) {
    allScoringPlays = gameData.scoringPlays;
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

  function stadiumInfo() {
    return (
      <Box className="w-full flex flex-col bg-white rounded-xl drop-shadow-md gap-2 p-3">
        <Typography className="text-sm opacity-70 font-semibold text-start">
          Stadium Information
        </Typography>
        <img className="rounded" src={gameData.gameInfo.venue.images[0].href} />
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
                className="w-[30px] h-[30px] border rounded-full object-cover"
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
              <Typography className="max-w-[6rem] truncate text-sm opacity-80 font-bold">
                {gameData.leaders[0].leaders[0].leaders[0].athlete.shortName}
              </Typography>
              <Typography className="max-w-[6rem] text-[10px] opacity-90 word truncate">
                {gameData.leaders[0].leaders[0].leaders[0].displayValue}
              </Typography>
            </Box>
          </Box>

          {/* AWAY TEAM PASSING LEADER */}
          <Box className="flex flex-row justify-between items-center">
            <Box className="flex flex-col items-start">
              <Typography className=" max-w-[6rem] truncate text-sm opacity-80 font-bold">
                {gameData.leaders[1].leaders[0].leaders[0].athlete.shortName}
              </Typography>
              <Typography className=" max-w-[6rem] text-[10px] opacity-90 word truncate">
                {gameData.leaders[1].leaders[0].leaders[0].displayValue}
              </Typography>
            </Box>
            <Box className="flex flex-col justify-center items-center gap-1">
              <img
                className="w-[30px] h-[30px] border rounded-full object-cover"
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

          <Typography className="text-sm col-span-2 text-center opacity-70 mb-[-0.5rem]">
            Rushing Yards
          </Typography>

          {/* HOME TEAM RUSHING LEADER */}
          <Box className="flex flex-row justify-between items-center">
            <Box className="flex flex-col justify-center items-center gap-1">
              <img
                className="w-[30px] h-[30px] border rounded-full object-cover"
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
              <Typography className="max-w-[6rem] truncate text-sm opacity-80 font-bold">
                {gameData.leaders[0].leaders[1].leaders[0].athlete.shortName}
              </Typography>
              <Typography className=" max-w-[6rem] text-[10px] opacity-90 word truncate">
                {gameData.leaders[0].leaders[1].leaders[0].displayValue}
              </Typography>
            </Box>
          </Box>

          {/* AWAY TEAM RUSHING LEADER */}
          <Box className="flex flex-row justify-between items-center">
            <Box className="flex flex-col items-start">
              <Typography className="max-w-[6rem] truncate text-sm opacity-80 font-bold">
                {gameData.leaders[1].leaders[1].leaders[0].athlete.shortName}
              </Typography>
              <Typography className=" max-w-[6rem] text-[10px] opacity-90 word truncate">
                {gameData.leaders[1].leaders[1].leaders[0].displayValue}
              </Typography>
            </Box>
            <Box className="flex flex-col justify-center items-center gap-1">
              <img
                className="w-[30px] h-[30px] border rounded-full object-cover"
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
          <Typography className="text-sm col-span-2 text-center opacity-70 mb-[-0.5rem]">
            Recieving Yards
          </Typography>
          {/* HOME TEAM RECIEVING */}
          <Box className="flex flex-row justify-between items-center">
            <Box className="flex flex-col justify-center items-center gap-1">
              <img
                className="w-[30px] h-[30px] border rounded-full object-cover"
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
              <Typography className="max-w-[6rem] truncate text-sm opacity-80 font-bold">
                {gameData.leaders[0].leaders[2].leaders[0].athlete.shortName}
              </Typography>
              <Typography className=" max-w-[6rem] text-[10px] opacity-90 word truncate">
                {gameData.leaders[0].leaders[2].leaders[0].displayValue}
              </Typography>
            </Box>
          </Box>

          {/* AWAY TEAM RECIEVING LEADER */}
          <Box className="flex flex-row justify-between items-center">
            <Box className="flex flex-col items-start">
              <Typography className="text-sm opacity-80 font-bold">
                {gameData.leaders[1].leaders[2].leaders[0].athlete.shortName}
              </Typography>
              <Typography className=" max-w-[6rem] text-[10px] opacity-90 word truncate">
                {gameData.leaders[1].leaders[2].leaders[0].displayValue}
              </Typography>
            </Box>
            <Box className="flex flex-col justify-center items-center gap-1">
              <img
                className="w-[30px] h-[30px] border rounded-full object-cover"
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
          {gameData.drives.previous.map((drive: any) => (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Box className="w-full flex flex-row justify-between items-center gap-5">
                  <Box className="flex flex-row items-center gap-2">
                    <img
                      className="w-10 object-contain"
                      src={drive.team.logos[0].href}
                    />
                    <Typography className="text-lg font-bold">
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
                    <Box className="flex flex-col justify-center items-center">
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
                    <Box className="flex flex-col justify-center items-center">
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
                    key={team.team}
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

  return (
    <>
      <GameHeader
        backgroundColor={backgroundColor}
        homeTeam={homeTeam}
        awayTeam={awayTeam}
        gameStatus={gameStatus}
        league="nfl"
        isGameStarted={isGameStarted}
      />

      <ContainerBox
        altColor={isGameStarted ? winningTeam.team.alternateColor : "gray"}
        mainColor={isGameStarted ? winningTeam.team.color : "gray"}
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

        <Articles title="NFL News" teamNews={gameData.news} articleLimit={6} />
      </ContainerBox>
    </>
  );
}
