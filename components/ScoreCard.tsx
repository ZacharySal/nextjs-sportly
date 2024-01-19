"use client";

import useMediaQuery from "@mui/material/useMediaQuery";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import { v4 } from "uuid";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
export default function ScoreCard({ gameInfo, league }: { gameInfo: any; league: string }) {
  const isDesktopScreen = useMediaQuery("(min-width:800px)");

  const game = gameInfo.competitions[0];

  if (game.status.type.state !== "pre") {
    console.log(game);
  }

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

  const isGameDetailsFinalized = awayTeamName !== "TBD" && homeTeamName !== "TBD";
  const isGameScheduled = game.status.type.state === "pre";
  const isGameInProgess = game.status.type.state === "in";
  const isGameFinished = game.status.type.state === "post";
  const isGameNoteAvailable = typeof game.notes[0]?.headline !== "undefined";
  const homeTeamWon = homeTeamScore > awayTeamScore || isGameScheduled;
  const awayTeamWon = awayTeamScore > homeTeamScore || isGameScheduled;

  const channel = game?.geoBroadcasts[0]?.media?.shortName || "";
  const odds = typeof game?.odds == "undefined" ? "" : game.odds[0].details;

  const { data, isLoading } = useSWR(
    isDesktopScreen ? `https://cdn.espn.com/core/${league}/game?xhr=1&gameId=${gameId}` : null,
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
        <div className="flex flex-col justify-start gap-3">
          <div className="flex flex-row items-center gap-2">
            <Image
              src={
                data.gamepackageJSON?.leaders[1]?.leaders[0]?.leaders[0]?.athlete?.headshot?.href
              }
              width={100}
              height={100}
              priority={true}
              alt="away team points leader"
              className="w-[40px] h-[40px] border rounded-full object-cover"
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
                data?.gamepackageJSON?.leaders[0]?.leaders[0]?.leaders[0]?.athlete?.headshot?.href
              }
              width={100}
              height={100}
              priority={true}
              alt="away team points leader"
              className="w-[40px] h-[40px] border rounded-full object-cover"
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
        <div className="flex flex-col justify-start gap-3">
          <div className="flex flex-row items-center gap-2">
            <Image
              src={
                data?.gamepackageJSON?.leaders[1]?.leaders[0]?.leaders[0]?.athlete?.headshot?.href
              }
              width={100}
              height={100}
              priority={true}
              alt="away team points leader"
              className="w-[40px] h-[40px] border rounded-full object-cover"
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
                data?.gamepackageJSON?.leaders[0]?.leaders[0]?.leaders[0]?.athlete?.headshot?.href
              }
              width={100}
              height={100}
              priority={true}
              alt="away team points leader"
              className="w-[40px] h-[40px] border rounded-full object-cover"
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
        <div className="flex flex-col justify-start items-start gap-1">
          {typeof data?.gamepackageJSON?.header?.competitions[0]?.status?.featuredAthletes !==
            "undefined" && (
            <>
              {typeof data?.gamepackageJSON?.header?.competitions[0]?.status
                ?.featuredAthletes[0] !== "undefined" && (
                <div className="flex flex-row items-center gap-1">
                  <p className="text-[10px] opacity-60 w-[30px]">WIN</p>

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
                  <p className="text-[10px] opacity-60 w-[30px]">LOSS</p>

                  <Image
                    src={
                      data?.gamepackageJSON?.header?.competitions?.[0]?.status
                        ?.featuredAthletes?.[1].athlete?.headshot?.href
                    }
                    width={100}
                    height={100}
                    priority={true}
                    alt={
                      data?.gamepackageJSON?.header?.competitions[0]?.status.featuredAthletes[1]
                        .athlete?.headshot?.alt || "N/A"
                    }
                    className="w-[30px] h-[30px] border rounded-full object-cover"
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
                  <p className="text-[10px] opacity-60 w-[30px]">SAVE</p>

                  <Image
                    src={
                      data?.gamepackageJSON.header.competitions[0].status.featuredAthletes[2]
                        .athlete?.headshot?.href
                    }
                    width={100}
                    height={100}
                    priority={true}
                    alt={
                      data?.gamepackageJSON?.header?.competitions[0]?.status?.featuredAthletes[2]
                        ?.athlete?.headshot?.alt
                    }
                    className="w-[30px] h-[30px] border rounded-full object-cover"
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
        <div className="w-full flex justify-end pr-3">
          <p className="w-[20px] pl-2 flex justify-center text-[12px] opacity-70 font-[600]">1</p>
          <p className="w-[20px] pl-2 flex justify-center text-[12px] opacity-70 font-[600]">2</p>
          <p className="w-[20px] pl-2 flex justify-center text-[12px] opacity-70 font-[600]">3</p>
          <p className="w-[20px] pl-2 flex justify-center text-[12px] opacity-70 font-[600]">4</p>
          <p className="justify-end flex pr-[2px] w-[50px] text-[12px] opacity-70 font-[600]">T</p>
        </div>
      );
    } else if (league === "MLB") {
      return (
        <div className="w-full flex justify-end pr-3">
          <p className="w-[40px] pl-2 flex justify-center text-[12px] opacity-70 font-[600]">R</p>
          <p className="w-[40px] pl-2 flex justify-center text-[12px] opacity-70 font-[600]">H</p>
          <p className="w-[40px] pl-2 flex justify-center text-[12px] opacity-70 font-[600]">E</p>
        </div>
      );
    }
  };

  const getLinescoreValuesByLeague = (team: any, teamWon: boolean) => {
    if (league === "NFL" || league === "NBA") {
      return (
        <div
          style={{ opacity: isGameFinished ? (teamWon ? "0.8" : "0.4") : "0.8" }}
          className={`w-full flex justify-end items-center pr-3 ${
            isGameFinished && teamWon && "dt-team-won"
          }`}
        >
          <p className="w-[20px] pl-2 flex justify-center text-[12px]">
            {team.linescores?.[0]?.displayValue || "-"}
          </p>
          <p className="w-[20px] pl-2 flex justify-center text-[12px]">
            {team.linescores?.[1]?.displayValue || "-"}
          </p>
          <p className="w-[20px] pl-2 flex justify-center text-[12px]">
            {team.linescores?.[2]?.displayValue || "-"}
          </p>
          <p className="w-[20px] pl-2 flex justify-center text-[12px]">
            {team.linescores?.[3]?.displayValue || "-"}
          </p>
          <p
            style={{ transition: "all 0.5s ease-in" }}
            className="justify-end flex pl-[1rem] w-[50px] font-bold text-xl"
          >
            {team?.score || "-"}
          </p>
        </div>
      );
    } else if (league === "MLB") {
      return (
        <div
          style={{ opacity: teamWon ? "0.8" : "0.4" }}
          className={`w-full flex justify-end items-center pr-3 ${teamWon && "dt-team-won"}`}
        >
          <p className="w-[40px] pl-2 flex justify-center font-semibold text-[16px]">
            {team?.score || "-"}
          </p>
          <p className="w-[40px] pl-2 flex justify-center font-semibold text-[16px]">
            {team?.hits || "-"}
          </p>
          <p className="w-[40px] pl-2 flex justify-center font-semibold text-[16px]">
            {team?.errors || "0"}
          </p>
        </div>
      );
    }
  };

  const mobileView = () => (
    <Link href={isGameDetailsFinalized ? `/${league.toLowerCase()}/game/${gameId}/home` : ""}>
      <div className="w-full grid grid-cols-[1fr_25%] gap-3 py-2">
        {/* 1ST COLUMN: GAME INFO */}
        <div className="w-full grid grid-cols-[1fr_auto] items-center grid-rows-[1fr_1fr] score-cell relative">
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
            } text-[14px] text-end font-semibold md:text-base md:font-bold`}
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
              className="text-[14px] md:text-base font-semibold tracking-wide"
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
            } text-[14px] text-end font-semibold md:text-base md:font-bold`}
          >
            {getScoreOrRecord(0)}
          </p>
        </div>

        {isGameFinished || isGameInProgess ? (
          <p
            style={{ color: isGameFinished ? "black" : "#d50a0a" }}
            className="flex w-full justify-start items-center text-xs opacity-80 font-semibold"
          >
            {game.status.type.shortDetail}
          </p>
        ) : (
          <div className="flex w-full justify-start items-center">
            <div className="flex flex-col">
              <p className="text-xs opacity-90 font-semibold">{gameTime}</p>
              <p className="text-xs opacity-70">{channel}</p>
              <p className="text-xs opacity-70">{odds}</p>
            </div>
          </div>
        )}
      </div>
    </Link>
  );

  const desktopView = () => (
    <div className="w-full grid grid-cols-[3fr,2fr,3fr] px-1 py-2 place-items-center">
      {/* game date, network */}
      <div className="min-w-full h-full my-auto col-start-1 border-r border-[rgba(0,0,0,0.1)]">
        <div className="w-full h-full justify-center flex flex-col gap-[1px] ">
          <div className="w-full flex items-center">
            <p
              style={{
                color: isGameInProgess ? "#d50a0a" : "black",
                opacity: isGameInProgess ? "0.9" : "0.7",
              }}
              className="whitespace-nowrap text-[12px] mb-1 font-[600] uppercase"
            >
              {game.status.type.state !== "pre" ? game.status.type.shortDetail : gameTime}
            </p>
            {(game.status.type.state === "in" || game.status.type.state === "post") &&
              game.status.type.detail != "Postponed" &&
              getLinescoreHeaderByLeague()}
          </div>
          {/* away team*/}
          <Link
            href={`/${league.toLowerCase()}/team/${game.competitors[1].team.id}/home`}
            className="flex flex-row gap-2 items-center mb-2 relative"
          >
            <Image
              src={game.competitors[1].team.logo ?? "/default.png"}
              width={500}
              height={500}
              priority={true}
              alt="home team logo"
              className="w-9 object-cover"
            />
            <div className="w-full flex flex-row">
              <div className="flex flex-col w-full">
                <p
                  style={{ opacity: awayTeamWon ? "0.8" : "0.4" }}
                  className="text-[14px] font-semibold whitespace-nowrap"
                >
                  {awayTeamName}
                </p>
                {typeof game.competitors[1].records !== "undefined" && (
                  <p className="text-xs opacity-60 wihtespace-nowrap capitalize">{`(${
                    game.competitors[1].records[0].summary
                  }, ${data["__gamepackage__"].awayTeam?.record[1]?.displayValue || ""} ${
                    data["__gamepackage__"].awayTeam?.record[1]?.type || ""
                  })`}</p>
                )}
              </div>
              {(game.status.type.state !== "pre" || game.status.type.state === "post") &&
                game.status.type.detail != "Postponed" && (
                  <>{getLinescoreValuesByLeague(data["__gamepackage__"].awayTeam, awayTeamWon)}</>
                )}
            </div>
          </Link>
          <Link
            href={`/${league.toLowerCase()}/team/${game.competitors[0].team.id}/home`}
            className="flex flex-row gap-2 items-center relative"
          >
            <Image
              src={game.competitors[0].team.logo ?? "/default.png"}
              width={500}
              height={500}
              priority={true}
              alt="home team logo"
              className="w-9 object-cover"
            />
            <div className="w-full flex flex-row">
              <div className="w-full flex flex-col">
                <p
                  style={{ opacity: homeTeamWon ? "0.8" : "0.4" }}
                  className="text-[14px] font-semibold"
                >
                  {homeTeamName}
                </p>
                {typeof game.competitors[0].records !== "undefined" && (
                  <p className="text-xs opacity-60 wihtespace-nowrap capitalize">{`(${
                    game.competitors[0].records[0].summary
                  }, ${data["__gamepackage__"].homeTeam?.record[1]?.displayValue || ""} ${
                    data["__gamepackage__"].homeTeam?.record[1]?.type || ""
                  })`}</p>
                )}
              </div>
              {(game.status.type.state !== "pre" || game.status.type.state === "post") &&
                game.status.type.detail != "Postponed" && (
                  <>{getLinescoreValuesByLeague(data["__gamepackage__"].homeTeam, homeTeamWon)}</>
                )}
            </div>
          </Link>
        </div>
      </div>

      <div className="min-w-full h-full w-full min-h-full col-start-2 px-3">
        {/* IF GAME IS SCHEDULED WE SHOW VENUE INFO AND TICKETS */}
        {isGameScheduled && isGameDetailsFinalized && (
          <div className="h-full flex flex-col justify-evenly gap-2">
            <div className="">
              <p className="text-[11px] opacity-70 font-[600]">{`${
                game?.venue?.fullName ?? ""
              }`}</p>
              <p className="text-[11px] opacity-60]">{`${game?.venue?.address.city ?? ""}, ${
                game?.venue?.address.state ?? ""
              }`}</p>
            </div>

            {typeof data.gamepackageJSON.ticketsInfo !== "undefined" && (
              <div className="border-b border-t border-[rgba(0,0,0,0.1)] py-2">
                <Link
                  target="_blank"
                  href={data.gamepackageJSON.ticketsInfo["seatSituation"].eventLink}
                >
                  <div className="flex flex-row items-center gap-1">
                    <Image src="/icons/credit-card.svg" width="20" height="20" alt="right icon" />
                    <p className="text-[12px] opacity-60] anchor-link">
                      {data.gamepackageJSON.ticketsInfo["seatSituation"].summary}
                    </p>
                  </div>
                </Link>
              </div>
            )}

            <div>{odds && <p className="text-[11px] opacity-60]">{`Line: ${odds}`}</p>}</div>
          </div>
        )}
        {/* IF GAME IS IN PROGRESS OR FINISHED WE SHOW A VIDEO OR ARTICLE */}
        {(isGameFinished || isGameInProgess) && (
          <>
            {data["gamepackageJSON"]["videos"].length > 0 && (
              <div className="w-full h-full relative cursor-pointer article-video-container overflow-hidden">
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
                  <div className="gray-circle sm-circle"></div>
                </Link>
                <div className="arrow sm-arrow"></div>
                <p className="text-over-video">
                  {data["gamepackageJSON"]["videos"][0].description.substring(0, 60)}
                  {data["gamepackageJSON"]["videos"][0].description.length > 60 && "..."}
                </p>
              </div>
            )}
            {data["gamepackageJSON"]["videos"].length === 0 &&
              typeof data.gamepackageJSON.article !== "undefined" && (
                <Link target="_blank" href={data.gamepackageJSON.article.links.web.href}>
                  <p className="text-[12px] font-semibold opacity-80 mb-2">
                    {data.gamepackageJSON.article.headline}
                  </p>
                  <p className="text-xs opacity-70 overflow-hidden">
                    {data.gamepackageJSON.article.description.substring(0, 80)}
                    {data.gamepackageJSON.article.description.length > 80 && "..."}
                  </p>
                </Link>
              )}
            {data["gamepackageJSON"]["videos"].length === 0 &&
              typeof data.gamepackageJSON.article === "undefined" && (
                <div className="">
                  <p className="text-[11px] opacity-70 font-[600]">{`${game.venue.fullName}`}</p>
                  <p className="text-[11px] opacity-60]">{`${game.venue.address.city}, ${
                    game.venue.address?.state || ""
                  }`}</p>
                </div>
              )}
          </>
        )}
      </div>

      {/* IF GAME IS SCEHDULED WE SHOW PLAYERS TO WATCH */}
      <div className="min-w-full min-h-full h-full flex flex-col gap-1 col-start-3 border-l border-[rgba(0,0,0,0.1)] px-2">
        {game.status.type.state === "pre" && (
          <div className="h-full flex flex-row gap-2 justify-between items-center">
            {typeof game.competitors[1].leaders !== "undefined" &&
              typeof game.competitors[0].leaders !== "undefined" && (
                <div className="h-full flex flex-col justify-start gap-1">
                  <p className="text-[12px] opacity-60">PLAYERS TO WATCH</p>
                  {/* away team point leader */}
                  <div className="flex flex-row items-center gap-2">
                    <Image
                      src={
                        data?.gamepackageJSON?.leaders?.[1].leaders?.[0].leaders?.[0]?.athlete
                          ?.headshot.href
                      }
                      width={100}
                      height={100}
                      priority={true}
                      alt="away team points leader"
                      className="w-[40px] h-[40px] border rounded-full object-cover"
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
                          )
                        ) ?? (
                          <p className="text-[11px] opacity-70">
                            {
                              data?.gamepackageJSON?.leaders?.[1].leaders?.[0].leaders?.[0]
                                .displayValue
                            }
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <Image
                      src={
                        data?.gamepackageJSON?.leaders?.[0].leaders?.[0].leaders?.[0]?.athlete
                          ?.headshot.href
                      }
                      width={100}
                      height={100}
                      priority={true}
                      alt="away team points leader"
                      className="w-[40px] h-[40px] border rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <p className="text-xs">
                        {`${data?.gamepackageJSON?.leaders?.[0].leaders?.[0]?.leaders?.[0]?.athlete?.fullName} `}
                        <span className="opacity-60">{`${data?.gamepackageJSON?.leaders?.[0]?.leaders?.[0].leaders?.[0]?.athlete?.position?.abbreviation} - ${game?.competitors[0]?.team?.abbreviation}`}</span>
                      </p>

                      <div className="flex gap-2">
                        {data?.gamepackageJSON?.leaders?.[0].leaders?.[0].leaders?.[0].statistics?.map(
                          (stat: any) => (
                            <p key={v4()} className="text-xs">
                              {stat.displayValue}
                              <span className="text-[10px] opacity-60">{` ${stat.abbreviation}`}</span>
                            </p>
                          )
                        ) ?? (
                          <p className="text-[11px] opacity-70">
                            {
                              data?.gamepackageJSON?.leaders?.[0].leaders?.[0].leaders?.[0]
                                .displayValue
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
                    isGameDetailsFinalized ? `/${league.toLowerCase()}/game/${gameId}/home` : ""
                  }
                >
                  <div className="dt-scorecard-button">GAMECAST</div>
                </Link>
                {typeof data.gamepackageJSON.ticketsInfo !== "undefined" && (
                  <Link
                    target="_blank"
                    href={data.gamepackageJSON.ticketsInfo.seatSituation.eventLink}
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
          (game.status.type.state === "post" || game.status.type.state === "in") && (
            <div className="flex flex-row gap-2 justify-between items-center">
              <div className="h-full flex gap-2 flex-col justify-start">
                <p className="text-[12px] opacity-60">TOP PERFORMERS</p>
                {getTopPerformersByLeague()}
              </div>

              <div className="flex flex-col gap-3">
                <Link
                  href={
                    isGameDetailsFinalized ? `/${league.toLowerCase()}/game/${gameId}/home` : ""
                  }
                >
                  <div className="dt-scorecard-button">GAMECAST</div>
                </Link>
                <Link
                  href={
                    isGameDetailsFinalized ? `/${league.toLowerCase()}/game/${gameId}/boxscore` : ""
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
          <div className="w-full grid grid-cols-[3fr,2fr,3fr] px-1 py-2 place-items-center">
            {/* game date, network */}
            <div className="min-w-full h-full my-auto col-start-1 border-r border-[rgba(0,0,0,0.1)]">
              <div className="w-full h-full justify-center flex flex-col gap-3">
                <div className="w-[40px] h-[10px] bg-gray-200 animate-pulse"></div>
                {/* away team*/}
                <div className="flex flex-row gap-2 items-center mb-2">
                  <div className="w-9 h-9 rounded-full bg-gray-200 animate-pulse"></div>
                  <div className="w-full flex flex-row">
                    <div className="flex flex-col w-full gap-2">
                      <div className="w-[60px] h-[10px] bg-gray-200 animate-pulse"></div>
                      <div className="w-[100px] h-[10px] bg-gray-200 animate-pulse"></div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row gap-2 items-center mb-2">
                  <div className="w-9 h-9 rounded-full bg-gray-200 animate-pulse"></div>
                  <div className="w-full flex flex-row">
                    <div className="flex flex-col w-full gap-2">
                      <div className="w-[60px] h-[10px] bg-gray-200 animate-pulse"></div>
                      <div className="w-[100px] h-[10px] bg-gray-200 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="min-w-full h-full w-full min-h-full col-start-2 px-3">
              <div className="flex flex-col gap-3">
                <div className="w-[60px] h-[10px] bg-gray-200 animate-pulse"></div>
                <div className="w-[80px] h-[10px] bg-gray-200 animate-pulse"></div>
                <div className="w-[60px] h-[10px] bg-gray-200 animate-pulse mt-4"></div>
                <div className="w-[40px] h-[10px] bg-gray-200 animate-pulse"></div>
              </div>
            </div>

            {/* IF GAME IS SCEHDULED WE SHOW PLAYERS TO WATCH */}
            <div className="min-w-full min-h-full h-full flex flex-col gap-3 col-start-3 border-l border-[rgba(0,0,0,0.1)] px-2">
              <div className="w-[110px] h-[10px] bg-gray-200 animate-pulse"></div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gray-200"></div>
                <div className="flex flex-col gap-2">
                  <div className="w-[100px] h-[10px] bg-gray-200 animate-pulse"></div>
                  <div className="w-[50px] h-[10px] bg-gray-200 animate-pulse"></div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gray-200"></div>
                <div className="flex flex-col gap-2">
                  <div className="w-[100px] h-[10px] bg-gray-200 animate-pulse"></div>
                  <div className="w-[50px] h-[10px] bg-gray-200 animate-pulse"></div>
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
