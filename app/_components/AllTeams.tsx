import { Box, Divider } from "@mui/material";
import TeamSideCard from "./TeamSideCard";

function AllTeams({ allTeams, league }: { allTeams: any; league: string }) {
  return (
    <Box className="w-3/12 h-full flex flex-col gap-3">
      {Object.entries(allTeams).map(([conference, teams]: [string, any]) => (
        <>
          <Box className="bg-white rounded-xl p-4 drop-shadow-md">
            <h1 className="font-semibold text-sm opacity-80 mb-1">
              {conference}
            </h1>
            <Divider flexItem />
            {teams.map((team: any) => (
              <TeamSideCard
                key={team + " sidecard"}
                name={team}
                league={league}
              />
            ))}
          </Box>
        </>
      ))}
    </Box>
  );
}

export default AllTeams;
