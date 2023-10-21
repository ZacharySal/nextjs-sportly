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
    <Box className="block drop-shadow-md w-full h-10 flex justify-start items-center gap-3 bg-white pl-5">
      <Typography
        onClick={() => setUserSelection("recap")}
        className={`${userSelection === "recap" && "selection-active"} h-full flex items-center relative text-sm`}
      >
        Recap
      </Typography>
      {data.isGameStarted && (
        <>
          <Typography
            onClick={() => setUserSelection("playbyplay")}
            className={`${
              userSelection === "playbyplay" && "selection-active"
            } h-full flex items-center relative text-sm`}
          >
            Play-by-Play
          </Typography>
          <Typography
            onClick={() => setUserSelection("boxscore")}
            className={`${
              userSelection === "boxscore" && "selection-active"
            } h-full flex items-center relative text-sm`}
          >
            Box Score
          </Typography>
        </>
      )}

      <Typography
        onClick={() => setUserSelection("news")}
        className={`${userSelection === "news" && "selection-active"} h-full flex items-center relative text-sm`}
      >
        News
      </Typography>
    </Box>
  );
}
