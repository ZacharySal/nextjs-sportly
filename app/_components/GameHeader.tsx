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
  gameStatus,
  league,
  isGameStarted,
}: {
  backgroundColor: string;
  homeTeam: any;
  awayTeam: any;
  gameStatus: string;
  league: string;
  isGameStarted: boolean;
}) {
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
            <span className="font-bold opacity-100">Scheduled</span> <br />
            {gameStatus}
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
  );
}
