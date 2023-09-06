import { Box, Divider } from "@mui/material";
import TeamSideCard from "./TeamSideCard";
import { v4 as uuidv4 } from "uuid";
import React from "react";

function AllTeams({ allTeams, league }: { allTeams: any; league: string }) {
  return (
    <Box className=" w-full md:w-1/3 h-full flex flex-col gap-3">
      {Object.entries(allTeams).map(([conference, teams]: [string, any]) => (
        <React.Fragment key={uuidv4()}>
          <Box className="bg-white rounded-xl p-3 drop-shadow-md">
            <h1 className="font-semibold text-sm opacity-80 mb-1">
              {conference}
            </h1>
            <Divider flexItem />
            {teams.map((team: any) => (
              <TeamSideCard key={uuidv4()} name={team} league={league} />
            ))}
          </Box>
        </React.Fragment>
      ))}
    </Box>
  );
}

export default AllTeams;
