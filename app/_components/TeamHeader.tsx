import { Box, Typography } from "@mui/material";
import Image from "next/image";
import {
  mlbDivisonTeams,
  nbaDivisionTeams,
  nflDivisonTeams,
} from "@/app/_lib/constants";

function findTeamDivison(teamName: string, league: string) {
  let allTeams;
  if (league === "nfl") allTeams = nflDivisonTeams;
  if (league === "nba") allTeams = nbaDivisionTeams;
  if (league === "mlb") allTeams = mlbDivisonTeams;

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
  let record;

  let isDesktop = true;
  try {
    record = teamData.team.record.items[0].summary;
  } catch {
    record = "0-0";
  }

  return (
    <Box
      sx={{ backgroundColor: `#${teamData.team.color}` }}
      className="w-full h-36 md:h-40 flex-row flex justify-start items-center gap-3 pl-5 md:pl-36 drop-shadow-md"
    >
      <Box className="flex flex-row justify-center items-center gap-3">
        <Image
          src={`/${league}/${teamData.team.name
            .replace(" ", "")
            .toLowerCase()}.png`}
          width={100}
          height={100}
          alt="team logo"
          className="w-24 md:w-32 object-contain"
        />
        <Box className="flex flex-col text-white opacity-80 pr-3 border-r-2 md:pr-6 md:border-r-4">
          <Typography className="text-xl md:text-3xl opacity-70">
            {teamData.team.location}
          </Typography>
          <Typography className="text-xl md:text-3xl font-bold">
            {teamData.team.name}
          </Typography>
        </Box>
      </Box>

      <Box className="flex flex-col justify-center items-center text-white">
        <Typography className="text-base md:text-2xl font-semibold opacity-80">
          {findTeamDivison(teamData.team.displayName, league)}
        </Typography>
        <Typography className="text-base md:text-2xl opacity-70 tracking-widest">
          {record}
        </Typography>
      </Box>
    </Box>
  );
}
