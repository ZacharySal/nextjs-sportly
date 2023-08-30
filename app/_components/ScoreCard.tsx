"use client";

import { Divider, Box, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useRouter } from "next/navigation";
import { GameInfoType } from "../../types";

export default function ScoreCard({
  gameInfo,
  version,
  league,
  teamView,
}: {
  gameInfo: any;
  version: number;
  league: string;
  teamView: boolean;
}) {
  const game = gameInfo.competitions[0];
  const homeTeam = game.competitors[0];
  const awayTeam = game.competitors[1];

  let gameId: string;
  let gameDate: string = version === 2 ? game.date : gameInfo.date;
  let gameDescription: string = game.status.type.description;
  let homeTeamId: string = homeTeam.id;
  let homeTeamName: string = homeTeam.team.shortDisplayName;
  let homeTeamScore;
  let awayTeamId: string = awayTeam.id;
  let awayTeamName: string = awayTeam.team.shortDisplayName;

  let awayTeamScore;

  gameDate = new Date(gameInfo.date).toLocaleDateString();

  if (!teamView) {
    let index = gameInfo?.uid?.indexOf("e");
    gameId = gameInfo?.uid?.substring(index + 2);
  } else {
    gameId = gameInfo.id;
  }

  if (version == 2) {
    if (gameDescription !== "Final") {
      homeTeamScore = "";
      awayTeamScore = "";
    } else {
      homeTeamScore = homeTeam.score.value;
      awayTeamScore = awayTeam.score.value;
    }
  }

  if (version == 1) {
    if (gameDescription === "Scheduled") {
      homeTeamScore = "";
      awayTeamScore = "";
    } else {
      homeTeamScore = homeTeam.score;
      awayTeamScore = awayTeam.score;
    }
  }

  if (gameDescription === "In Progress" || gameDescription === "Scheduled") {
    gameDescription = game.status.type.shortDetail;
  } else if (gameDescription === "Final") {
    gameDescription = `Final • ${gameDate}`;
  } else {
    gameDescription = gameDescription;
  }

  // gameDate = new Date(gameInfo.date).toLocaleString([], {
  //   year: "numeric",
  //   month: "numeric",
  //   day: "numeric",
  //   hour: "numeric",
  //   minute: "2-digit",
  // });
  const router = useRouter();

  return (
    <Box className="w-full flex justfy-between flex-col gap-4 p-3 rounded-xl text-black drop-shadow-md bg-white">
      <Typography className="text-sm font-bold">{gameDescription}</Typography>
      {/* Team Names and Score */}
      <Box className="w-full flex flex-row justify-between gap-5">
        <Box className="w-full ">
          <Box className="w-full flex justify-between items-center mb-2">
            {/* Home Team Name and Logo*/}
            <Box
              sx={{ cursor: "pointer" }}
              onClick={() => router.push(`/${league}/team/${homeTeamId}`)}
              className="flex items-center gap-2"
            >
              <img
                src={`/${league}/${homeTeamName.replace(" ", "")}.png`}
                className="w-10 h-10 object-cover"
              ></img>
              <Typography className="font-semibold">{homeTeamName}</Typography>
            </Box>
            {/* Home Team Score*/}
            <Typography className="font-bold">{homeTeamScore}</Typography>
          </Box>

          <Box className="w-full flex justify-between items-center">
            {/* Away Team Name and Logo*/}
            <Box
              sx={{ cursor: "pointer" }}
              className="flex items-center gap-2"
              onClick={() => router.push(`/${league}/team/${awayTeamId}`)}
            >
              <img
                src={`/${league}/${awayTeamName.replace(" ", "")}.png`}
                className="w-10 h-10 object-cover"
              ></img>
              <Typography className="font-semibold">{awayTeamName}</Typography>
            </Box>
            {/* Away Team Score*/}
            <Typography className="font-bold">{awayTeamScore}</Typography>
          </Box>
        </Box>
        <ArrowForwardIosIcon
          onClick={() => router.push(`/${league}/game/${gameId}`)}
          className="m-auto text-sm cursor-pointer"
        />
      </Box>
      <Divider />
      {/* CTA Buttons */}
      <Box className="w-full flex justify-evenly items-center">
        <div className="border border-[#1b48e0]  rounded p-2 px-3 text-sm bg-white text-[#1b48e0] truncate">
          Full Replay
        </div>
        <div className="border border-[#1b48e0] rounded p-2 px-3 text-sm bg-white text-[#1b48e0] truncate">
          Game Details
        </div>
        <div className="border border-[#1b48e0] rounded p-2 px-3 text-sm bg-white font-bold text-[#1b48e0] truncate">
          Highlights
        </div>
      </Box>
    </Box>
  );
}
