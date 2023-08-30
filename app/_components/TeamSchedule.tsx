import { Box } from "@mui/material";
import ScoreCard from "./ScoreCard";

export default function TeamSchedule({
  teamSchedule,
  league,
}: {
  teamSchedule: any;
  league: string;
}) {
  return (
    <Box className="w-full h-auto grid grid-cols-2 gap-5">
      {teamSchedule.events.map((game: any) => (
        <ScoreCard
          key={game.id}
          gameInfo={game}
          version={2}
          league={league}
          teamView={true}
        />
      ))}
    </Box>
  );
}
