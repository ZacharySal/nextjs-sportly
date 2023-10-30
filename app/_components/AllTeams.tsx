import { Box, Divider, Typography } from "@mui/material";
import TeamSideCard from "./TeamSideCard";
import { v4 as uuidv4 } from "uuid";

function AllTeams({ allTeams, league }: { allTeams: any; league: string }) {
  return (
    <Box className="w-full bg-white rounded-xl">
      <Typography className="p-3 text-xl md:text-2xl font-bold opacity-80 mb-[-0.35rem]">
        {league.toUpperCase()} Teams
      </Typography>
      <Box className="w-full flex flex-col gap-3 md:grid md:grid-cols-2">
        {Object.entries(allTeams).map(([conference, teams]: [string, any]) => (
          <Box key={uuidv4()} className="p-3">
            <h1 className="font-bold text-[13px] opacity-80 mb-1">
              {conference}
            </h1>
            <Divider flexItem />
            {teams.map((team: any) => (
              <TeamSideCard key={uuidv4()} name={team} league={league} />
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default AllTeams;
