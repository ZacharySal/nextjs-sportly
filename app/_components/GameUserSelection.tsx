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
      {data.isGameStarted && (
        <>
          <Typography
            onClick={() => setUserSelection("scoreInfo")}
            sx={{ fontWeight: isSelected("scoreInfo") ? "700" : "400" }}
            className="opacity-70 text-sm"
          >
            Score Info
          </Typography>
        </>
      )}
      <Typography
        onClick={() => setUserSelection("gameInfo")}
        sx={{ fontWeight: isSelected("gameInfo") ? "700" : "400" }}
        className="opacity-70 text-sm"
      >
        Game Info
      </Typography>
      <Typography
        onClick={() => setUserSelection("stats")}
        sx={{ fontWeight: isSelected("stats") ? "700" : "400" }}
        className="opacity-70 text-sm"
      >
        Team Stats
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
