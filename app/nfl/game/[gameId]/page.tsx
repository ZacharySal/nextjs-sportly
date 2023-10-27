"use client";

import { Box, Typography, useMediaQuery, Divider } from "@mui/material";
import Image from "next/image";
import ContainerBox from "@/app/_components/ContainerBox";
import GameHeader from "@/app/_components/GameHeader";
import Articles from "@/app/_components/Articles";
import useSwr from "swr";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import React from "react";
import StadiumInfo from "@/app/_components/StadiumInfo";
import NFLBoxscore from "@/app/_components/NFL/NFLBoxscore";
import DivisionStandings from "@/app/_components/DivisionStandings";
import NFLScoringPlays from "@/app/_components/NFL/NFLScoringPlays";
import GameUserSelection from "@/app/_components/GameUserSelection";
import Loading from "@/app/_components/Loading";
import NFLGameStats from "@/app/_components/NFL/NFLGameStats";
import NFLPlayByPlay from "@/app/_components/NFL/NFLPlayByPlay";
import MatchupPredictor from "@/app/_components/MatchupPredictor";
import GameRecapArticle from "@/app/_components/GameRecapArticle";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function convertDate(date: string) {
  return new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function TeamPage({ params }: { params: { gameId: string } }) {
  const { data, isLoading } = useSwr(
    `https://nextjs-sportly.vercel.app/api/nfl/gameData/${params.gameId}`,
    fetcher
  );

  if (!isLoading) {
    console.log(data);
  }

  const [userSelection, setUserSelection] = useState("gamecast");
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  function gameLeaders() {
    return (
      <Box className="w-full bg-white rounded-xl p-3">
        <Typography className="text-sm opacity-70 font-semibold text-start mb-1">
          {data.isGameStarted ? "Game Leaders" : "Season Leaders"}
        </Typography>

        <Box className="grid grid-rows-[auto,auto,auto,auto,auto,auto] grid-cols-2 gap-x-2 gap-y-0 items-center justify-between">
          <Box className="w-full col-span-2">
            <Divider className="mt-2" />
            <Typography className="text-sm text-center opacity-70 mb-[-0.5rem] my-2">
              Passing Yards
            </Typography>
          </Box>
          {/* AWAY TEAM PASSING LEADER */}
          <Box className="grid place-items-end justify-center gap-x-2 gap-y-0 grid-cols-[1fr, 3fr] grid-rows-2 justify-between relative my-2">
            <Box className="flex col-start-1 flex-col row-span-2 justify-center items-center gap-1 player-divider">
              <Image
                src={
                  data.gameData.leaders[1].leaders[0].leaders[0].athlete
                    .headshot.href
                }
                width={100}
                height={100}
                alt="player"
                className="w-12 h-12 md:w-[35px] md:h-[35px] border rounded-full object-cover"
              />
              <Typography className="text-xs opacity-80">
                {data.gameData.leaders[1].team.abbreviation}
              </Typography>
            </Box>
            <Typography className="col-start-2 row-start-1 text-end text-xs opacity-80 font-bold pr-2">
              {data.gameData.leaders[1].leaders[0].leaders[0].athlete.shortName}
            </Typography>
            <Typography className="col-start-2 row-start-2 flex h-full text-end text-[10px] opacity-70 pr-2">
              {data.gameData.leaders[1].leaders[0].leaders[0].displayValue}
            </Typography>
          </Box>

          {/* HOME TEAM PASSING LEADER */}
          <Box className="grid items-end gap-x-2 gap-y-0 grid-cols-[1fr, 3fr] grid-rows-2 justify-between">
            <Box className="flex col-start-2 flex-col row-span-2 justify-center items-center gap-1">
              <Image
                src={
                  data.gameData.leaders[0].leaders[0].leaders[0].athlete
                    .headshot.href
                }
                width={100}
                height={100}
                alt="player"
                className="w-12 h-12 md:w-[35px] md:h-[35px] border rounded-full object-cover"
              />
              <Typography className="text-xs opacity-80">
                {data.gameData.leaders[0].team.abbreviation}
              </Typography>
            </Box>

            <Typography className="col-start-1 row-start-1 w-full text-start text-xs opacity-80 font-bold pl-2">
              {data.gameData.leaders[0].leaders[0].leaders[0].athlete.shortName}
            </Typography>
            <Typography className="col-start-1 row-start-2 flex h-full text-start text-[10px] opacity-70 pl-2">
              {data.gameData.leaders[0].leaders[0].leaders[0].displayValue}
            </Typography>
          </Box>

          <Box className="w-full col-span-2">
            <Divider className="mt-2" />
            <Typography className="text-sm text-center opacity-70 mb-[-0.5rem] my-2">
              Rushing Yards
            </Typography>
          </Box>

          {/* AWAY TEAM RUSHING LEADER */}
          <Box className="grid place-items-end gap-x-2 gap-y-0 grid-cols-[1fr, 3fr] grid-rows-2 justify-between relative">
            <Box className="flex col-start-1 flex-col row-span-2 justify-center items-center gap-1 player-divider">
              <Image
                src={
                  data.gameData.leaders[1].leaders[1].leaders[0].athlete
                    .headshot.href
                }
                width={100}
                height={100}
                alt="player"
                className="w-12 h-12 md:w-[35px] md:h-[35px] border rounded-full object-cover"
              />
              <Typography className="text-xs opacity-80">
                {data.gameData.leaders[1].team.abbreviation}
              </Typography>
            </Box>
            <Typography className="col-start-2 row-start-1 truncate text-end text-xs opacity-80 font-bold pr-2">
              {data.gameData.leaders[1].leaders[1].leaders[0].athlete.shortName}
            </Typography>
            <Typography className="col-start-2 row-start-2 flex h-full text-end text-[10px] opacity-70 pr-2">
              {data.gameData.leaders[1].leaders[1].leaders[0].displayValue}
            </Typography>
          </Box>

          {/* HOME TEAM RUSHING LEADER */}
          <Box className="grid items-end gap-x-2 gap-y-0 grid-cols-[1fr, 3fr] grid-rows-2 justify-between my-2">
            <Box className="flex col-start-2 flex-col row-span-2 justify-center items-center gap-1">
              <Image
                src={
                  data.gameData.leaders[0].leaders[1].leaders[0].athlete
                    .headshot.href
                }
                width={100}
                height={100}
                alt="player"
                className="w-12 h-12 md:w-[35px] md:h-[35px] border rounded-full object-cover"
              />
              <Typography className="text-xs opacity-80">
                {data.gameData.leaders[0].team.abbreviation}
              </Typography>
            </Box>

            <Typography className="col-start-1 row-start-1 w-full text-start text-xs opacity-80 font-bold pl-2">
              {data.gameData.leaders[0].leaders[1].leaders[0].athlete.shortName}
            </Typography>
            <Typography className="col-start-1 row-start-2 flex h-full text-start text-[10px] opacity-70 pl-2">
              {data.gameData.leaders[0].leaders[1].leaders[0].displayValue}
            </Typography>
          </Box>

          <Box className="w-full col-span-2">
            <Divider className="mt-2" />
            <Typography className="text-sm text-center opacity-70 mb-[-0.5rem] my-2">
              Recieving Yards
            </Typography>
          </Box>

          {/* AWAY TEAM RECIEVING LEADER */}
          <Box className="grid place-items-end gap-x-2 gap-y-0 grid-cols-[1fr, 3fr] grid-rows-2 justify-between my-2 relative">
            <Box className="flex col-start-1 flex-col row-span-2 justify-center items-center gap-1 player-divider">
              <Image
                src={
                  data.gameData.leaders[1].leaders[2].leaders[0].athlete
                    .headshot.href
                }
                width={100}
                height={100}
                alt="player"
                className="w-12 h-12 md:w-[35px] md:h-[35px] border rounded-full object-cover"
              />
              <Typography className="text-xs opacity-80">
                {data.gameData.leaders[1].team.abbreviation}
              </Typography>
            </Box>
            <Typography className="col-start-2 row-start-1 text-end text-xs opacity-80 font-bold pr-2">
              {data.gameData.leaders[1].leaders[2].leaders[0].athlete.shortName}
            </Typography>
            <Typography className="col-start-2 row-start-2 flex h-full text-end text-[10px] opacity-70 pr-2">
              {data.gameData.leaders[1].leaders[2].leaders[0].displayValue}
            </Typography>
          </Box>

          {/* HOME TEAM RECIEVING LEADER */}
          <Box className="grid items-end gap-x-2 gap-y-0 grid-cols-[1fr, 3fr] grid-rows-2 justify-between">
            <Box className="flex col-start-2 flex-col row-span-2 justify-center items-center gap-1">
              <Image
                src={
                  data.gameData.leaders[0].leaders[2].leaders[0].athlete
                    .headshot.href
                }
                width={100}
                height={100}
                alt="player"
                className="w-12 h-12 md:w-[35px] md:h-[35px] border rounded-full object-cover"
              />
              <Typography className="text-xs opacity-80">
                {data.gameData.leaders[0].team.abbreviation}
              </Typography>
            </Box>

            <Typography className="col-start-1 row-start-1 w-full text-start text-xs opacity-80 font-bold pl-2">
              {data.gameData.leaders[0].leaders[2].leaders[0].athlete.shortName}
            </Typography>
            <Typography className="col-start-1 row-start-2 flex h-full text-start text-[10px] opacity-70 pl-2">
              {data.gameData.leaders[0].leaders[2].leaders[0].displayValue}
            </Typography>
          </Box>
        </Box>
        <Divider className="my-2" />
        <Typography
          onClick={() => setUserSelection("boxscore")}
          className="text-center w-full h-full text-xs text-[#06c] cursor-pointer py-1 font-semibold"
        >
          Full Box Score
        </Typography>
      </Box>
    );
  }

  function teamStats() {
    return (
      <>
        <Box className="w-full flex flex-col gap-2 mb-5">
          <Box className="flex flex-row gap-1 justify-start items-center">
            <Image
              src={`/nfl/${data.gameData.header.competitions[0].competitors[0].team.name.toLowerCase()}.png`}
              width={100}
              height={100}
              alt="team logo"
              className="w-8 object-contain"
            />
            <Typography className="opacity-70 font-semibold">
              {data.homeTeam.team.name} Stats
            </Typography>
          </Box>
          <Box className="grid grid-cols-3 gap-1">
            {Object.entries(data.awayTeamStats).map(
              ([statName, value]: [string, any]) => (
                <React.Fragment key={uuidv4()}>
                  <Box className="w-auto flex justify-center items-center flex-row p-3 bg-white gap-1 drop-shadow-md">
                    <Box className="flex flex-col justify-center gap-2 items-center">
                      <Typography className="text-sm">{statName}</Typography>
                      <Typography className="font-semibold text-3xl">
                        {value.displayValue}
                      </Typography>
                      <Typography className="text-base opacity-70">
                        {value.rankDisplayValue}
                      </Typography>
                    </Box>
                  </Box>
                </React.Fragment>
              )
            )}
          </Box>
        </Box>
        <Box className="w-full flex flex-col gap-2">
          <Box className="flex flex-row gap-1 justify-start items-center">
            <Image
              src={`/nfl/${data.gameData.header.competitions[0].competitors[1].team.name
                .replace(" ", "")
                .toLowerCase()}.png`}
              width={100}
              height={100}
              alt="team logo"
              className="w-8 object-contain"
            />
            <Typography className="opacity-70 font-semibold">
              {data.awayTeam.team.name} Stats
            </Typography>
          </Box>
          <Box className="grid grid-cols-3 gap-1">
            {Object.entries(data.homeTeamStats).map(
              ([statName, value]: [string, any]) => (
                <React.Fragment key={uuidv4()}>
                  <Box className="w-auto flex justify-center items-center flex-row p-3 bg-white gap-1 drop-shadow-md">
                    <Box className="flex flex-col justify-center gap-2 items-center">
                      <Typography className="text-sm">{statName}</Typography>
                      <Typography className="font-semibold text-3xl">
                        {value.displayValue}
                      </Typography>
                      <Typography className="text-base opacity-70">
                        {value.rankDisplayValue}
                      </Typography>
                    </Box>
                  </Box>
                </React.Fragment>
              )
            )}
          </Box>
        </Box>
      </>
    );
  }

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <>
        {isDesktopScreen ? (
          <>
            <GameHeader
              backgroundColor={data.backgroundColor}
              homeTeam={data.homeTeam}
              awayTeam={data.awayTeam}
              winningTeam={data.winningTeam}
              gameInfo={data.gameInfo}
              league="nfl"
              isGameStarted={data.isGameStarted}
              isDesktopScreen={isDesktopScreen}
            />
            <GameUserSelection
              userSelection={userSelection}
              setUserSelection={setUserSelection}
              isDesktopScreen={isDesktopScreen}
              data={data}
            />

            <ContainerBox isDesktopScreen={isDesktopScreen}>
              <Box className="flex self-start flex-col justify-center items-center gap-3">
                {data.gameData.leaders[0].leaders.length > 0 &&
                  data.gameData.leaders[1].leaders.length > 0 &&
                  gameLeaders()}
                <StadiumInfo data={data} />
              </Box>

              {userSelection === "boxscore" && (
                <NFLGameStats data={data} league="nfl" />
              )}

              {userSelection === "gamecast" && data.isGameStarted && (
                <Box className="flex flex-col gap-5">
                  <GameRecapArticle data={data} />
                  <NFLBoxscore data={data} />
                  <NFLScoringPlays data={data} />
                </Box>
              )}

              {userSelection === "playbyplay" && <NFLPlayByPlay data={data} />}

              <Box className="flex self-start flex-col justify-center items-center gap-3">
                <DivisionStandings data={data} isNFL={true} league="nfl" />
                <Articles
                  title="NFL News"
                  teamNews={data.gameData.news}
                  limit={6}
                />
              </Box>
            </ContainerBox>
          </>
        ) : (
          <>
            <GameHeader
              backgroundColor={"#013369"}
              homeTeam={data.homeTeam}
              awayTeam={data.awayTeam}
              winningTeam={data.winningTeam}
              gameInfo={data.gameInfo}
              league="nfl"
              isGameStarted={data.isGameStarted}
              isDesktopScreen={isDesktopScreen}
            />

            <GameUserSelection
              userSelection={userSelection}
              setUserSelection={setUserSelection}
              isDesktopScreen={isDesktopScreen}
              data={data}
            />
            <ContainerBox isDesktopScreen={isDesktopScreen}>
              {userSelection === "gamecast" && (
                <>
                  <Box className="w-full flex flex-col justify-center items-center gap-3">
                    {data.isGameStarted ? (
                      <>
                        <NFLBoxscore data={data} />
                        {data.gameData.leaders[0].leaders.length > 0 &&
                          data.gameData.leaders[1].leaders.length > 0 &&
                          gameLeaders()}
                        <NFLScoringPlays data={data} />
                        {data.gameData.predictor && (
                          <MatchupPredictor data={data} league={"nfl"} />
                        )}
                      </>
                    ) : (
                      <>
                        {data.gameData.predictor && (
                          <MatchupPredictor data={data} league={"nfl"} />
                        )}
                        {data.gameData.leaders[0].leaders.length > 0 &&
                          data.gameData.leaders[1].leaders.length > 0 &&
                          gameLeaders()}
                      </>
                    )}
                    <DivisionStandings data={data} isNFL={true} league="nfl" />
                    <StadiumInfo data={data} />
                  </Box>
                </>
              )}

              {/* {userSelection === "stats" && teamStats()} */}

              {userSelection === "boxscore" && (
                <NFLGameStats data={data} league="nfl" />
              )}

              {userSelection === "playbyplay" && <NFLPlayByPlay data={data} />}

              {userSelection === "news" && (
                <>
                  <Articles
                    title="NFL News"
                    teamNews={data.gameData.news}
                    limit={6}
                  />
                </>
              )}
            </ContainerBox>
          </>
        )}
      </>
    );
  }
}
