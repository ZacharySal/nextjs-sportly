"use client";

import { Box, Typography, useMediaQuery } from "@mui/material";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faT, faTicket } from "@fortawesome/free-solid-svg-icons";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
export default function ScoreCard({ gameInfo, league }: { gameInfo: any; league: string }) {
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  const game = gameInfo.competitions[0];

  const i = Math.floor(Math.random() * 3);

  const homeTeamName: string = game.competitors[0].team.shortDisplayName;
  const awayTeamName: string = game.competitors[1].team.shortDisplayName;
  const homeTeamScore = Number(game.competitors[0].score);
  const awayTeamScore = Number(game.competitors[1].score);
  const gameId = gameInfo?.uid?.substring(gameInfo?.uid?.indexOf("e") + 2);
  const gameTime = new Date(game.date).toLocaleTimeString("en-US", {
    timeZone: "America/Chicago",
    hour: "numeric",
    minute: "2-digit",
  });

  const isGameDetailsFinalized = awayTeamName !== "TBD" || homeTeamName !== "TBD";
  const isGameScheduled = game.status.type.state === "pre";
  const isGameInProgess = game.status.type.state === "in";
  const isGameFinished = game.status.type.state === "post";
  const isGameNoteAvailable = typeof game.notes[0]?.headline !== "undefined";
  const homeTeamWon = homeTeamScore > awayTeamScore || isGameScheduled;
  const awayTeamWon = awayTeamScore > homeTeamScore || isGameScheduled;

  const channel = game?.geoBroadcasts[0]?.media?.shortName || "";
  const odds = typeof game?.odds == "undefined" ? "" : game.odds[0].details;

  const { data, isLoading } = useSWR(
    `https://cdn.espn.com/core/${league}/game?xhr=1&gameId=${gameId}`,
    fetcher,
    { refreshInterval: 30000 }
  );

  /* FEATURED ATHLETES FOR MLB TOP PERFORMERS */

  const getScoreOrRecord = (teamIndex: number) => {
    return isGameScheduled
      ? isGameDetailsFinalized && typeof game.competitors[teamIndex].records !== "undefined"
        ? game.competitors[teamIndex].records[0].summary
        : ""
      : teamIndex === 1
      ? awayTeamScore
      : homeTeamScore;
  };

  const getTopPerformersByLeague = () => {
    if (league === "NBA") {
      return (
        <Box className="flex flex-col justify-start gap-3">
          <Box className="flex flex-row items-center gap-2">
            <Image
              src={
                data.gamepackageJSON?.leaders[1]?.leaders[0]?.leaders[0]?.athlete?.headshot?.href
              }
              width={100}
              height={100}
              priority={true}
              alt="away team points leader"
              className="w-[35px] h-[35px] border rounded-full object-cover"
            />
            <Box className="flex flex-col">
              <Typography className="text-xs">
                {`${data?.gamepackageJSON?.leaders[1]?.leaders[0]?.leaders[0]?.athlete?.displayName} `}
                <span className="opacity-60">{`${data?.gamepackageJSON?.leaders[1]?.leaders[0]?.leaders[0]?.athlete?.position?.abbreviation} - ${game?.competitors[1]?.team?.abbreviation}`}</span>
              </Typography>
              <Box className="flex flex-row gap-2">
                <Typography className="text-xs">
                  {`${data?.gamepackageJSON?.leaders[1]?.leaders[0]?.leaders[0]?.statistics[0]?.displayValue}`}
                  <span className="text-[10px] opacity-60">{` ${data?.gamepackageJSON?.leaders[1]?.leaders[0]?.leaders[0]?.statistics[0]?.shortDisplayName}`}</span>
                </Typography>
                <Typography className="text-xs">
                  {`${data?.gamepackageJSON?.leaders[1]?.leaders[0]?.leaders[0]?.statistics[1]?.displayValue}`}
                  <span className="text-[10px] opacity-60">{` ${data?.gamepackageJSON?.leaders[1]?.leaders[0]?.leaders[0]?.statistics[1]?.shortDisplayName}`}</span>
                </Typography>
                <Typography className="text-xs">
                  {`${data?.gamepackageJSON?.leaders[1]?.leaders[0]?.leaders[0]?.statistics[2]?.displayValue}`}
                  <span className="text-[10px] opacity-60">{` ${data?.gamepackageJSON?.leaders[1]?.leaders[0]?.leaders[0]?.statistics[2]?.shortDisplayName}`}</span>
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box className="flex flex-row items-center gap-2">
            <Image
              src={
                data?.gamepackageJSON?.leaders[0]?.leaders[0]?.leaders[0]?.athlete?.headshot?.href
              }
              width={100}
              height={100}
              priority={true}
              alt="away team points leader"
              className="w-[35px] h-[35px] border rounded-full object-cover"
            />
            <Box className="flex flex-col">
              <Typography className="text-xs">
                {`${data?.gamepackageJSON?.leaders[0]?.leaders[0]?.leaders[0]?.athlete?.displayName} `}
                <span className="opacity-60">{`${data?.gamepackageJSON?.leaders[0]?.leaders[0]?.leaders[0]?.athlete?.position?.abbreviation} - ${game?.competitors[0]?.team?.abbreviation}`}</span>
              </Typography>

              <Box className="flex flex-row gap-2">
                <Typography className="text-xs">
                  {`${data?.gamepackageJSON?.leaders[0]?.leaders[0]?.leaders[0]?.statistics[0]?.displayValue}`}
                  <span className="text-[10px] opacity-60">{` ${data?.gamepackageJSON?.leaders[0]?.leaders[0]?.leaders[0]?.statistics[0]?.shortDisplayName}`}</span>
                </Typography>
                <Typography className="text-xs">
                  {`${data?.gamepackageJSON?.leaders[0]?.leaders[0]?.leaders[0]?.statistics[1]?.displayValue}`}
                  <span className="text-[10px] opacity-60">{` ${data?.gamepackageJSON?.leaders[0]?.leaders[0]?.leaders[0]?.statistics[1]?.shortDisplayName}`}</span>
                </Typography>
                <Typography className="text-xs">
                  {`${data?.gamepackageJSON?.leaders[0]?.leaders[0]?.leaders[0]?.statistics[2]?.displayValue}`}
                  <span className="text-[10px] opacity-60">{` ${data?.gamepackageJSON?.leaders[0]?.leaders[0]?.leaders[0]?.statistics[2]?.shortDisplayName}`}</span>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      );
    } else if (league === "NFL") {
      return (
        <Box className="flex flex-col justify-start gap-3">
          <Box className="flex flex-row items-center gap-2">
            <Image
              src={
                data?.gamepackageJSON?.leaders[1]?.leaders[0]?.leaders[0]?.athlete?.headshot?.href
              }
              width={100}
              height={100}
              priority={true}
              alt="away team points leader"
              className="w-[35px] h-[35px] border rounded-full object-cover"
            />
            <Box className="flex flex-col">
              <Typography className="text-xs">
                {`${data?.gamepackageJSON?.leaders[1]?.leaders[0]?.leaders[0]?.athlete?.displayName} `}
                <span className="opacity-60">{`${data?.gamepackageJSON?.leaders[1]?.leaders[0]?.leaders[0]?.athlete?.position?.abbreviation} - ${game?.competitors[1]?.team?.abbreviation}`}</span>
              </Typography>
              <Box className="flex flex-row gap-2">
                <Typography className="text-xs opacity-70">
                  {`${data?.gamepackageJSON?.leaders[1]?.leaders[0]?.leaders[0]?.displayValue}`}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box className="flex flex-row items-center gap-2">
            <Image
              src={
                data?.gamepackageJSON?.leaders[0]?.leaders[0]?.leaders[0]?.athlete?.headshot?.href
              }
              width={100}
              height={100}
              priority={true}
              alt="away team points leader"
              className="w-[35px] h-[35px] border rounded-full object-cover"
            />
            <Box className="flex flex-col">
              <Typography className="text-xs">
                {`${data?.gamepackageJSON?.leaders[0]?.leaders[0]?.leaders[0]?.athlete?.displayName} `}
                <span className="opacity-60">{`${data?.gamepackageJSON?.leaders[0]?.leaders[0]?.leaders[0]?.athlete?.position?.abbreviation} - ${game?.competitors[0]?.team?.abbreviation}`}</span>
              </Typography>

              <Box className="flex flex-row gap-2">
                <Typography className="text-xs opacity-70">
                  {`${data?.gamepackageJSON?.leaders[0]?.leaders[0]?.leaders[0]?.displayValue}`}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      );
    } else if (league === "MLB") {
      return (
        <Box className="flex flex-col justify-start items-start gap-1">
          {typeof data?.gamepackageJSON?.header?.competitions[0]?.status?.featuredAthletes !==
            "undefined" && (
            <>
              {typeof data?.gamepackageJSON?.header?.competitions[0]?.status
                ?.featuredAthletes[0] !== "undefined" && (
                <Box className="flex flex-row items-center gap-1">
                  <Typography className="text-[10px] opacity-60 w-[30px]">WIN</Typography>

                  <Image
                    src={
                      data?.gamepackageJSON?.header?.competitions[0]?.status?.featuredAthletes[0]
                        ?.athlete?.headshot?.href
                    }
                    width={100}
                    height={100}
                    priority={true}
                    alt={
                      data?.gamepackageJSON?.header?.competitions[0]?.status?.featuredAthletes[0]
                        ?.athlete?.headshot?.alt
                    }
                    className="w-[30px] h-[30px] border rounded-full object-cover"
                  />
                  <Box className="flex flex-col">
                    <Typography className="text-xs opacity-80">
                      {`${data?.gamepackageJSON?.header?.competitions[0]?.status?.featuredAthletes[0]?.athlete?.shortName} `}
                    </Typography>
                    <Typography className="text-[11px]">
                      {`(${data?.gamepackageJSON?.header?.competitions[0]?.status?.featuredAthletes[0]?.athlete?.record})`}
                    </Typography>
                  </Box>
                </Box>
              )}

              {typeof data?.gamepackageJSON?.header?.competitions[0]?.status
                ?.featuredAthletes[1] !== "undefined" && (
                <Box className="flex flex-row items-center gap-1">
                  <Typography className="text-[10px] opacity-60 w-[30px]">LOSS</Typography>

                  <Image
                    src={
                      data?.gamepackageJSON?.header.competitions[0].status.featuredAthletes[1]
                        .athlete?.headshot?.href
                    }
                    width={100}
                    height={100}
                    priority={true}
                    alt={
                      data.gamepackageJSON.header.competitions[0].status.featuredAthletes[1].athlete
                        ?.headshot?.alt || "N/A"
                    }
                    className="w-[30px] h-[30px] border rounded-full object-cover"
                  />
                  <Box className="flex flex-col">
                    <Typography className="text-xs opacity-80">
                      {`${data.gamepackageJSON.header.competitions[0].status.featuredAthletes[1].athlete.shortName} `}
                    </Typography>
                    <Typography className="text-[11px]">
                      {`(${data.gamepackageJSON.header.competitions[0].status.featuredAthletes[1].athlete.record})`}
                    </Typography>
                  </Box>
                </Box>
              )}

              {typeof data.gamepackageJSON.header.competitions[0].status.featuredAthletes[2] !==
                "undefined" && (
                <Box className="flex flex-row items-center gap-1">
                  <Typography className="text-[10px] opacity-60 w-[30px]">SAVE</Typography>

                  <Image
                    src={
                      data.gamepackageJSON.header.competitions[0].status.featuredAthletes[2].athlete
                        ?.headshot?.href
                    }
                    width={100}
                    height={100}
                    priority={true}
                    alt={
                      data.gamepackageJSON.header.competitions[0].status.featuredAthletes[2].athlete
                        ?.headshot?.alt
                    }
                    className="w-[30px] h-[30px] border rounded-full object-cover"
                  />
                  <Box className="flex flex-col">
                    <Typography className="text-xs opacity-80">
                      {`${data.gamepackageJSON.header.competitions[0].status.featuredAthletes[2].athlete.shortName} `}
                    </Typography>
                    <Typography className="text-[11px]">
                      {`(${data.gamepackageJSON.header.competitions[0].status.featuredAthletes[2].athlete.record})`}
                    </Typography>
                  </Box>
                </Box>
              )}
            </>
          )}
        </Box>
      );
    }
  };

  const getLinescoreHeaderByLeague = () => {
    if (league === "nfl" || league === "NBA") {
      return (
        <Box className="w-full flex justify-end pr-3">
          <Typography className="w-[20px] pl-2 flex justify-center text-[12px] opacity-70 font-[600]">
            1
          </Typography>
          <Typography className="w-[20px] pl-2 flex justify-center text-[12px] opacity-70 font-[600]">
            2
          </Typography>
          <Typography className="w-[20px] pl-2 flex justify-center text-[12px] opacity-70 font-[600]">
            3
          </Typography>
          <Typography className="w-[20px] pl-2 flex justify-center text-[12px] opacity-70 font-[600]">
            4
          </Typography>
          <Typography className="justify-end flex pr-[2px] w-[50px] text-[12px] opacity-70 font-[600]">
            T
          </Typography>
        </Box>
      );
    } else if (league === "MLB") {
      return (
        <Box className="w-full flex justify-end pr-3">
          <Typography className="w-[40px] pl-2 flex justify-center text-[12px] opacity-70 font-[600]">
            R
          </Typography>
          <Typography className="w-[40px] pl-2 flex justify-center text-[12px] opacity-70 font-[600]">
            H
          </Typography>
          <Typography className="w-[40px] pl-2 flex justify-center text-[12px] opacity-70 font-[600]">
            E
          </Typography>
        </Box>
      );
    }
  };

  const getLinescoreValuesByLeague = (team: any, teamWon: any) => {
    if (league === "NFL" || league === "NBA") {
      return (
        <Box
          sx={{ opacity: teamWon ? "0.8" : "0.4" }}
          className={`w-full flex justify-end items-center pr-3 ${teamWon && "dt-team-won"}`}
        >
          <Typography className="w-[20px] pl-2 flex justify-center text-[12px]">
            {team.linescores[0]?.displayValue || "-"}
          </Typography>
          <Typography className="w-[20px] pl-2 flex justify-center text-[12px]">
            {team.linescores[1]?.displayValue || "-"}
          </Typography>
          <Typography className="w-[20px] pl-2 flex justify-center text-[12px]">
            {team.linescores[2]?.displayValue || "-"}
          </Typography>
          <Typography className="w-[20px] pl-2 flex justify-center text-[12px]">
            {team.linescores[3]?.displayValue || "-"}
          </Typography>
          <Typography className="justify-end flex pl-[1rem] w-[50px] font-bold text-xl">
            {team?.score || "-"}
          </Typography>
        </Box>
      );
    } else if (league === "MLB") {
      return (
        <Box
          sx={{ opacity: teamWon ? "0.8" : "0.4" }}
          className={`w-full flex justify-end items-center pr-3 ${teamWon && "dt-team-won"}`}
        >
          <Typography className="w-[40px] pl-2 flex justify-center font-semibold text-[16px]">
            {team.score || "-"}
          </Typography>
          <Typography className="w-[40px] pl-2 flex justify-center font-semibold text-[16px]">
            {team.hits || "-"}
          </Typography>
          <Typography className="w-[40px] pl-2 flex justify-center font-semibold text-[16px]">
            {team.errors || "0"}
          </Typography>
        </Box>
      );
    }
  };

  const mobileView = () => (
    <Link href={isGameDetailsFinalized ? `/${league.toLowerCase()}/game/${gameId}/home` : ""}>
      <Box className="w-full grid grid-cols-[1fr_25%] gap-3 py-2">
        {/* 1ST COLUMN: GAME INFO */}
        <Box className="w-full grid grid-cols-[1fr_auto] items-center grid-rows-[1fr_1fr] score-cell relative">
          {/* AWAY TEAM IMG AND NAME */}
          <Box className="flex items-center gap-2">
            <Image
              src={game.competitors[1].team.logo ?? "/default.png"}
              width={500}
              height={500}
              priority={true}
              alt="home team logo"
              className="w-6 object-contain"
            />
            <Typography
              sx={{
                opacity: awayTeamWon || isGameScheduled ? "1" : "0.6",
              }}
              className="text-sm font-semibold tracking-wide md:text-base"
            >
              {awayTeamName}
            </Typography>
          </Box>
          {/* AWAY TEAM SCORE */}
          <Typography
            sx={{
              opacity: awayTeamWon || isGameScheduled ? "1" : "0.6",
            }}
            className={`${
              awayTeamScore > homeTeamScore && "winning-score"
            } text-sm text-end font-semibold md:text-base md:font-bold`}
          >
            {getScoreOrRecord(1)}
          </Typography>

          {/* HOME TEAM IMG AND NAME */}
          <Box className="flex items-center gap-2">
            <Image
              src={game.competitors[0].team.logo ?? "/default.png"}
              width={500}
              height={500}
              priority={true}
              alt="home team logo"
              className="w-6 object-contain"
            />
            <Typography
              sx={{
                opacity: homeTeamWon || isGameScheduled ? "1" : "0.6",
              }}
              className="text-sm md:text-base font-semibold tracking-wide"
            >
              {homeTeamName}
            </Typography>
          </Box>
          {/* HOME TEAM SCORE */}
          <Typography
            sx={{
              opacity: homeTeamWon || isGameScheduled ? "1" : "0.6",
            }}
            className={`${
              homeTeamScore > awayTeamScore && "winning-score"
            } text-sm text-end font-semibold md:text-base md:font-bold`}
          >
            {getScoreOrRecord(0)}
          </Typography>
        </Box>

        {isGameFinished || isGameInProgess ? (
          <Typography
            sx={{ color: isGameFinished ? "black" : "#d50a0a" }}
            className="flex w-full justify-start items-center text-xs opacity-80 font-semibold"
          >
            {game.status.type.shortDetail}
          </Typography>
        ) : (
          <Box className="flex w-full justify-start items-center">
            <Box className="flex flex-col">
              <Typography className="text-xs opacity-90 font-semibold">{gameTime}</Typography>
              <Typography className="text-xs opacity-70">{channel}</Typography>
              <Typography className="text-xs opacity-70">{odds}</Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Link>
  );

  const desktopView = () => (
    <Box className="w-full grid grid-cols-[3fr,2fr,3fr] px-1 py-2 place-items-center">
      {/* game date, network */}
      <Box className="min-w-full h-full my-auto col-start-1 border-r border-[rgba(0,0,0,0.1)]">
        <Box className="w-full h-full justify-center flex flex-col gap-1 ">
          <Box className="w-full flex items-center">
            <p
              style={{
                color: isGameInProgess ? "#d50a0a" : "black",
                opacity: isGameInProgess ? "0.9" : "0.7",
              }}
              className="whitespace-nowrap text-[12px] mb-1 font-[600] uppercase"
            >
              {isGameFinished || isGameInProgess ? game.status.type.shortDetail : gameTime}
            </p>
            {(isGameInProgess || isGameFinished) && getLinescoreHeaderByLeague()}
          </Box>
          {/* away team*/}
          <Box className="flex flex-row gap-2 items-center mb-2 relative">
            <Image
              src={game.competitors[1].team.logo ?? "/default.png"}
              width={500}
              height={500}
              priority={true}
              alt="home team logo"
              className="w-9 object-cover"
            />
            <Box className="w-full flex flex-row">
              <Box className="flex flex-col w-full">
                <Typography
                  sx={{ opacity: awayTeamWon ? "0.8" : "0.4" }}
                  className="text-sm font-semibold whitespace-nowrap"
                >
                  {awayTeamName}
                </Typography>
                {typeof game.competitors[0].records !== "undefined" && (
                  <Typography className="text-xs opacity-60 wihtespace-nowrap capitalize">{`(${
                    game.competitors[0].records[0].summary
                  }, ${data["__gamepackage__"].awayTeam?.record[1]?.displayValue || ""} ${
                    data["__gamepackage__"].awayTeam?.record[1]?.type || ""
                  })`}</Typography>
                )}
              </Box>
              {(isGameInProgess || isGameFinished) && (
                <>{getLinescoreValuesByLeague(data["__gamepackage__"].awayTeam, awayTeamWon)}</>
              )}
            </Box>
          </Box>
          <Box className="flex flex-row gap-2 items-center relative">
            <Image
              src={game.competitors[0].team.logo ?? "/default.png"}
              width={500}
              height={500}
              priority={true}
              alt="home team logo"
              className="w-9 object-cover"
            />
            <Box className="w-full flex flex-row">
              <Box className="w-full flex flex-col">
                <Typography
                  sx={{ opacity: homeTeamWon ? "0.8" : "0.4" }}
                  className="text-sm font-semibold"
                >
                  {homeTeamName}
                </Typography>
                {typeof game.competitors[1].records !== "undefined" && (
                  <Typography className="text-xs opacity-60 wihtespace-nowrap capitalize">{`(${
                    game.competitors[1].records[0].summary
                  }, ${data["__gamepackage__"].homeTeam?.record[1]?.displayValue || ""} ${
                    data["__gamepackage__"].homeTeam?.record[1]?.type || ""
                  })`}</Typography>
                )}
              </Box>
              {(isGameInProgess || isGameFinished) && (
                <>{getLinescoreValuesByLeague(data["__gamepackage__"].homeTeam, homeTeamWon)}</>
              )}
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className="min-w-full h-full w-full min-h-full col-start-2 px-3">
        {/* IF GAME IS SCHEDULED WE SHOW VENUE INFO AND TICKETS */}
        {isGameScheduled && isGameDetailsFinalized && (
          <Box className="h-full flex flex-col justify-evenly gap-2">
            <Box className="">
              <Typography className="text-[11px] opacity-70 font-[600]">{`${game.venue.fullName}`}</Typography>
              <Typography className="text-[11px] opacity-60]">{`${game.venue.address.city}, ${game.venue.address.state}`}</Typography>
            </Box>

            {typeof data.gamepackageJSON.ticketsInfo !== "undefined" && (
              <Box className="border-b border-t border-[rgba(0,0,0,0.1)] py-2">
                <Link
                  target="_blank"
                  href={data.gamepackageJSON.ticketsInfo["seatSituation"].eventLink}
                >
                  <Box className="flex flex-row items-center gap-1">
                    <FontAwesomeIcon
                      icon={faTicket}
                      style={{ fontSize: "1rem", color: "#3e82d6", cursor: "pointer" }}
                    />
                    <Typography className="text-[12px] opacity-60] anchor-link">
                      {data.gamepackageJSON.ticketsInfo["seatSituation"].summary}
                    </Typography>
                  </Box>
                </Link>
              </Box>
            )}

            <Box>
              {odds && (
                <Typography className="text-[11px] opacity-60]">{`Line: ${odds}`}</Typography>
              )}
            </Box>
          </Box>
        )}
        {/* IF GAME IS IN PROGRESS OR FINISHED WE SHOW A VIDEO OR ARTICLE */}
        {(isGameFinished || isGameInProgess) && (
          <>
            {data["gamepackageJSON"]["videos"].length > 0 && (
              <Box className="w-full h-full relative cursor-pointer article-video-container overflow-hidden">
                <Image
                  width={576}
                  height={324}
                  alt="video"
                  src={
                    data["gamepackageJSON"]["videos"][data.gamepackageJSON.videos.length - 1]
                      .thumbnail
                  }
                  className="w-full h-full object-cover video-preview"
                />
                <Link
                  target="_blank"
                  href={
                    data["gamepackageJSON"]["videos"][data.gamepackageJSON.videos.length - 1][
                      "links"
                    ]["web"].href
                  }
                >
                  <Box className="gray-circle sm-circle"></Box>
                </Link>
                <Box className="arrow sm-arrow"></Box>
                <Typography className="text-over-video">
                  {data["gamepackageJSON"]["videos"][0].description.substring(0, 60)}
                  {data["gamepackageJSON"]["videos"][0].description.length > 60 && "..."}
                </Typography>
              </Box>
            )}
            {data["gamepackageJSON"]["videos"].length === 0 &&
              typeof data.gamepackageJSON.article !== "undefined" && (
                <Link target="_blank" href={data.gamepackageJSON.article.links.web.href}>
                  <Typography className="text-[12px] font-semibold opacity-80 mb-2">
                    {data.gamepackageJSON.article.headline}
                  </Typography>
                  <Typography className="text-xs opacity-70 overflow-hidden">
                    {data.gamepackageJSON.article.description.substring(0, 80)}
                    {data.gamepackageJSON.article.description.length > 80 && "..."}
                  </Typography>
                </Link>
              )}
            {data["gamepackageJSON"]["videos"].length === 0 &&
              typeof data.gamepackageJSON.article === "undefined" && (
                <Box className="">
                  <Typography className="text-[11px] opacity-70 font-[600]">{`${game.venue.fullName}`}</Typography>
                  <Typography className="text-[11px] opacity-60]">{`${game.venue.address.city}, ${
                    game.venue.address?.state || ""
                  }`}</Typography>
                </Box>
              )}
          </>
        )}
      </Box>

      {/* IF GAME IS SCEHDULED WE SHOW PLAYERS TO WATCH */}
      <Box className="min-w-full min-h-full h-full flex flex-col gap-3 col-start-3 border-l border-[rgba(0,0,0,0.1)] px-2">
        {isGameScheduled && isGameDetailsFinalized && (
          <Box className="h-full flex flex-row gap-2 justify-between items-center">
            {typeof game.competitors[1].leaders !== "undefined" &&
              typeof game.competitors[0].leaders !== "undefined" && (
                <Box className="h-full flex flex-col justify-start gap-3">
                  <Typography className="text-[12px] opacity-60">PLAYERS TO WATCH</Typography>
                  {/* away team point leader */}
                  <Box className="flex flex-row items-center gap-2">
                    <Image
                      src={game?.competitors[1]?.leaders[0]?.leaders[0]?.athlete.headshot}
                      width={100}
                      height={100}
                      priority={true}
                      alt="away team points leader"
                      className="w-[40px] h-[40px] border rounded-full object-cover"
                    />
                    <Box className="flex flex-col">
                      <Typography className="text-xs">
                        {`${game.competitors[1].leaders[0].leaders[0].athlete.displayName} `}
                        <span className="opacity-60">{`${game.competitors[1].leaders[0].leaders[0].athlete.position?.abbreviation} - ${game.competitors[1].team?.abbreviation}`}</span>
                      </Typography>
                      <Typography className="text-xs">
                        {`${Math.floor(game.competitors[1].leaders[0].leaders[0].value)}`}
                        <span className="text-[10px] opacity-60">{` ${game.competitors[0].leaders[0].abbreviation}`}</span>
                      </Typography>
                    </Box>
                  </Box>
                  <Box className="flex flex-row items-center gap-2">
                    <Image
                      src={game?.competitors[0]?.leaders[0]?.leaders[0]?.athlete.headshot}
                      width={100}
                      height={100}
                      priority={true}
                      alt="away team points leader"
                      className="w-[40px] h-[40px] border rounded-full object-cover"
                    />
                    <Box className="flex flex-col">
                      <Typography className="text-xs">
                        {`${game.competitors[0].leaders[0].leaders[0].athlete.displayName} `}
                        <span className="opacity-60">{`${game.competitors[0].leaders[0].leaders[0].athlete.position.abbreviation} - ${game.competitors[0].team.abbreviation}`}</span>
                      </Typography>

                      <Typography className="text-xs">
                        {`${Math.floor(game.competitors[0].leaders[0].leaders[0].value)}`}
                        <span className="text-[10px] opacity-60">{` ${game.competitors[0].leaders[0].abbreviation}`}</span>
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              )}

            <Box className="flex flex-col items-start justify-start gap-3">
              <Link
                href={isGameDetailsFinalized ? `/${league.toLowerCase()}/game/${gameId}/home` : ""}
              >
                <Box className="dt-scorecard-button">GAMECAST</Box>
              </Link>
              {typeof data.gamepackageJSON.ticketsInfo !== "undefined" && (
                <Link
                  target="_blank"
                  href={data.gamepackageJSON.ticketsInfo.seatSituation.eventLink}
                >
                  <Box className="dt-scorecard-button">TICKETS</Box>
                </Link>
              )}
            </Box>
          </Box>
        )}
        {(isGameFinished || isGameInProgess) && (
          <Box className="flex flex-row gap-2 justify-between items-center">
            <Box className="h-full flex gap-2 flex-col justify-start">
              <Typography className="text-[12px] opacity-60">TOP PERFORMERS</Typography>
              {getTopPerformersByLeague()}
            </Box>

            <Box className="flex flex-col gap-3">
              <Link
                href={isGameDetailsFinalized ? `/${league.toLowerCase()}/game/${gameId}/home` : ""}
              >
                <Box className="dt-scorecard-button">GAMECAST</Box>
              </Link>
              <Link
                href={
                  isGameDetailsFinalized ? `/${league.toLowerCase()}/game/${gameId}/boxscore` : ""
                }
              >
                <Box className="dt-scorecard-button">BOX SCORE</Box>
              </Link>
              <Link
                href={
                  isGameDetailsFinalized ? `/${league.toLowerCase()}/game/${gameId}/playbyplay` : ""
                }
              >
                <Box className="dt-scorecard-button">PLAYBYPLAY</Box>
              </Link>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );

  if (typeof gameInfo.competitions === "undefined") {
    return null;
  }

  if (isLoading) {
    return (
      <>
        {isDesktopScreen ? (
          <Box className="animate-pulse w-full rounded-xl h-[7.75rem] bg-gray-200 my-1"></Box>
        ) : (
          mobileView()
        )}
      </>
    );
  }

  if (!isLoading) {
    return <>{isDesktopScreen ? desktopView() : mobileView()}</>;
  }
}
