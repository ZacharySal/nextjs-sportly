"use client";

import { Divider, Box, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

  const router = useRouter();

  return (
    <Box className="w-full flex justfy-between flex-col gap-4 p-3 rounded-xl text-black drop-shadow-md bg-white">
      <Typography className="text-sm font-bold">{gameDescription}</Typography>
      {/* Team Names and Score */}
      <Box className="w-full flex flex-row justify-between gap-5">
        <Box className="w-full ">
          <Box className="w-full flex justify-between items-center mb-2">
            {/* Home Team Name and Logo*/}
            <Link href={`/${league}/team/${homeTeamId}`}>
              <Box
                sx={{ cursor: "pointer" }}
                className="flex items-center gap-2"
              >
                <img
                  src={`/${league}/${homeTeamName.replace(" ", "")}.png`}
                  className="w-10 h-10 object-cover"
                ></img>
                <Typography className="font-semibold">
                  {homeTeamName}
                </Typography>
              </Box>
            </Link>
            {/* Home Team Score*/}
            <Typography className="font-bold">{homeTeamScore}</Typography>
          </Box>

          <Box className="w-full flex justify-between items-center">
            {/* Away Team Name and Logo*/}
            <Link href={`/${league}/team/${awayTeamId}`}>
              <Box
                sx={{ cursor: "pointer" }}
                className="flex items-center gap-2"
              >
                <img
                  src={`/${league}/${awayTeamName.replace(" ", "")}.png`}
                  className="w-10 h-10 object-cover"
                ></img>
                <Typography className="font-semibold">
                  {awayTeamName}
                </Typography>
              </Box>
            </Link>
            {/* Away Team Score*/}
            <Typography className="font-bold">{awayTeamScore}</Typography>
          </Box>
        </Box>
        <Link href={`/${league}/game/${gameId}`}>
          <ArrowForwardIosIcon className="mt-9 text-sm cursor-pointer" />
        </Link>
      </Box>
      <Divider />
      {/* CTA Buttons */}
      <Box className="w-full flex justify-evenly items-center">
        <div className="bg-[#1b48e0] border border-[#1b48e0] rounded p-2 px-3 text-sm text-white truncate cursor-pointer">
          Game Details
        </div>
        <div className="border border-[#1b48e0] rounded p-2 px-3 text-sm bg-white font-bold text-[#1b48e0] truncate cursor-pointer">
          Highlights
        </div>
      </Box>
    </Box>
  );
}
