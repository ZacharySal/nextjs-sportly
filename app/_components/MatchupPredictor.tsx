import React from "react";
import { Box, Typography } from "@mui/material";

export default function MatchupPredictor({ data, league }: { data: any; league: string }) {
  const homeTeamChance = (Number(data.gameData.predictor.homeTeam.gameProjection) * 360) / 100;

  const [losingTeamColor, winningTeamColor] =
    homeTeamChance > 180
      ? [data.awayTeam.team.color, data.homeTeam.team.color]
      : [data.homeTeam.team.color, data.awayTeam.team.color];

  return (
    <Box className="w-full bg-white rounded-xl drop-shadow-md p-3">
      <Typography className="font-semibold opacity-70 text-sm">Matchup Predictor</Typography>
      <Box
        className="matchup-predictor w-full bg-white rounded-xl p-2 flex justify-center items-center"
        data-awayteamchance={data.gameData.predictor.awayTeam.gameProjection + "%"}
        data-hometeamchance={data.gameData.predictor.homeTeam.gameProjection + "%"}
      >
        <div
          style={{
            backgroundColor: `#${losingTeamColor}`,
            backgroundImage: `linear-gradient(${
              360 - homeTeamChance
            }deg, transparent 50%, #${winningTeamColor} 50%), linear-gradient(0deg, #${winningTeamColor} 50%, transparent 50%)`,
          }}
          className="circle-border"
        >
          <div className="circle">
            <img
              className="matchup-image-home w-10 object-contain"
              src={`/${league}/${data.homeTeam.team.name.toLowerCase()}.png`}
            ></img>
            <img
              className="matchup-image-away w-10 object-contain"
              src={`/${league}/${data.awayTeam.team.name.toLowerCase()}.png`}
            ></img>
          </div>
        </div>
      </Box>
    </Box>
  );
}
