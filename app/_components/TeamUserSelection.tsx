import { Box, Typography } from "@mui/material";

export default function TeamUserSelection({
  userSelection,
  setUserSelection,
}: {
  userSelection: string;
  setUserSelection: React.Dispatch<React.SetStateAction<string>>;
}) {
  const isSelected = (selection: string) => selection === userSelection;

  return (
    <Box className="block md:hidden w-full h-10 flex justify-start items-center gap-3 bg-white pl-5">
      <Typography
        onClick={() => setUserSelection("games")}
        sx={{ fontWeight: isSelected("games") ? "700" : "400" }}
        className="opacity-70 text-sm"
      >
        Games
      </Typography>
      <Typography
        onClick={() => setUserSelection("stats")}
        sx={{ fontWeight: isSelected("stats") ? "700" : "400" }}
        className="opacity-70 text-sm"
      >
        Stats
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
