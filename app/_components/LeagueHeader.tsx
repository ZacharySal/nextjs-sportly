import { Box, Typography } from "@mui/material";

export default function LeagueHeader({
  backgroundColor,
  league,
}: {
  backgroundColor: string;
  league: string;
}) {
  let fullLeague;

  if (league === "nfl") fullLeague = "National Football League";
  if (league === "mlb") fullLeague = "Major League Baseball";
  if (league === "nba") fullLeague = "National Basketball Association";
  return (
    <Box
      sx={{ backgroundColor: `#${backgroundColor}` }}
      className="w-full h-40 flex-row flex justify-start items-center gap-6 pl-30 md:pl-60 drop-shadow-md"
    >
      <Box className="flex flex-row justify-center items-center gap-3">
        <img
          className=" w-20 md:w-32 object-cover"
          src={`/${league}/${league}-logo.png`}
        />
        <Box className="flex flex-col text-white opacity-80">
          <Typography className=" text-xl md:text-3xl opacity-70">
            {fullLeague}
          </Typography>
          <Typography className=" text-xl md:text-3xl font-bold">
            {league.toUpperCase()}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
