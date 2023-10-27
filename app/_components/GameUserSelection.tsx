import { Box, Typography } from "@mui/material";

export default function GameUserSelection({
  userSelection,
  setUserSelection,
  isDesktopScreen,
  data,
}: {
  userSelection: string;
  setUserSelection: React.Dispatch<React.SetStateAction<string>>;
  data: any;
  isDesktopScreen: boolean;
}) {
  const isSelected = (selection: string) => selection === userSelection;

  return (
    <Box className="drop-shadow-md w-full max-w-full overflow-x-auto h-10 flex justify-start items-center gap-3 bg-white py-5 pl-5">
      <Typography
        onClick={() => setUserSelection("gamecast")}
        className={`${
          userSelection === "gamecast" && "selection-active"
        } h-full flex items-center relative text-sm flex-shrink-0 cursor-pointer`}
      >
        Gamecast
      </Typography>
      {data.isGameStarted && (
        <>
          <Typography
            onClick={() => setUserSelection("playbyplay")}
            className={`${
              userSelection === "playbyplay" && "selection-active"
            } h-full flex items-center relative text-sm flex-shrink-0 cursor-pointer`}
          >
            Play-by-Play
          </Typography>
          <Typography
            onClick={() => setUserSelection("boxscore")}
            className={`${
              userSelection === "boxscore" && "selection-active"
            } h-full flex items-center relative text-sm flex-shrink-0 cursor-pointer`}
          >
            Box Score
          </Typography>
        </>
      )}

      {!isDesktopScreen && (
        <Typography
          onClick={() => setUserSelection("news")}
          className={`${
            userSelection === "news" && "selection-active"
          } h-full flex items-center relative text-sm flex-shrink-0 cursor-pointer`}
        >
          News
        </Typography>
      )}
    </Box>
  );
}
