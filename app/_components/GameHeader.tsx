import { Box, Typography } from "@mui/material";
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
              <img
                className="w-32 object-cover"
                src={`/${league}/${homeTeam.team.name.replace(" ", "")}.png`}
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
                  {gameInfo.staus.type.shortDetail}
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
              <img
                className="w-32 object-cover"
                src={`/${league}/${awayTeam.team.name.replace(" ", "")}.png`}
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
                className="w-full h-32 place-items-center text-center text-white px-10 grid grid-cols-3 grid-rows-1 drop-shadow-md"
              >
                {/*Home Team Logo, abv, and record*/}
                <Box className="flex flex-row gap-3 justify-center items-center col-start-1">
                  <Box className="flex flex-col gap-1">
                    <Typography className="text-sm opacity-80 font-semibold">
                      {homeTeam.team.abbreviation}
                    </Typography>
                    <Typography className="text-xs opacity-80">
                      {homeTeam.record[0]?.displayValue || "0-0"}
                    </Typography>
                  </Box>
                  <img
                    className="w-10 m-auto object-contain"
                    src={`/${league}/${homeTeam.team.name.replace(
                      " ",
                      ""
                    )}.png`}
                  />
                </Box>

                <Box className="flex flex-col justify-center items-center col-start-2">
                  <Typography className="text-base opacity-80">
                    {gameInfo.broadcasts[0].media.shortName}
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

                {/*Away Team Logo, abv, and record*/}
                <Box className="flex flex-row gap-3 justify-center items-center col-start-3">
                  <img
                    className="w-10 m-auto object-contain"
                    src={`/${league}/${awayTeam.team.name.replace(
                      " ",
                      ""
                    )}.png`}
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
              </Box>
            </>
          ) : (
            <>
              <Box
                sx={{
                  backgroundColor: backgroundColor,
                }}
                className="w-full h-40 place-items-center text-center text-white grid grid-cols-5 grid-rows-1 drop-shadow-md"
              >
                {/*Home Team Logo, abv, and record*/}
                <Box className="flex flex-col col-start-1">
                  <img
                    className="w-10 m-auto object-contain"
                    src={`/${league}/${homeTeam.team.name.replace(
                      " ",
                      ""
                    )}.png`}
                  />
                  <Typography className="text-sm opacity-80 font-semibold">
                    {homeTeam.team.abbreviation}
                  </Typography>
                  <Typography className="text-sm opacity-80">
                    {homeTeam.record[0]?.displayValue || "0-0"}
                  </Typography>
                </Box>

                <Typography
                  sx={{
                    fontWeight: "700",
                    opacity: homeTeam.score > awayTeam.score ? "1" : "0.5",
                  }}
                  className="text-3xl col-start-2"
                >
                  {homeTeam.score}
                </Typography>
                <Typography className="text-sm text-white opacity-80 font-bold col-start-3">
                  {gameInfo.status.type.detail}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "700",
                    opacity: awayTeam.score > homeTeam.score ? "1" : "0.5",
                  }}
                  className="text-3xl col-start-4"
                >
                  {awayTeam.score}
                </Typography>

                {/*Away Team Logo, abv, and record*/}
                <Box className="flex flex-col col-start-5">
                  <img
                    className="w-10 object-contain"
                    src={`/${league}/${awayTeam.team.name.replace(
                      " ",
                      ""
                    )}.png`}
                  />
                  <Typography className="text-sm opacity-80 font-semibold">
                    {awayTeam.team.abbreviation}
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
