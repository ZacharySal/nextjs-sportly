"use client";

import { Divider, Box, Typography } from "@mui/material";
import Image from "next/image";
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

  return (
    <Box className="w-full max-w-[25rem] h-auto grid grid-cols-[1fr_4fr_1fr] grid-rows-[1fr_2fr_2fr_3fr] rounded-xl text-start text-black p-2 gap-1 gap-y-2 drop-shadow-md bg-white">
      <Typography className="text-xs row-start-1 col-start-1 col-span-3 md:text-sm font-semibold text-start">
        {gameDescription}
      </Typography>
      {/* Home Team Name and Logo*/}
      <Image
        src={`/${league}/${homeTeamName.replace(" ", "").toLowerCase()}.png`}
        width={100}
        height={100}
        alt="home team logo"
        className="w-10 my-auto object-contain"
      />
      <Typography className="text-sm  my-auto md:text-base">{homeTeamName}</Typography>
      <Typography className="text-center text-sm my-auto font-semibold md:text-base md:font-bold">
        {homeTeamScore || 0}
      </Typography>

      {/* Away Team Name and Logo*/}
      <Image
        src={`/${league}/${awayTeamName.replace(" ", "").toLowerCase()}.png`}
        width={100}
        height={100}
        alt="away team logo"
        className="w-10 my-auto object-contain"
      />
      <Typography className="text-sm md:text-base my-auto">{awayTeamName}</Typography>
      <Typography className="text-center text-sm font-semibold md:font-bold md:text-base my-auto">
        {awayTeamScore || 0}
      </Typography>

      {/* CTA Buttons */}
      <Box className="w-full flex flex-col justify-center gap-2 col-span-3 items-center">
        <Divider flexItem className="w-full " />
        <Box className="w-full flex flex-row justify-around">
          <Link href={`/${league}/game/${gameId}`}>
            <div className="text-center bg-[#1b48e0] border border-[#1b48e0] rounded p-2 px-3 text-sm text-white truncate cursor-pointer">
              Game Details
            </div>
          </Link>
          <div className="hidden md:block border border-[#1b48e0] rounded p-2 px-3 text-sm bg-white font-bold text-[#1b48e0] truncate cursor-pointer">
            Highlights
          </div>
        </Box>
      </Box>
    </Box>
  );
}
