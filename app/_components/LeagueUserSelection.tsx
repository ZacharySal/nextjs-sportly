import { Box, Typography } from "@mui/material";

export default function LeagueUserSelection({
  userSelection,
  setUserSelection,
}: {
  userSelection: string;
  setUserSelection: React.Dispatch<React.SetStateAction<string>>;
}) {
  const isSelected = (selection: string) => selection === userSelection;

  return (
    <Box className="block drop-shadow-md md:hidden w-full h-10 flex justify-start items-center gap-3 bg-white pl-5 drop-shadow-md">
      <Typography
        onClick={() => setUserSelection("scoreboard")}
        className={`${userSelection === "scoreboard" && "selection-active"} h-full flex items-center relative text-sm`}
      >
        Scoreboard
      </Typography>
      <Typography
        onClick={() => setUserSelection("teams")}
        className={`${userSelection === "teams" && "selection-active"} h-full flex items-center relative text-sm`}
      >
        Teams
      </Typography>
      <Typography
        onClick={() => setUserSelection("standings")}
        className={`${userSelection === "standings" && "selection-active"} h-full flex items-center relative text-sm`}
      >
        Standings
      </Typography>
      <Typography
        onClick={() => setUserSelection("news")}
        className={`${userSelection === "news" && "selection-active"} h-full flex items-center relative text-sm`}
      >
        News
      </Typography>
    </Box>
  );
}
