"use client";

import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import { v4 } from "uuid";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
export default function ScoreCard({
  gameInfo,
  league,
}: {
  gameInfo: any;
  league: string;
}) {
  const isDesktopScreen = useMediaQuery("(min-width:800px)");

  const game = gameInfo.competitions[0];

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

  const isGameDetailsFinalized =
    awayTeamName !== "TBD" && homeTeamName !== "TBD";
  const isGameScheduled = game.status.type.state === "pre";
  const isGameInProgess = game.status.type.state === "in";
  const isGameFinished = game.status.type.state === "post";
  const isGameNoteAvailable = typeof game.notes[0]?.headline !== "undefined";
  const homeTeamWon = homeTeamScore > awayTeamScore || isGameScheduled;
  const awayTeamWon = awayTeamScore > homeTeamScore || isGameScheduled;

  const channel = game?.geoBroadcasts[0]?.media?.shortName || "";
  const odds = typeof game?.odds == "undefined" ? "" : game.odds[0].details;

  const { data, isLoading } = useSWR(
    isDesktopScreen
      ? `https://cdn.espn.com/core/${league}/game?xhr=1&gameId=${gameId}`
      : null,
    fetcher,
    { refreshInterval: 30000 },
  );

  /* FEATURED ATHLETES FOR MLB TOP PERFORMERS */

  const getScoreOrRecord = (teamIndex: number) => {
    return isGameScheduled
      ? isGameDetailsFinalized &&
        typeof game.competitors[teamIndex].records !== "undefined"
        ? game.competitors[teamIndex].records[0].summary
        : ""
      : teamIndex === 1
        ? awayTeamScore
        : homeTeamScore;
  };

  const getTopPerformersByLeague = () => {
    if (league === "NBA") {
      return (
        <div className="flex flex-col justify-start gap-1">
          <div className="flex flex-row items-center gap-2">
            <Image
              src={
                data.gamepackageJSON?.leaders[1]?.leaders[0]?.leaders[0]
                  ?.athlete?.headshot?.href
              }
              width={100}
              height={100}
              priority={true}
              alt="away team points leader"
              className="h-[40px] w-[40px] rounded-full border object-cover"
            />
            <div className="flex flex-col">
              <p className="text-xs">
                {`${data?.gamepackageJSON?.leaders[1]?.leaders[0]?.leaders[0]?.athlete?.displayName} `}
                <span className="opacity-60">{`${data?.gamepackageJSON?.leaders[1]?.leaders[0]?.leaders[0]?.athlete?.position?.abbreviation} - ${game?.competitors[1]?.team?.abbreviation}`}</span>
              </p>
              <div className="flex flex-row gap-2">
                <p className="text-xs">
                  {`${data?.gamepackageJSON?.leaders[1]?.leaders[0]?.leaders[0]?.statistics[0]?.displayValue}`}
                  <span className="text-[10px] opacity-60">{` ${data?.gamepackageJSON?.leaders[1]?.leaders[0]?.leaders[0]?.statistics[0]?.shortDisplayName}`}</span>
                </p>
                <p className="text-xs">
                  {`${data?.gamepackageJSON?.leaders[1]?.leaders[0]?.leaders[0]?.statistics[1]?.displayValue}`}
                  <span className="text-[10px] opacity-60">{` ${data?.gamepackageJSON?.leaders[1]?.leaders[0]?.leaders[0]?.statistics[1]?.shortDisplayName}`}</span>
                </p>
                <p className="text-xs">
                  {`${data?.gamepackageJSON?.leaders[1]?.leaders[0]?.leaders[0]?.statistics[2]?.displayValue}`}
                  <span className="text-[10px] opacity-60">{` ${data?.gamepackageJSON?.leaders[1]?.leaders[0]?.leaders[0]?.statistics[2]?.shortDisplayName}`}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center gap-2">
            <Image
              src={
                data?.gamepackageJSON?.leaders[0]?.leaders[0]?.leaders[0]
                  ?.athlete?.headshot?.href
              }
              width={100}
              height={100}
              priority={true}
              alt="away team points leader"
              className="h-[40px] w-[40px] rounded-full border object-cover"
            />
            <div className="flex flex-col">
              <p className="text-xs">
                {`${data?.gamepackageJSON?.leaders[0]?.leaders[0]?.leaders[0]?.athlete?.displayName} `}
                <span className="opacity-60">{`${data?.gamepackageJSON?.leaders[0]?.leaders[0]?.leaders[0]?.athlete?.position?.abbreviation} - ${game?.competitors[0]?.team?.abbreviation}`}</span>
              </p>

              <div className="flex flex-row gap-2">
                <p className="text-xs">
                  {`${data?.gamepackageJSON?.leaders[0]?.leaders[0]?.leaders[0]?.statistics[0]?.displayValue}`}
                  <span className="text-[10px] opacity-60">{` ${data?.gamepackageJSON?.leaders[0]?.leaders[0]?.leaders[0]?.statistics[0]?.shortDisplayName}`}</span>
                </p>
                <p className="text-xs">
                  {`${data?.gamepackageJSON?.leaders[0]?.leaders[0]?.leaders[0]?.statistics[1]?.displayValue}`}
                  <span className="text-[10px] opacity-60">{` ${data?.gamepackageJSON?.leaders[0]?.leaders[0]?.leaders[0]?.statistics[1]?.shortDisplayName}`}</span>
                </p>
                <p className="text-xs">
                  {`${data?.gamepackageJSON?.leaders[0]?.leaders[0]?.leaders[0]?.statistics[2]?.displayValue}`}
                  <span className="text-[10px] opacity-60">{` ${data?.gamepackageJSON?.leaders[0]?.leaders[0]?.leaders[0]?.statistics[2]?.shortDisplayName}`}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (league === "NFL") {
      return (
        <div className="flex flex-col justify-start gap-1">
          <div className="flex flex-row items-center gap-2">
            <Image
              src={
                data?.gamepackageJSON?.leaders[1]?.leaders[0]?.leaders[0]
                  ?.athlete?.headshot?.href
              }
              width={100}
              height={100}
              priority={true}
              alt="away team points leader"
              className="h-[40px] w-[40px] rounded-full border object-cover"
            />
            <div className="flex flex-col">
              <p className="text-xs">
                {`${data?.gamepackageJSON?.leaders[1]?.leaders[0]?.leaders[0]?.athlete?.displayName} `}
                <span className="opacity-60">{`${data?.gamepackageJSON?.leaders[1]?.leaders[0]?.leaders[0]?.athlete?.position?.abbreviation} - ${game?.competitors[1]?.team?.abbreviation}`}</span>
              </p>
              <div className="flex flex-row gap-2">
                <p className="text-xs opacity-70">
                  {`${data?.gamepackageJSON?.leaders[1]?.leaders[0]?.leaders[0]?.displayValue}`}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center gap-2">
            <Image
              src={
                data?.gamepackageJSON?.leaders[0]?.leaders[0]?.leaders[0]
                  ?.athlete?.headshot?.href
              }
              width={100}
              height={100}
              priority={true}
              alt="away team points leader"
              className="h-[40px] w-[40px] rounded-full border object-cover"
            />
            <div className="flex flex-col">
              <p className="text-xs">
                {`${data?.gamepackageJSON?.leaders[0]?.leaders[0]?.leaders[0]?.athlete?.displayName} `}
                <span className="opacity-60">{`${data?.gamepackageJSON?.leaders[0]?.leaders[0]?.leaders[0]?.athlete?.position?.abbreviation} - ${game?.competitors[0]?.team?.abbreviation}`}</span>
              </p>

              <div className="flex flex-row gap-2">
                <p className="text-xs opacity-70">
                  {`${data?.gamepackageJSON?.leaders[0]?.leaders[0]?.leaders[0]?.displayValue}`}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (league === "MLB") {
      return (
        <div className="flex flex-col items-start justify-start gap-1">
          {typeof data?.gamepackageJSON?.header?.competitions[0]?.status
            ?.featuredAthletes !== "undefined" && (
            <>
              {typeof data?.gamepackageJSON?.header?.competitions[0]?.status
                ?.featuredAthletes[0] !== "undefined" && (
                <div className="flex flex-row items-center gap-1">
                  <p className="w-[30px] text-[10px] opacity-60">WIN</p>

                  <Image
                    src={
                      data?.gamepackageJSON?.header?.competitions[0]?.status
                        ?.featuredAthletes[0]?.athlete?.headshot?.href
                    }
                    width={100}
                    height={100}
                    priority={true}
                    alt={
                      data?.gamepackageJSON?.header?.competitions[0]?.status
                        ?.featuredAthletes[0]?.athlete?.headshot?.alt
                    }
                    className="h-[30px] w-[30px] rounded-full border object-cover"
                  />
                  <div className="flex flex-col">
                    <p className="text-xs opacity-80">
                      {`${data?.gamepackageJSON?.header?.competitions?.[0]?.status?.featuredAthletes[0]?.athlete?.shortName} `}
                    </p>
                    <p className="text-[11px]">
                      {`(${data?.gamepackageJSON?.header?.competitions?.[0]?.status?.featuredAthletes[0]?.athlete?.record})`}
                    </p>
                  </div>
                </div>
              )}

              {typeof data?.gamepackageJSON?.header?.competitions[0]?.status
                ?.featuredAthletes[1] !== "undefined" && (
                <div className="flex flex-row items-center gap-1">
                  <p className="w-[30px] text-[10px] opacity-60">LOSS</p>

                  <Image
                    src={
                      data?.gamepackageJSON?.header?.competitions?.[0]?.status
                        ?.featuredAthletes?.[1].athlete?.headshot?.href
                    }
                    width={100}
                    height={100}
                    priority={true}
                    alt={
                      data?.gamepackageJSON?.header?.competitions[0]?.status
                        .featuredAthletes[1].athlete?.headshot?.alt || "N/A"
                    }
                    className="h-[30px] w-[30px] rounded-full border object-cover"
                  />
                  <div className="flex flex-col">
                    <p className="text-xs opacity-80">
                      {`${data?.gamepackageJSON?.header?.competitions[0]?.status?.featuredAthletes[1]?.athlete?.shortName} `}
                    </p>
                    <p className="text-[11px]">
                      {`(${data?.gamepackageJSON?.header?.competitions[0]?.status?.featuredAthletes[1]?.athlete?.record})`}
                    </p>
                  </div>
                </div>
              )}

              {typeof data?.gamepackageJSON?.header?.competitions[0]?.status
                ?.featuredAthletes[2] !== "undefined" && (
                <div className="flex flex-row items-center gap-1">
                  <p className="w-[30px] text-[10px] opacity-60">SAVE</p>

                  <Image
                    src={
                      data?.gamepackageJSON.header.competitions[0].status
                        .featuredAthletes[2].athlete?.headshot?.href
                    }
                    width={100}
                    height={100}
                    priority={true}
                    alt={
                      data?.gamepackageJSON?.header?.competitions[0]?.status
                        ?.featuredAthletes[2]?.athlete?.headshot?.alt
                    }
                    className="h-[30px] w-[30px] rounded-full border object-cover"
                  />
                  <div className="flex flex-col">
                    <p className="text-xs opacity-80">
                      {`${data.gamepackageJSON.header.competitions[0].status.featuredAthletes[2].athlete.shortName} `}
                    </p>
                    <p className="text-[11px]">
                      {`(${data.gamepackageJSON.header.competitions[0].status.featuredAthletes[2].athlete.record})`}
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      );
    }
  };

  const getLinescoreHeaderByLeague = () => {
    if (league === "nfl" || league === "NBA") {
      return (
        <div className="flex w-full justify-end pr-3">
          <p className="flex w-[20px] justify-center pl-2 text-[12px] font-[600] opacity-70">
            1
          </p>
          <p className="flex w-[20px] justify-center pl-2 text-[12px] font-[600] opacity-70">
            2
          </p>
          <p className="flex w-[20px] justify-center pl-2 text-[12px] font-[600] opacity-70">
            3
          </p>
          <p className="flex w-[20px] justify-center pl-2 text-[12px] font-[600] opacity-70">
            4
          </p>
          <p className="flex w-[50px] justify-end pr-[2px] text-[12px] font-[600] opacity-70">
            T
          </p>
        </div>
      );
    } else if (league === "MLB") {
      return (
        <div className="flex w-full justify-end pr-3">
          <p className="flex w-[40px] justify-center pl-2 text-[12px] font-[600] opacity-70">
            R
          </p>
          <p className="flex w-[40px] justify-center pl-2 text-[12px] font-[600] opacity-70">
            H
          </p>
          <p className="flex w-[40px] justify-center pl-2 text-[12px] font-[600] opacity-70">
            E
          </p>
        </div>
      );
    }
  };

  const getLinescoreValuesByLeague = (team: any, teamWon: boolean) => {
    if (league === "NFL" || league === "NBA") {
      return (
        <div
          style={{
            opacity: isGameFinished ? (teamWon ? "0.8" : "0.4") : "0.8",
          }}
          className={`flex w-full items-center justify-end pr-3 ${
            isGameFinished && teamWon && "dt-team-won"
          }`}
        >
          <p className="flex w-[20px] justify-center pl-2 text-[12px]">
            {team.linescores?.[0]?.displayValue || "-"}
          </p>
          <p className="flex w-[20px] justify-center pl-2 text-[12px]">
            {team.linescores?.[1]?.displayValue || "-"}
          </p>
          <p className="flex w-[20px] justify-center pl-2 text-[12px]">
            {team.linescores?.[2]?.displayValue || "-"}
          </p>
          <p className="flex w-[20px] justify-center pl-2 text-[12px]">
            {team.linescores?.[3]?.displayValue || "-"}
          </p>
          <p
            style={{ transition: "all 0.5s ease-in" }}
            className="flex w-[50px] justify-end pl-[1rem] text-xl font-bold"
          >
            {team?.score || "-"}
          </p>
        </div>
      );
    } else if (league === "MLB") {
      return (
        <div
          style={{ opacity: teamWon ? "0.8" : "0.4" }}
          className={`flex w-full items-center justify-end pr-3 ${teamWon && "dt-team-won"}`}
        >
          <p className="flex w-[40px] justify-center pl-2 text-[16px] font-semibold">
            {team?.score || "-"}
          </p>
          <p className="flex w-[40px] justify-center pl-2 text-[16px] font-semibold">
            {team?.hits || "-"}
          </p>
          <p className="flex w-[40px] justify-center pl-2 text-[16px] font-semibold">
            {team?.errors || "0"}
          </p>
        </div>
      );
    }
  };

  const mobileView = () => (
    <Link
      href={
        isGameDetailsFinalized
          ? `/${league.toLowerCase()}/game/${gameId}/home`
          : ""
      }
    >
      <div className="grid w-full grid-cols-[1fr_25%] gap-3 py-2">
        {/* 1ST COLUMN: GAME INFO */}
        <div className="score-cell relative grid w-full grid-cols-[1fr_auto] grid-rows-[1fr_1fr] items-center">
          {/* AWAY TEAM IMG AND NAME */}
          <div className="flex items-center gap-2">
            <Image
              src={game.competitors[1].team.logo ?? "/default.png"}
              width={500}
              height={500}
              priority={true}
              alt="home team logo"
              className="w-6 object-contain"
            />
            <p
              style={{
                opacity: awayTeamWon || isGameScheduled ? "1" : "0.6",
              }}
              className="text-[14px] font-semibold tracking-wide md:text-base"
            >
              {awayTeamName}
            </p>
          </div>
          {/* AWAY TEAM SCORE */}
          <p
            style={{
              opacity: awayTeamWon || isGameScheduled ? "1" : "0.6",
            }}
            className={`${
              awayTeamScore > homeTeamScore && "winning-score"
            } text-end text-[14px] font-semibold md:text-base md:font-bold`}
          >
            {getScoreOrRecord(1)}
          </p>

          {/* HOME TEAM IMG AND NAME */}
          <div className="flex items-center gap-2">
            <Image
              src={game.competitors[0].team.logo ?? "/default.png"}
              width={500}
              height={500}
              priority={true}
              alt="home team logo"
              className="w-6 object-contain"
            />
            <p
              style={{
                opacity: homeTeamWon || isGameScheduled ? "1" : "0.6",
              }}
              className="text-[14px] font-semibold tracking-wide md:text-base"
            >
              {homeTeamName}
            </p>
          </div>
          {/* HOME TEAM SCORE */}
          <p
            style={{
              opacity: homeTeamWon || isGameScheduled ? "1" : "0.6",
            }}
            className={`${
              homeTeamScore > awayTeamScore && "winning-score"
            } text-end text-[14px] font-semibold md:text-base md:font-bold`}
          >
            {getScoreOrRecord(0)}
          </p>
        </div>

        {isGameFinished || isGameInProgess ? (
          <p
            style={{ color: isGameFinished ? "black" : "#d50a0a" }}
            className="flex w-full items-center justify-start text-xs font-semibold opacity-80"
          >
            {game.status.type.shortDetail}
          </p>
        ) : (
          <div className="flex w-full items-center justify-start">
            <div className="flex flex-col">
              <p className="text-xs font-semibold opacity-90">{gameTime}</p>
              <p className="text-xs opacity-70">{channel}</p>
              <p className="text-xs opacity-70">{odds}</p>
            </div>
          </div>
        )}

        {isGameNoteAvailable && (
          <p className="mt-[-0.25rem] text-xs opacity-60">
            {game.notes[0]?.headline}
          </p>
        )}
      </div>
    </Link>
  );

  const desktopView = () => (
    <div className="grid w-full grid-cols-[3fr,2fr,3fr] place-items-center px-1 py-2">
      {/* game date, network */}
      <div className="col-start-1 my-auto h-full min-w-full border-r border-[rgba(0,0,0,0.1)]">
        <div className="flex h-full w-full flex-col justify-center gap-[1px] ">
          <div className="flex w-full items-center">
            <p
              style={{
                color: isGameInProgess ? "#d50a0a" : "black",
                opacity: isGameInProgess ? "0.9" : "0.7",
              }}
              className="mb-1 whitespace-nowrap text-[12px] font-[600] uppercase"
            >
              {game.status.type.state !== "pre"
                ? game.status.type.shortDetail
                : gameTime}
            </p>
            {(game.status.type.state === "in" ||
              game.status.type.state === "post") &&
              game.status.type.detail != "Postponed" &&
              getLinescoreHeaderByLeague()}
          </div>
          {/* away team*/}
          <Link
            href={`/${league.toLowerCase()}/team/${game.competitors[1].team.id}/home`}
            className="relative mb-2 flex flex-row items-center gap-2"
          >
            <Image
              src={game.competitors[1].team.logo ?? "/default.png"}
              width={500}
              height={500}
              priority={true}
              alt="home team logo"
              className="w-9 object-cover"
            />
            <div className="flex w-full flex-row">
              <div className="flex w-full flex-col">
                <p
                  style={{ opacity: awayTeamWon ? "0.8" : "0.4" }}
                  className="whitespace-nowrap text-[14px] font-semibold"
                >
                  {awayTeamName}
                </p>
                {typeof game.competitors[1].records !== "undefined" && (
                  <p className="wihtespace-nowrap text-xs capitalize opacity-60">{`(${
                    game.competitors[1].records[0].summary
                  }, ${data["__gamepackage__"].awayTeam?.record[1]?.displayValue || ""} ${
                    data["__gamepackage__"].awayTeam?.record[1]?.type || ""
                  })`}</p>
                )}
              </div>
              {(game.status.type.state !== "pre" ||
                game.status.type.state === "post") &&
                game.status.type.detail != "Postponed" && (
                  <>
                    {getLinescoreValuesByLeague(
                      data["__gamepackage__"].awayTeam,
                      awayTeamWon,
                    )}
                  </>
                )}
            </div>
          </Link>
          <Link
            href={`/${league.toLowerCase()}/team/${game.competitors[0].team.id}/home`}
            className="relative flex flex-row items-center gap-2"
          >
            <Image
              src={game.competitors[0].team.logo ?? "/default.png"}
              width={500}
              height={500}
              priority={true}
              alt="home team logo"
              className="w-9 object-cover"
            />
            <div className="flex w-full flex-row">
              <div className="flex w-full flex-col">
                <p
                  style={{ opacity: homeTeamWon ? "0.8" : "0.4" }}
                  className="text-[14px] font-semibold"
                >
                  {homeTeamName}
                </p>
                {typeof game.competitors[0].records !== "undefined" && (
                  <p className="wihtespace-nowrap text-xs capitalize opacity-60">{`(${
                    game.competitors[0].records[0].summary
                  }, ${data["__gamepackage__"].homeTeam?.record[1]?.displayValue || ""} ${
                    data["__gamepackage__"].homeTeam?.record[1]?.type || ""
                  })`}</p>
                )}
              </div>
              {(game.status.type.state !== "pre" ||
                game.status.type.state === "post") &&
                game.status.type.detail != "Postponed" && (
                  <>
                    {getLinescoreValuesByLeague(
                      data["__gamepackage__"].homeTeam,
                      homeTeamWon,
                    )}
                  </>
                )}
            </div>
          </Link>
          {isGameNoteAvailable && (
            <p className="mt-2 text-xs opacity-60">{game.notes[0]?.headline}</p>
          )}
        </div>
      </div>

      <div className="col-start-2 h-full min-h-full w-full min-w-full px-3">
        {/* IF GAME IS SCHEDULED WE SHOW VENUE INFO AND TICKETS */}
        {isGameScheduled && isGameDetailsFinalized && (
          <div className="flex h-full flex-col justify-evenly gap-2">
            <div className="">
              <p className="text-[11px] font-[600] opacity-70">{`${
                game?.venue?.fullName ?? ""
              }`}</p>
              <p className="opacity-60] text-[11px]">{`${game?.venue?.address.city ?? ""}, ${
                game?.venue?.address.state ?? ""
              }`}</p>
            </div>

            {typeof data.gamepackageJSON.ticketsInfo !== "undefined" && (
              <div className="border-b border-t border-[rgba(0,0,0,0.1)] py-2">
                <Link
                  target="_blank"
                  href={
                    data.gamepackageJSON.ticketsInfo["seatSituation"].eventLink
                  }
                >
                  <div className="flex flex-row items-center gap-1">
                    <Image
                      src="/icons/credit-card.svg"
                      width="20"
                      height="20"
                      alt="right icon"
                    />
                    <p className="opacity-60] anchor-link text-[12px]">
                      {
                        data.gamepackageJSON.ticketsInfo["seatSituation"]
                          .summary
                      }
                    </p>
                  </div>
                </Link>
              </div>
            )}

            <div>
              {odds && (
                <p className="opacity-60] text-[11px]">{`Line: ${odds}`}</p>
              )}
            </div>
          </div>
        )}
        {/* IF GAME IS IN PROGRESS OR FINISHED WE SHOW A VIDEO OR ARTICLE */}
        {(isGameFinished || isGameInProgess) && (
          <>
            {data["gamepackageJSON"]["videos"].length > 0 && (
              <div className="article-video-container relative h-full w-full cursor-pointer overflow-hidden">
                <Image
                  width={576}
                  height={324}
                  alt="video"
                  src={
                    data["gamepackageJSON"]["videos"][
                      data.gamepackageJSON.videos.length - 1
                    ].thumbnail
                  }
                  className="video-preview h-full w-full object-cover"
                />
                <Link
                  target="_blank"
                  href={
                    data["gamepackageJSON"]["videos"][
                      data.gamepackageJSON.videos.length - 1
                    ]["links"]["web"].href
                  }
                >
                  <div className="gray-circle sm-circle"></div>
                </Link>
                <div className="arrow sm-arrow"></div>
                <p className="text-over-video">
                  {data["gamepackageJSON"]["videos"][0].description.substring(
                    0,
                    60,
                  )}
                  {data["gamepackageJSON"]["videos"][0].description.length >
                    60 && "..."}
                </p>
              </div>
            )}
            {data["gamepackageJSON"]["videos"].length === 0 &&
              typeof data.gamepackageJSON.article !== "undefined" && (
                <Link
                  target="_blank"
                  href={data.gamepackageJSON.article.links.web.href}
                >
                  <p className="mb-2 text-[12px] font-semibold opacity-80">
                    {data.gamepackageJSON.article.headline}
                  </p>
                  <p className="overflow-hidden text-xs opacity-70">
                    {data.gamepackageJSON.article.description.substring(0, 80)}
                    {data.gamepackageJSON.article.description.length > 80 &&
                      "..."}
                  </p>
                </Link>
              )}
            {data["gamepackageJSON"]["videos"].length === 0 &&
              typeof data.gamepackageJSON.article === "undefined" && (
                <div className="">
                  <p className="text-[11px] font-[600] opacity-70">{`${game?.venue?.fullName ?? "Unknown location"}`}</p>
                  <p className="opacity-60] text-[11px]">{`${game?.venue?.address?.city ?? "Unknown location"}, ${
                    game?.venue?.address?.state ?? ""
                  }`}</p>
                </div>
              )}
          </>
        )}
      </div>

      {/* IF GAME IS SCEHDULED WE SHOW PLAYERS TO WATCH */}
      <div className="col-start-3 flex h-full min-h-full min-w-full flex-col gap-1 border-l border-[rgba(0,0,0,0.1)] px-2">
        {game.status.type.state === "pre" && (
          <div className="flex h-full flex-row items-center justify-between gap-2">
            {typeof game.competitors[1].leaders !== "undefined" &&
              typeof game.competitors[0].leaders !== "undefined" && (
                <div className="flex h-full flex-col justify-start gap-1">
                  <p className="text-[12px] font-[400] opacity-60">
                    PLAYERS TO WATCH
                  </p>
                  {/* away team point leader */}
                  <div className="flex flex-row items-center gap-2">
                    <Image
                      src={
                        data?.gamepackageJSON?.leaders?.[1].leaders?.[0]
                          .leaders?.[0]?.athlete?.headshot.href
                      }
                      width={100}
                      height={100}
                      priority={true}
                      alt="away team points leader"
                      className="h-[40px] w-[40px] rounded-full border object-cover"
                    />
                    <div className="flex flex-col">
                      <p className="text-xs">
                        {`${data?.gamepackageJSON?.leaders?.[1].leaders?.[0].leaders?.[0]?.athlete?.fullName} `}
                        <span className="opacity-60">{`${data?.gamepackageJSON?.leaders?.[1]?.leaders?.[0].leaders?.[0]?.athlete?.position?.abbreviation} - ${game?.competitors[1]?.team?.abbreviation}`}</span>
                      </p>

                      <div className="flex gap-1">
                        {data?.gamepackageJSON?.leaders?.[1].leaders?.[0].leaders?.[0].statistics?.map(
                          (stat: any) => (
                            <p key={v4()} className="text-xs">
                              {stat.displayValue}
                              <span className="text-[10px] opacity-60">{` ${stat.abbreviation}`}</span>
                            </p>
                          ),
                        ) ?? (
                          <p className="text-[11px] opacity-70">
                            {
                              data?.gamepackageJSON?.leaders?.[1].leaders?.[0]
                                .leaders?.[0].displayValue
                            }
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <Image
                      src={
                        data?.gamepackageJSON?.leaders?.[0].leaders?.[0]
                          ?.leaders?.[0]?.athlete?.headshot.href
                      }
                      width={100}
                      height={100}
                      priority={true}
                      alt="away team points leader"
                      className="h-[40px] w-[40px] rounded-full border object-cover"
                    />
                    <div className="flex flex-col">
                      <p className="text-xs">
                        {`${data?.gamepackageJSON?.leaders?.[0]?.leaders?.[0]?.leaders?.[0]?.athlete?.fullName} `}
                        <span className="opacity-60">{`${data?.gamepackageJSON?.leaders?.[0]?.leaders?.[0]?.leaders?.[0]?.athlete?.position?.abbreviation} - ${game?.competitors[0]?.team?.abbreviation}`}</span>
                      </p>

                      <div className="flex gap-2">
                        {data?.gamepackageJSON?.leaders?.[0]?.leaders?.[0]?.leaders?.[0]?.statistics?.map(
                          (stat: any) => (
                            <p key={v4()} className="text-xs">
                              {stat?.displayValue}
                              <span className="text-[10px] opacity-60">{` ${stat?.abbreviation}`}</span>
                            </p>
                          ),
                        ) ?? (
                          <p className="text-[11px] opacity-70">
                            {
                              data?.gamepackageJSON?.leaders?.[0]?.leaders?.[0]
                                ?.leaders?.[0].displayValue
                            }
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

            {isGameDetailsFinalized && (
              <div className="flex flex-col items-start justify-start gap-3">
                <Link
                  href={
                    isGameDetailsFinalized
                      ? `/${league.toLowerCase()}/game/${gameId}/home`
                      : ""
                  }
                >
                  <div className="dt-scorecard-button">GAMECAST</div>
                </Link>
                {typeof data.gamepackageJSON.ticketsInfo !== "undefined" && (
                  <Link
                    target="_blank"
                    href={
                      data.gamepackageJSON.ticketsInfo.seatSituation.eventLink
                    }
                  >
                    <div className="dt-scorecard-button">TICKETS</div>
                  </Link>
                )}
              </div>
            )}
          </div>
        )}
        {game.status.type.detail != "Postponed" &&
          isGameDetailsFinalized &&
          (game.status.type.state === "post" ||
            game.status.type.state === "in") && (
            <div className="flex flex-row items-center justify-between gap-2">
              <div className="flex h-full flex-col justify-start gap-2">
                <p className="text-[12px] font-[400] opacity-60">
                  TOP PERFORMERS
                </p>
                {getTopPerformersByLeague()}
              </div>

              <div className="flex flex-col gap-3">
                <Link
                  href={
                    isGameDetailsFinalized
                      ? `/${league.toLowerCase()}/game/${gameId}/home`
                      : ""
                  }
                >
                  <div className="dt-scorecard-button">GAMECAST</div>
                </Link>
                <Link
                  href={
                    isGameDetailsFinalized
                      ? `/${league.toLowerCase()}/game/${gameId}/boxscore`
                      : ""
                  }
                >
                  <div className="dt-scorecard-button">BOX SCORE</div>
                </Link>
                <Link
                  href={
                    isGameDetailsFinalized
                      ? `/${league.toLowerCase()}/game/${gameId}/playbyplay`
                      : ""
                  }
                >
                  <div className="dt-scorecard-button">PLAYBYPLAY</div>
                </Link>
              </div>
            </div>
          )}
      </div>
    </div>
  );

  if (typeof gameInfo.competitions === "undefined") {
    return null;
  }

  if (isLoading) {
    return (
      <>
        {isDesktopScreen ? (
          <div className="grid w-full grid-cols-[3fr,2fr,3fr] place-items-center px-1 py-2">
            {/* game date, network */}
            <div className="col-start-1 my-auto h-full min-w-full border-r border-[rgba(0,0,0,0.1)]">
              <div className="flex h-full w-full flex-col justify-center gap-3">
                <div className="h-[10px] w-[40px] animate-pulse bg-gray-200"></div>
                {/* away team*/}
                <div className="mb-2 flex flex-row items-center gap-2">
                  <div className="h-9 w-9 animate-pulse rounded-full bg-gray-200"></div>
                  <div className="flex w-full flex-row">
                    <div className="flex w-full flex-col gap-2">
                      <div className="h-[10px] w-[60px] animate-pulse bg-gray-200"></div>
                      <div className="h-[10px] w-[100px] animate-pulse bg-gray-200"></div>
                    </div>
                  </div>
                </div>
                <div className="mb-2 flex flex-row items-center gap-2">
                  <div className="h-9 w-9 animate-pulse rounded-full bg-gray-200"></div>
                  <div className="flex w-full flex-row">
                    <div className="flex w-full flex-col gap-2">
                      <div className="h-[10px] w-[60px] animate-pulse bg-gray-200"></div>
                      <div className="h-[10px] w-[100px] animate-pulse bg-gray-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-start-2 h-full min-h-full w-full min-w-full px-3">
              <div className="flex flex-col gap-3">
                <div className="h-[10px] w-[60px] animate-pulse bg-gray-200"></div>
                <div className="h-[10px] w-[80px] animate-pulse bg-gray-200"></div>
                <div className="mt-4 h-[10px] w-[60px] animate-pulse bg-gray-200"></div>
                <div className="h-[10px] w-[40px] animate-pulse bg-gray-200"></div>
              </div>
            </div>

            {/* IF GAME IS SCEHDULED WE SHOW PLAYERS TO WATCH */}
            <div className="col-start-3 flex h-full min-h-full min-w-full flex-col gap-3 border-l border-[rgba(0,0,0,0.1)] px-2">
              <div className="h-[10px] w-[110px] animate-pulse bg-gray-200"></div>
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-gray-200"></div>
                <div className="flex flex-col gap-2">
                  <div className="h-[10px] w-[100px] animate-pulse bg-gray-200"></div>
                  <div className="h-[10px] w-[50px] animate-pulse bg-gray-200"></div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-gray-200"></div>
                <div className="flex flex-col gap-2">
                  <div className="h-[10px] w-[100px] animate-pulse bg-gray-200"></div>
                  <div className="h-[10px] w-[50px] animate-pulse bg-gray-200"></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          mobileView()
        )}
      </>
    );
  } else return <>{isDesktopScreen ? desktopView() : mobileView()}</>;
}
