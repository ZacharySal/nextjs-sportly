import { Box, Typography } from "@mui/material";
import { mlbDivisonTeams, nflDivisonTeams } from "@/app/_lib/constants";

function findTeamDivison(teamName: string, league: string) {
  let allTeams = league === "nfl" ? nflDivisonTeams : mlbDivisonTeams;
  for (const conference in allTeams) {
    for (const team of allTeams[conference]) {
      if (team[0] == teamName) return conference;
    }
  }
}

export default function TeamHeader({
  teamData = null,
  league,
}: {
  teamData: any;
  league: string;
}) {
  return (
    <Box
      sx={{ backgroundColor: `#${teamData.team.color}` }}
      className="w-full h-40 flex-row flex justify-start items-center gap-6 pl-60 drop-shadow-md"
    >
      <Box className="flex flex-row justify-center items-center gap-3">
        <img
          className="w-32 object-cover"
          src={`/${league}/${teamData.team.name.replace(" ", "")}.png`}
        />
        <Box className="flex flex-col text-white opacity-80 pr-6 border-r-4">
          <Typography className="text-3xl opacity-70">
            {teamData.team.location}
          </Typography>
          <Typography className="text-3xl font-bold">
            {teamData.team.name}
          </Typography>
        </Box>
      </Box>

      <Box className="flex flex-col justify-center items-center text-white">
        <Typography className="text-2xl font-semibold opacity-80">
          {findTeamDivison(teamData.team.displayName, league)}
        </Typography>
        <Typography className="text-2xl opacity-70 tracking-widest">
          {teamData.team.record.items[0].summary}
        </Typography>
      </Box>
    </Box>
  );
}
