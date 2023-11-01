import { Box, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import {
  mlbDivisonTeams,
  nbaDivisionTeams,
  nflDivisonTeams,
} from "../_lib/constants";

export default function GameHeader({
  league,
  data,
}: {
  league: string;
  data: any;
}) {
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");
  const homeTeam = data.header.competitions[0].competitors[0];
  const awayTeam = data.header.competitions[0].competitors[1];
  const gameInfo = data.header.competitions[0];
  const isGameStarted =
    league === "nfl"
      ? data.drives
        ? true
        : false
      : data.plays?.length > 0
      ? true
      : false;
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

  return (
    <>
      {isDesktopScreen ? (
        <Box className="bg-white w-full flex justify-center border-b border-[rgba(0,0,0,0.2)] z-40 sticky top-[2.75rem]">
          <Box className="w-full 2xl:w-2/5 h-28 flex-row flex justify-center items-center gap-10 relative">
            <Box className="flex flex-row justify-center items-center gap-3">
              <Box className="flex flex-col text-black">
                <Box
                  sx={{ backgroundColor: "#" + awayTeam.team.color }}
                  className="mr-10 game-header-logo-wrapper game-header-logo-wrapper--left md:left-0 xl:left-[150px] 2xl:left-[-150px]"
                >
                  <Image
                    src={`/${league}/${awayTeam.team.name
                      .replace(" ", "")
                      .toLowerCase()}.png`}
                    width={500}
                    height={500}
                    alt="away team logo"
                    className="w-44 object-cover game-header-logo--left"
                  />
                </Box>
                <Typography className="text font-bold whitespace-nowrap">
                  {awayTeam.team.location + " " + awayTeam.team.name}
                </Typography>
                <Typography className="text-xs opacity-70 text-right">
                  {findTeamDivison(awayTeam.team.displayName)},{" "}
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
                className="w-14 object-cover"
              />
              <Typography
                sx={{
                  fontWeight: "700",
                  opacity:
                    Number(awayTeam.score) > Number(homeTeam.score)
                      ? "0.8"
                      : "0.5",
                }}
                className="w-full text-black text-4xl ml-4"
              >
                {awayTeam.score}
              </Typography>
            </Box>
            {isGameStarted ? (
              <>
                <Typography className="text-sm text-[rgba(0,0,0,0.6)] font-semibold">
                  {gameInfo.status.type.shortDetail}
                </Typography>
              </>
            ) : (
              <Box>
                <Typography className="text-black text-center text-2xl opacity-70 max-w-[20rem]">
                  <span className="font-bold opacity-100">Scheduled</span>{" "}
                  <br />
                  {gameInfo.status.type.shortDetail}
                </Typography>
              </Box>
            )}

            <Box className="flex flex-row justify-center items-center gap-3">
              <Typography
                sx={{
                  fontWeight: "700",
                  opacity:
                    Number(homeTeam.score) > Number(awayTeam.score)
                      ? "0.8"
                      : "0.5",
                }}
                className="w-full text-black text-4xl mr-4"
              >
                {homeTeam.score}
              </Typography>
              <Image
                src={`/${league}/${homeTeam.team.name
                  .replace(" ", "")
                  .toLowerCase()}.png`}
                width={100}
                height={100}
                alt="home team logo"
                className="w-14 object-cover"
              />
              <Box className="flex flex-col text-black opacity-80">
                <Typography className="font-bold whitespace-nowrap">
                  {homeTeam.team.location + " " + homeTeam.team.name}
                </Typography>
                <Typography className="text-xs opacity-70 text-left">
                  {findTeamDivison(homeTeam.team.displayName)},{" "}
                  {homeTeam.record[0]?.displayValue || "0-0"}
                </Typography>
              </Box>
              <Box
                sx={{ backgroundColor: "#" + homeTeam.team.color }}
                className="ml-10 game-header-logo-wrapper game-header-logo-wrapper--right md:right-0 xl:right-[150px]  2xl:right-[-150px]"
              >
                <Image
                  src={`/${league}/${homeTeam.team.name
                    .replace(" ", "")
                    .toLowerCase()}.png`}
                  width={500}
                  height={500}
                  alt="home team logo"
                  className="w-44 object-cover game-header-logo--right"
                />
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <>
          {gameInfo.status.type.description === "Scheduled" ? (
            <>
              <Box
                sx={{
                  backgroundColor: "white",
                }}
                className="w-full h-20 border-b border-[rgba(0,0,0,0.2)] place-items-center justify-center gap-x-6 text-center text-black px-3 grid grid-rows-1 drop-shadow-sm sticky top-[2.5rem] z-40"
              >
                {/*Away Team Logo, abv, and record*/}
                <Box className="flex flex-row gap-1 justify-center items-center col-start-1">
                  <Box className="flex flex-col gap-1">
                    <Typography className="text-sm opacity-80 font-semibold">
                      {awayTeam.team.abbreviation}
                    </Typography>
                    <Typography className="text-xs opacity-80 whitespace-nowrap">
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
                    className="w-8 object-contain"
                  />
                </Box>

                <Box className="flex flex-col justify-center items-center col-start-2 text-black">
                  <Typography className="text-xs opacity-70">
                    {gameInfo.broadcasts[0]?.media?.shortName || ""}
                  </Typography>
                  <Typography className="text-xs opacity-80">
                    {gameDate.getMonth()}/{gameDate.getDate()}
                  </Typography>
                  <Typography className="text-xs opacity-80">
                    {gameDate.toLocaleTimeString("en-us", {
                      timeStyle: "short",
                    })}
                  </Typography>
                </Box>

                {/*Home Team Logo, abv, and record*/}
                <Box className="flex flex-row gap-1 justify-center items-center col-start-3">
                  <Image
                    src={`/${league}/${homeTeam.team.name
                      .replace(" ", "")
                      .toLowerCase()}.png`}
                    width={100}
                    height={100}
                    alt="home team logo"
                    className="w-8 object-contain"
                  />
                  <Box className="flex flex-col gap-1">
                    <Typography className="text-sm opacity-80 font-semibold">
                      {homeTeam.team.abbreviation}
                    </Typography>
                    <Typography className="text-xs opacity-80 whitespace-nowrap">
                      {homeTeam.record[0]?.displayValue || "0-0"}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </>
          ) : (
            <>
              <Box
                sx={{
                  backgroundColor: "white",
                }}
                className="w-full h-20 px-3 py-10 border-b border-[rgba(0,0,0,0.2)] place-items-center text-center text-black grid grid-cols-5 grid-rows-1 drop-shadow-sm sticky top-[2.5rem] z-40"
              >
                {/*Home Team Logo, abv, and record*/}
                <Box className="flex flex-row gap-1 items-center col-start-1">
                  <Box className="flex flex-col">
                    <Typography className="text-xs opacity-70 font-semibold">
                      {awayTeam.team.abbreviation}
                    </Typography>
                    <Typography className="text-xs opacity-70 whitespace-nowrap">
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
                    className="w-8 object-contain"
                  />
                </Box>

                <Typography
                  sx={{
                    fontWeight: "700",
                    opacity:
                      Number(awayTeam.score) > Number(homeTeam.score)
                        ? "1"
                        : "0.5",
                  }}
                  className={`${
                    Number(awayTeam.score) > Number(homeTeam.score)
                      ? "away-winning-score-header"
                      : ""
                  } pr-4 relative text-2xl col-start-2`}
                >
                  {awayTeam.score}
                </Typography>

                <Typography
                  sx={{
                    color:
                      gameInfo.status.type.shortDetail == "Final"
                        ? "black"
                        : "#d50a0a",
                  }}
                  className="opacity-90 whitespace-nowrap text-sm font-semibold col-start-3"
                >
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
                  className={`${
                    Number(homeTeam.score) > Number(awayTeam.score)
                      ? "home-winning-score-header"
                      : ""
                  } relative pl-4 text-2xl col-start-4`}
                >
                  {homeTeam.score}
                </Typography>

                <Box className="flex flex-row gap-1 items-center col-start-5 text-black">
                  <Image
                    src={`/${league}/${homeTeam.team.name
                      .replace(" ", "")
                      .toLowerCase()}.png`}
                    width={100}
                    height={100}
                    alt="home team logo"
                    className="w-8 object-contain"
                  />
                  <Box className="flex flex-col">
                    <Typography className="text-xs opacity-80 font-semibold">
                      {homeTeam.team.abbreviation}
                    </Typography>
                    <Typography className="text-xs opacity-80  whitespace-nowrap">
                      {homeTeam.record[0]?.displayValue || "0-0"}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </>
          )}
        </>
      )}
    </>
  );
}
