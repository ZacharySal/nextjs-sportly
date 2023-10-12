import React from "react";
import { Box, Typography } from "@mui/material";

export default function MatchupPredictor({ data, league }: { data: any; league: string }) {
  const awayTeamChance = (Number(data.gameData.predictor.awayTeam.teamChanceLoss) * 360) / 100;
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
            backgroundColor: `#${data.awayTeam.team.color}`,
            backgroundImage: `linear-gradient(${360 - awayTeamChance}deg, transparent 50%, #${
              data.homeTeam.team.color
            } 50%), linear-gradient(0deg, #${data.homeTeam.team.color} 50%, transparent 50%)`,
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
