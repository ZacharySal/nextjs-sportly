import { Box, Typography } from "@mui/material";
import Image from "next/image";
import {
  mlbDivisonTeams,
  nbaDivisionTeams,
  nflDivisonTeams,
} from "../_lib/constants";

export default function GameHeader({
  backgroundColor,
  homeTeam,
  awayTeam,
  winningTeam,
  gameInfo,
  league,
  isGameStarted,
  isDesktopScreen,
}: {
  backgroundColor: string;
  homeTeam: any;
  awayTeam: any;
  winningTeam: any;
  gameInfo: any;
  league: string;
  isGameStarted: boolean;
  isDesktopScreen: boolean;
}) {
  const gameDate = new Date(gameInfo.date);

  function findTeamDivison(teamName: string) {
    let allTeams;
    if (league === "nfl") allTeams = nflDivisonTeams;
    else if (league === "nba") allTeams = nbaDivisionTeams;
    else if (league === "mlb") allTeams = mlbDivisonTeams;
    for (const conference in allTeams) {
      for (const team of allTeams[conference]) {
        if (team[0] == teamName) return conference;
      }
    }
  }

  let record;

  return (
    <>
      {isDesktopScreen ? (
        <>
          <Box
            sx={{
              backgroundColor: backgroundColor,
            }}
            className="w-full h-40 flex-row flex justify-center items-center gap-10 drop-shadow-md"
          >
            <Box className="flex flex-row justify-center items-center gap-3">
              <Image
                src={`/${league}/${homeTeam.team.name
                  .replace(" ", "")
                  .toLowerCase()}.png`}
                width={100}
                height={100}
                alt="home team logo"
                className="w-32 object-cover"
              />
              <Box className="flex flex-col text-white opacity-80">
                <Typography className="text-3xl opacity-70">
                  {homeTeam.team.location}
                </Typography>
                <Typography className="text-3xl font-bold">
                  {homeTeam.team.name}
                </Typography>
                <Typography className="opacity-70">
                  {findTeamDivison(homeTeam.team.displayName)} •{" "}
                  {homeTeam.record[0]?.displayValue || "0-0"}
                </Typography>
              </Box>
            </Box>
            {isGameStarted ? (
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
            ) : (
              <Box>
                <Typography className="text-white text-center text-2xl opacity-70 max-w-[20rem]">
                  <span className="font-bold opacity-100">Scheduled</span>{" "}
                  <br />
                  {gameInfo.status.type.shortDetail}
                </Typography>
              </Box>
            )}

            <Box className="flex flex-row justify-center items-center gap-3">
              <Box className="flex flex-col text-white opacity-80">
                <Typography className="text-3xl opacity-70">
                  {awayTeam.team.location}
                </Typography>
                <Typography className="text-3xl font-bold">
                  {awayTeam.team.name}
                </Typography>
                <Typography className="opacity-70">
                  {findTeamDivison(awayTeam.team.displayName)} •{" "}
                  {awayTeam.record[0]?.displayValue || "0-0"}
                </Typography>
              </Box>
              <Image
                src={`/${league}/${awayTeam.team.name
                  .replace(" ", "")
                  .toLowerCase()}.png`}
                width={100}
                height={100}
                alt="away team logo"
                className="w-32 object-cover"
              />
            </Box>
          </Box>
        </>
      ) : (
        <>
          {gameInfo.status.type.description === "Scheduled" ? (
            <>
              <Box
                sx={{
                  backgroundColor: backgroundColor,
                }}
                className="w-full h-32 place-items-center text-center text-white px-10 grid grid-cols-3 gap-x-4 grid-rows-1 drop-shadow-md"
              >
                {/*Away Team Logo, abv, and record*/}
                <Box className="flex flex-row gap-1 justify-center items-center col-start-1">
                  <Image
                    src={`/${league}/${awayTeam.team.name
                      .replace(" ", "")
                      .toLowerCase()}.png`}
                    width={100}
                    height={100}
                    alt="away team logo"
                    className="w-12 object-contain"
                  />
                  <Box className="flex flex-col gap-1">
                    <Typography className="text-sm opacity-80 font-semibold">
                      {awayTeam.team.abbreviation}
                    </Typography>
                    <Typography className="text-xs opacity-80">
                      {awayTeam.record[0]?.displayValue || "0-0"}
                    </Typography>
                  </Box>
                </Box>

                <Box className="flex flex-col justify-center items-center col-start-2">
                  <Typography className="text-base opacity-80">
                    {gameInfo.broadcasts[0]?.media?.shortName || ""}
                  </Typography>
                  <Typography className="text-sm opacity-90">
                    {gameDate.getMonth()}/{gameDate.getDate()}
                  </Typography>
                  <Typography className="text-sm opacity-90">
                    {gameDate.toLocaleTimeString("en-us", {
                      timeStyle: "short",
                    })}
                  </Typography>
                </Box>

                {/*Home Team Logo, abv, and record*/}
                <Box className="flex flex-row gap-1 justify-center items-center col-start-3">
                  <Box className="flex flex-col gap-1">
                    <Typography className="text-sm opacity-80 font-semibold">
                      {homeTeam.team.abbreviation}
                    </Typography>
                    <Typography className="text-xs opacity-80">
                      {homeTeam.record[0]?.displayValue || "0-0"}
                    </Typography>
                  </Box>
                  <Image
                    src={`/${league}/${homeTeam.team.name
                      .replace(" ", "")
                      .toLowerCase()}.png`}
                    width={100}
                    height={100}
                    alt="home team logo"
                    className="w-12 object-contain"
                  />
                </Box>
              </Box>
            </>
          ) : (
            <>
              <Box
                sx={{
                  backgroundColor: backgroundColor,
                }}
                className="w-full h-32 place-items-center text-center text-white grid grid-cols-5 grid-rows-1 drop-shadow-md"
              >
                {/*Home Team Logo, abv, and record*/}
                <Box className="flex flex-col gap-1 col-start-1">
                  <Image
                    src={`/${league}/${awayTeam.team.name
                      .replace(" ", "")
                      .toLowerCase()}.png`}
                    width={100}
                    height={100}
                    alt="away team logo"
                    className="w-10 m-auto object-contain"
                  />
                  <Typography className="text-sm opacity-80 font-semibold">
                    {awayTeam.team.abbreviation}
                  </Typography>
                  <Typography className="text-sm opacity-80">
                    {awayTeam.record[0]?.displayValue || "0-0"}
                  </Typography>
                </Box>

                <Typography
                  sx={{
                    fontWeight: "700",
                    opacity:
                      Number(awayTeam.score) > Number(homeTeam.score)
                        ? "1"
                        : "0.5",
                  }}
                  className="text-3xl col-start-2"
                >
                  {awayTeam.score}
                </Typography>

                <Typography className="text-sm text-white opacity-80 font-bold col-start-3">
                  {gameInfo.status.type.shortDetail}
                </Typography>

                <Typography
                  sx={{
                    fontWeight: "700",
                    opacity:
                      Number(homeTeam.score) > Number(awayTeam.score)
                        ? "1"
                        : "0.5",
                  }}
                  className="text-3xl col-start-4"
                >
                  {homeTeam.score}
                </Typography>

                <Box className="flex flex-col gap-1 col-start-5">
                  <Image
                    src={`/${league}/${homeTeam.team.name
                      .replace(" ", "")
                      .toLowerCase()}.png`}
                    width={100}
                    height={100}
                    alt="home team logo"
                    className="w-10 m-auto object-contain"
                  />
                  <Typography className="text-sm opacity-80 font-semibold">
                    {homeTeam.team.abbreviation}
                  </Typography>
                  <Typography className="text-sm opacity-80">
                    {homeTeam.record[0]?.displayValue || "0-0"}
                  </Typography>
                </Box>
              </Box>
            </>
          )}
        </>
      )}
    </>
  );
}
