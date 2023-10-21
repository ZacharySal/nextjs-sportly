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
    <Box className="block drop-shadow-md md:hidden w-full h-10 flex justify-start items-center gap-3 bg-white pl-5">
      <Typography
        onClick={() => setUserSelection("schedule")}
        className={`${userSelection === "schedule" && "selection-active"} h-full flex items-center relative text-sm`}
      >
        Schedule
      </Typography>
      <Typography
        onClick={() => setUserSelection("stats")}
        className={`${userSelection === "stats" && "selection-active"} h-full flex items-center relative text-sm`}
      >
        Stats
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
