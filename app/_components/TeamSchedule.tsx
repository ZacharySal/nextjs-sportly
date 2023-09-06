import { Box } from "@mui/material";
import ScoreCard from "./ScoreCard";
import { v4 as uuidv4 } from "uuid";

export default function TeamSchedule({
  teamSchedule,
  league,
}: {
  teamSchedule: any;
  league: string;
}) {
  return (
    <Box className="w-full h-full place-items-center grid grid-cols-2 gap-2 md:gap-5">
      {teamSchedule.events.map((game: any) => (
        <ScoreCard
          key={uuidv4()}
          gameInfo={game}
          version={2}
          league={league}
          teamView={true}
        />
      ))}
    </Box>
  );
}
