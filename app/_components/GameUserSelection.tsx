import { Box, Typography } from "@mui/material";

export default function GameUserSelection({
  userSelection,
  setUserSelection,
  data,
}: {
  userSelection: string;
  setUserSelection: React.Dispatch<React.SetStateAction<string>>;
  data: any;
}) {
  const isSelected = (selection: string) => selection === userSelection;

  return (
    <Box className="block w-full h-10 flex justify-start items-center gap-3 bg-white pl-5">
      <Typography
        onClick={() => setUserSelection("recap")}
        sx={{ fontWeight: isSelected("recap") ? "700" : "400" }}
        className="opacity-70 text-sm"
      >
        Recap
      </Typography>
      {data.isGameStarted && (
        <>
          <Typography
            onClick={() => setUserSelection("playbyplay")}
            sx={{ fontWeight: isSelected("playbyplay") ? "700" : "400" }}
            className="opacity-70 text-sm"
          >
            Play-by-Play
          </Typography>
          <Typography
            onClick={() => setUserSelection("boxscore")}
            sx={{ fontWeight: isSelected("boxscore") ? "700" : "400" }}
            className="opacity-70 text-sm"
          >
            Box Score
          </Typography>
        </>
      )}

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
