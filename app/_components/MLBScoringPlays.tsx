import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import React from "react";

export default function MLBScoringPlays({ data }: { data: any }) {
  const allScoringPlays = data.gameData.plays.filter((play: any) => play.scoringPlay == true);

  const finalScoringPlays = allScoringPlays.filter((play: any) => play.type.text === "Play Result");

  if (finalScoringPlays.length === 0) return null;

  function getTeamName(id: string) {
    return id === data.homeTeam.id ? data.homeTeam.team.name : data.awayTeam.team.name;
  }

  return (
    <Box className="grid grid-cols-[25px_5px_20px_auto_15px_15px] grid-rows-[20px_auto] gap-x-3 gap-y-2 bg-white p-3 drop-shadow-md items-center rounded-xl">
      <Typography className="text-sm opacity-70 font-semibold row-1 col-span-6">Scoring Plays</Typography>
      {finalScoringPlays.map((play: any) => (
        <React.Fragment key={uuidv4()}>
          <Image
            src={`/mlb/${getTeamName(play.team.id).replace(" ", "").toLowerCase()}.png`}
            width={100}
            height={100}
            alt="home team logo"
            style={{ width: "25px" }}
            className="object-contain col-start-1"
          />
          <Typography
            style={{
              paddingBottom: play.period.type === "Top" ? "15px" : "5px",
            }}
            sx={{
              "&::before": {
                content: `" "`,
                borderColor:
                  play.period.type === "Top"
                    ? "transparent transparent gray"
                    : "gray transparent transparent transparent",
                borderStyle: "solid",
                borderWidth: "5px",
                position: "absolute",
              },
            }}
            className="col-start-2 opacity-70 text-xs"
          ></Typography>
          <Typography className="col-start-3 opacity-70 text-xs">{play.period.displayValue.slice(0, 3)}</Typography>
          <Typography className="col-start-4 opacity-70 text-xs">{play.text}</Typography>
          <Typography
            sx={{
              fontWeight: play.team.id === data.awayTeam.id ? "700" : "400",
            }}
            className="col-start-5 opacity-70 text-xs"
          >
            {play.awayScore}
          </Typography>
          <Typography
            sx={{
              fontWeight: play.team.id === data.homeTeam.id ? "700" : "400",
            }}
            className="col-start-6 opacity-70 text-xs"
          >
            {play.homeScore}
          </Typography>
        </React.Fragment>
      ))}
    </Box>
  );
}
