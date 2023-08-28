import { Box, Typography, Divider } from "@mui/material";
import ArticleCard from "@/app/_components/ArticleCard";
import ScoreCard from "@/app/_components/ScoreCard";

async function getGameData(gameId: string) {
  const response = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/football/nfl/summary?event=${gameId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch game data");
  }

  return response.json();
}

async function getScoreData(gameId: string) {
  const response = await fetch(
    `https://cdn.espn.com/core/nfl/game?xhr=1&gameId=${gameId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch game data");
  }

  return response.json();
}

export default async function TeamPage({
  params,
}: {
  params: { gameId: string };
}) {
  const gameData = await getGameData(params.gameId);
  const scoreData = await getScoreData(params.gameId);

  const awayTeam = scoreData.__gamepackage__.awayTeam;
  const homeTeam = scoreData.__gamepackage__.homeTeam;

  const winningTeam = homeTeam.winner ? homeTeam : awayTeam;

  return (
    <>
      {/* HEADER */}
      <Box
        sx={{ backgroundColor: `#${winningTeam.team.color}` }}
        className="w-full h-40 flex-row flex justify-center items-center gap-10 drop-shadow-md"
      >
        <Box className="flex flex-row justify-center items-center gap-3">
          <img
            className="w-32 object-cover"
            src={`/nfl/${homeTeam.team.name}.png`}
          />
          <Box className="flex flex-col text-white opacity-80">
            <Typography className="text-3xl opacity-70">
              {homeTeam.team.location}
            </Typography>
            <Typography className="text-3xl font-bold">
              {homeTeam.team.name}
            </Typography>
          </Box>
        </Box>
        <Box className="flex flex-row justify-center items-center gap-3">
          <Typography
            sx={{ fontWeight: homeTeam.winner ? "bold" : "normal" }}
            className="text-white text-7xl opacity-80"
          >
            {homeTeam.score}
          </Typography>
          <Typography className="text-white text-7xl opacity-80 pb-3">
            -
          </Typography>
          <Typography
            sx={{ fontWeight: awayTeam.winner ? "bold" : "normal" }}
            className="text-white text-7xl opacity-80"
          >
            {awayTeam.score}
          </Typography>
        </Box>

        <Box className="flex flex-row justify-center items-center gap-3">
          <Box className="flex flex-col text-white opacity-80">
            <Typography className="text-3xl opacity-70">
              {awayTeam.team.location}
            </Typography>
            <Typography className="text-3xl font-bold">
              {awayTeam.team.name}
            </Typography>
          </Box>
          <img
            className="w-32 object-cover"
            src={`/nfl/${awayTeam.team.name}.png`}
          />
        </Box>
      </Box>

      {/* CONTAINER BOXES */}
      <Box className="w-full h-full flex justify-center relative items-center">
        <Box
          sx={{
            "&::before": {
              content: `""`,
              borderLeft: `60px solid #${winningTeam.team.alternateColor}`,
              borderRight: `60px solid #${winningTeam.team.color}`,
              width: "13rem",
              height: "100vh",
              position: "fixed",
              zIndex: "-20",
              bottom: "-20rem",
              left: "10rem",
              rotate: "130deg",
            },
          }}
          className="w-3/4 h-full flex flex-row justify-center items-start gap-8 my-8"
        ></Box>
      </Box>
    </>
  );
}
