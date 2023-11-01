"use client";

import { Box, Typography, useMediaQuery } from "@mui/material";
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
  if (typeof gameInfo.competitions === "undefined") {
    return null;
  }

  console.log(gameInfo);

  const isDesktopScreen = useMediaQuery("(min-width:1000px)");
  const game = gameInfo.competitions[0];
  const homeTeam = game.competitors[0];
  const awayTeam = game.competitors[1];

  let gameId: string;
  let gameDate: string = version === 2 ? game.date : gameInfo.date;
  let gameDescription: any = game.status.type.description;
  let homeTeamName: string = homeTeam.team.shortDisplayName;
  let homeTeamScore: any;
  let awayTeamName: string = awayTeam.team.shortDisplayName;

  const gameDetailsFinal = awayTeamName !== "TBD" || homeTeamName !== "TBD";

  let awayTeamScore: any;

  gameDate = new Date(gameInfo.date).toLocaleDateString();
  let gameTime = new Date(gameInfo.date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  const setTeamImageSrc = (teamName: string) => {
    try {
      const src = require(`public/${league}/${teamName
        .replace(" ", "")
        .toLowerCase()}.png`);
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

  if (gameDescription === "In Progress") {
    gameDescription = game.status.type.shortDetail;
  } else if (gameDescription === "Scheduled") {
    const date = new Date(game.date).toLocaleTimeString("en-US", {
      timeZone: "America/Chicago",
      hour: "numeric",
      minute: "2-digit",
    });
    const channel = game?.geoBroadcasts[0]?.media?.shortName || "";
    const odds = typeof game?.odds == "undefined" ? "" : game.odds[0].details;
    gameDescription = (
      <Box className="flex flex-col">
        <Typography className="text-xs opacity-90 font-semibold">
          {date}
        </Typography>
        <Typography className="text-xs opacity-70">{channel}</Typography>
        <Typography className="text-xs opacity-70">{odds}</Typography>
      </Box>
    );
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

  const mobileView = () => (
    <Link href={gameDetailsFinal ? `/${league}/game/${gameId}/home` : ""}>
      <Box className="w-full grid grid-cols-[1fr_25%] gap-3 py-2">
        {/* 1ST COLUMN: GAME INFO */}
        <Box className="w-full grid grid-cols-[1fr_auto] items-center grid-rows-[1fr_1fr] score-cell relative">
          {/* AWAY TEAM IMG AND NAME */}
          <Box className="flex items-center gap-2">
            <Image
              src={setTeamImageSrc(awayTeamName)}
              width={100}
              height={100}
              priority={true}
              alt="home team logo"
              className="w-7 object-contain"
            />
            <Typography
              sx={{
                opacity:
                  awayTeam === winner ||
                  game.status.type.description === "Scheduled"
                    ? "1"
                    : "0.6",
              }}
              className="text-sm font-semibold tracking-wide md:text-base"
            >
              {awayTeamName}
            </Typography>
          </Box>
          {/* AWAY TEAM SCORE */}
          <Typography
            sx={{
              opacity:
                awayTeam === winner ||
                game.status.type.description === "Scheduled"
                  ? "1"
                  : "0.6",
            }}
            className={`${
              awayTeam === winner ? "winning-score" : ""
            } text-sm text-end font-semibold md:text-base md:font-bold`}
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
              priority={true}
              alt="home team logo"
              className="w-7 object-contain"
            />
            <Typography
              sx={{
                opacity:
                  homeTeam === winner ||
                  game.status.type.description === "Scheduled"
                    ? "1"
                    : "0.6",
              }}
              className="text-sm md:text-base font-semibold tracking-wide"
            >
              {homeTeamName}
            </Typography>
          </Box>
          {/* HOME TEAM SCORE */}
          <Typography
            sx={{
              opacity:
                homeTeam === winner ||
                game.status.type.description === "Scheduled"
                  ? "1"
                  : "0.6",
            }}
            className={`${
              homeTeam === winner ? "winning-score" : ""
            } text-sm text-end font-semibold md:text-base md:font-bold`}
          >
            {game.status.type.description === "Scheduled"
              ? gameDetailsFinal && typeof homeTeam.records !== "undefined"
                ? homeTeam.records[0].summary
                : ""
              : homeTeamScore}
          </Typography>
        </Box>
        {typeof gameDescription === "string" ? (
          <Typography
            sx={{ color: gameDescription === "Final" ? "black" : "#d50a0a" }}
            className="flex w-full justify-start items-center text-xs opacity-80 font-semibold"
          >
            {gameDescription}
          </Typography>
        ) : (
          <Box className="flex w-full justify-start items-center text-xs opacity-80 font-semibold">
            {gameDescription}
          </Box>
        )}
      </Box>
      {typeof game.notes[0]?.headline !== "undefined" && (
        <Typography className="text-xs p-1 opacity-60 mt-[-0.35rem]">
          {game.notes[0].headline}
        </Typography>
      )}
    </Link>
  );

  const desktopView = () => (
    <Box className="grid grid-cols-3 p-2">
      {/* game date, network */}
      <Box className="min-w-full flex flex-col gap-1 col-start-1">
        <Typography className="text-[12px]">
          <span className="opacity-70 font-[600]">{gameTime}</span>
        </Typography>
        {/* away team*/}
        <Box className="flex flex-row gap-2 items-center">
          <Image
            src={setTeamImageSrc(awayTeamName)}
            width={100}
            height={100}
            priority={true}
            alt="home team logo"
            className="w-9 object-contain"
          />
          <Box className="flex flex-col">
            <Typography className="text-sm font-semibold opacity-80">
              {awayTeamName}
            </Typography>
            <Typography className="text-sm opacity-60">{`(${homeTeam.records[0].summary})`}</Typography>
          </Box>
        </Box>
        <Box className="flex flex-row gap-2 items-center">
          <Image
            src={setTeamImageSrc(homeTeamName)}
            width={100}
            height={100}
            priority={true}
            alt="home team logo"
            className="w-9 object-contain"
          />
          <Box className="flex flex-col">
            <Typography className="text-sm font-semibold opacity-80">
              {homeTeamName}
            </Typography>
            <Typography className="text-sm opacity-60">{`(${awayTeam.records[0].summary})`}</Typography>
          </Box>
        </Box>
      </Box>

      <Box className="min-w-full flex flex-col col-start-2">
        <Box>
          <Typography className="text-[11px] opacity-70 font-[600]">{`${game.venue.fullName}`}</Typography>
          <Typography className="text-[11px] opacity-60]">{`${game.venue.address.city}, ${game.venue.address.state}`}</Typography>
        </Box>
        <Box></Box>
      </Box>

      <Box className="min-w-full flex flex-col gap-2 col-start-3">
        <Typography className="text-[11px] opacity-60">
          PLAYERS TO WATCH
        </Typography>
        {/* away team point leader */}
        <Box className="flex flex-row items-center gap-2">
          <Image
            src={game.competitors[1].leaders[0].leaders[0].athlete.headshot}
            width={100}
            height={100}
            priority={true}
            alt="away team points leader"
            className="w-[35px] h-[35px] border rounded-full object-cover"
          />
          <Box className="flex flex-col">
            <Typography className="text-xs">{`${game.competitors[1].leaders[0].leaders[0].athlete.displayName} ${game.competitors[1].leaders[0].leaders[0].athlete.position.abbreviation} - ${game.competitors[0].team.abbreviation}`}</Typography>
            <Typography className="text-xs">{`${Math.floor(
              game.competitors[1].leaders[0].leaders[0].value
            )} PPG`}</Typography>
          </Box>
        </Box>
        <Box className="flex flex-row items-center gap-2">
          <Image
            src={game.competitors[0].leaders[0].leaders[0].athlete.headshot}
            width={100}
            height={100}
            priority={true}
            alt="away team points leader"
            className="w-[35px] h-[35px] border rounded-full object-cover"
          />
          <Box className="flex flex-col">
            <Typography className="text-xs">{`${game.competitors[0].leaders[0].leaders[0].athlete.displayName} ${game.competitors[0].leaders[0].leaders[0].athlete.position.abbreviation} - ${game.competitors[0].team.abbreviation}`}</Typography>
            <Typography className="text-xs">{`${Math.floor(
              game.competitors[0].leaders[0].leaders[0].value
            )} PPG`}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  const winner = getWinner();

  return <>{isDesktopScreen ? mobileView() : mobileView()}</>;
}
