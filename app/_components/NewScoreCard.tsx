"use client";

import { Box, Typography } from "@mui/material";
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
  let homeTeamName: string = homeTeam.team.shortDisplayName;
  let homeTeamScore: any;
  let awayTeamName: string = awayTeam.team.shortDisplayName;

  const gameDetailsFinal = awayTeamName !== "TBD" || homeTeamName !== "TBD";

  let awayTeamScore: any;

  gameDate = new Date(gameInfo.date).toLocaleDateString();

  console.log(JSON.stringify(awayTeam.name));

  console.log(JSON.stringify(homeTeam.name));

  const setTeamImageSrc = (teamName: string) => {
    try {
      const src = require(`public/${league}/${teamName.replace(" ", "").toLowerCase()}.png`);
      return src;
    } catch {
      return `/default.png`;
    }
  };

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
      homeTeamScore = Number(homeTeam.score);
      awayTeamScore = Number(awayTeam.score);
    }
  }

  if (gameDescription === "In Progress" || gameDescription === "Scheduled") {
    gameDescription = game.status.type.shortDetail;
  } else {
    gameDescription = gameDescription;
  }

  const getWinner = () => {
    if (typeof homeTeamScore === "number") {
      return homeTeamScore > awayTeamScore ? homeTeam : awayTeam;
    } else {
      return null;
    }
  };

  const winner = getWinner();

  return (
    <Link href={gameDetailsFinal ? `/${league}/game/${gameId}` : ""}>
      <Box className="w-full grid grid-cols-[1fr_25%] gap-3">
        {/* 1ST COLUMN: GAME INFO */}
        <Box className="w-full grid grid-cols-[1fr_auto] items-center grid-rows-[1fr_1fr] score-cell relative py-1 md:py-2">
          {/* AWAY TEAM IMG AND NAME */}
          <Box className="flex items-center gap-2">
            <Image
              src={setTeamImageSrc(awayTeamName)}
              width={100}
              height={100}
              alt="home team logo"
              className="w-7 object-contain"
            />
            <Typography
              sx={{ opacity: awayTeam === winner ? "1" : "0.6" }}
              className="font-semibold tracking-wide md:text-base"
            >
              {awayTeamName}
            </Typography>
          </Box>
          {/* AWAY TEAM SCORE */}
          <Typography
            sx={{ opacity: awayTeam === winner ? "1" : "0.6" }}
            className={`${awayTeam === winner ? "winning-score" : ""} text-end font-semibold md:text-base md:font-bold`}
          >
            {game.status.type.description === "Scheduled"
              ? gameDetailsFinal && typeof awayTeam.records !== "undefined"
                ? awayTeam?.records[0].summary
                : ""
              : awayTeamScore}
          </Typography>

          {/* HOME TEAM IMG AND NAME */}
          <Box className="flex items-center gap-2">
            <Image
              src={setTeamImageSrc(homeTeamName)}
              width={100}
              height={100}
              alt="home team logo"
              className="w-7 object-contain"
            />
            <Typography sx={{ opacity: homeTeam === winner ? "1" : "0.6" }} className="font-semibold tracking-wide">
              {homeTeamName}
            </Typography>
          </Box>
          {/* HOME TEAM SCORE */}
          <Typography
            sx={{ opacity: homeTeam === winner ? "1" : "0.6" }}
            className={`${homeTeam === winner ? "winning-score" : ""} text-end font-semibold md:text-base md:font-bold`}
          >
            {game.status.type.description === "Scheduled"
              ? gameDetailsFinal && typeof homeTeam.records !== "undefined"
                ? homeTeam.records[0].summary
                : ""
              : homeTeamScore}
          </Typography>
        </Box>
        <Typography className="flex w-full justify-start pl-2 items-center text-xs opacity-70 font-semibold">
          {gameDescription}
        </Typography>
      </Box>
    </Link>
  );
}
