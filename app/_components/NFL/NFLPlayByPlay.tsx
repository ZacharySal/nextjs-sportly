import { useState } from "react";
import NFLGameDrives from "./NFLGameDrives";
import NFLScoringPlays from "./NFLScoringPlays";
import { Box } from "@mui/material";

export default function NFLPlayByPlay({ data }: { data: any }) {
  const [userSelection, setUserSelection] = useState("scoringPlays");

  return (
    <Box className="bg-white rounded-xl w-full px-2">
      <Box className="flex w-full justify-around gap-3 mt-5 mb-2 rounded-2xl p-2 bg-[#edeef09c] text-center">
        <Box
          onClick={() => setUserSelection("scoringPlays")}
          className={`${
            userSelection === "scoringPlays" && "button-active"
          } flex-grow h-full text-xs cursor-pointer font-semibold`}
        >
          Scoring Plays
        </Box>
        <Box
          onClick={() => setUserSelection("allPlays")}
          className={`${
            userSelection === "allPlays" && "button-active"
          } flex-grow h-full text-xs cursor-pointer font-semibold`}
        >
          All Plays
        </Box>
      </Box>
      {userSelection === "scoringPlays" && <NFLScoringPlays data={data} />}
      {userSelection === "allPlays" && <NFLGameDrives data={data} />}
    </Box>
  );
}
