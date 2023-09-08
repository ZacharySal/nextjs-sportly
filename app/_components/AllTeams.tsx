import { Box, Divider } from "@mui/material";
import TeamSideCard from "./TeamSideCard";
import { v4 as uuidv4 } from "uuid";

function AllTeams({ allTeams, league }: { allTeams: any; league: string }) {
  return (
    <Box className="w-full flex flex-col gap-3">
      {Object.entries(allTeams).map(([conference, teams]: [string, any]) => (
        <Box key={uuidv4()} className="bg-white rounded-xl p-3 drop-shadow-md">
          <h1 className="font-semibold text-sm opacity-80 mb-1">{conference}</h1>
          <Divider flexItem />
          {teams.map((team: any) => (
            <TeamSideCard key={uuidv4()} name={team} league={league} />
          ))}
        </Box>
      ))}
    </Box>
  );
}

export default AllTeams;
