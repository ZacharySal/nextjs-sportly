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
    <Box className="block md:hidden w-full h-10 flex justify-start items-center gap-3 bg-white pl-5 drop-shadow-md">
      <Typography
        onClick={() => setUserSelection("scoreboard")}
        sx={{ fontWeight: isSelected("scoreboard") ? "700" : "400" }}
        className="opacity-70 text-sm"
      >
        Scoreboard
      </Typography>
      <Typography
        onClick={() => setUserSelection("teams")}
        sx={{ fontWeight: isSelected("teams") ? "700" : "400" }}
        className="opacity-70 text-sm"
      >
        Teams
      </Typography>
      <Typography
        onClick={() => setUserSelection("news")}
        sx={{ fontWeight: isSelected("news") ? "700" : "400" }}
        className="opacity-70 text-sm"
      >
        News
      </Typography>
    </Box>
  );
}
