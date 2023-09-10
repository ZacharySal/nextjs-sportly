"use client";

import { Box, Typography, backdropClasses, useMediaQuery } from "@mui/material";
import Image from "next/image";
import ContainerBox from "@/app/_components/ContainerBox";
import GameHeader from "@/app/_components/GameHeader";
import Articles from "@/app/_components/Articles";
import useSwr from "swr";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import React from "react";
import StadiumInfo from "@/app/_components/StadiumInfo";
import NFLBoxscore from "@/app/_components/NFLBoxscore";
import DivisionStandings from "@/app/_components/DivisionStandings";
import NFLGameDrives from "@/app/_components/NFLGameDrives";
import NFLScoringPlays from "@/app/_components/NFLScoringPlays";
import GameUserSelection from "@/app/_components/GameUserSelection";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function TeamPage({ params }: { params: { gameId: string } }) {
  console.log(params.gameId);
  const { data, isLoading } = useSwr(`http://localhost:3000/api/nfl/gameData/${params.gameId}`, fetcher);

  const [userSelection, setUserSelection] = useState("gameInfo");
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  function gameLeaders() {
    return (
      <Box className="w-full bg-white rounded-xl drop-shadow-md p-3">
        <Typography className="text-sm opacity-70 font-semibold text-start">Game Leaders</Typography>

        <Box className="grid grid-cols-2 grid-rows-[0.25rem, 1rem, 0.25rem, 1rem, 0.25rem, 1rem] gap-x-2 gap-y-0">
          <Typography className="text-sm col-span-2 text-center opacity-70 mb-[-0.5rem]">Passing Yards</Typography>

          {/* HOME TEAM PASSING LEADER */}
          <Box className="flex flex-row justify-between items-center">
            <Box className="flex flex-col justify-center items-center gap-1">
              <Image
                src={data.gameData.leaders[0].leaders[0].leaders[0].athlete.headshot.href}
                width={100}
                height={100}
                alt="player"
                className="w-10 h-10 md:w-[30px] md:h-[30px] border rounded-full object-cover"
              />
              <Typography className="text-xs opacity-80">{data.gameData.leaders[0].team.abbreviation}</Typography>
            </Box>
            <Box className="flex flex-col items-end">
              <Typography className="max-w-[6rem] truncate text-sm opacity-80 font-bold">
                {data.gameData.leaders[0].leaders[0].leaders[0].athlete.shortName}
              </Typography>
              <Typography className="max-w-[6rem] text-[10px] opacity-90 word truncate">
                {data.gameData.leaders[0].leaders[0].leaders[0].displayValue}
              </Typography>
            </Box>
          </Box>

          {/* AWAY TEAM PASSING LEADER */}
          <Box className="flex flex-row justify-between items-center">
            <Box className="flex flex-col items-start">
              <Typography className=" max-w-[6rem] truncate text-sm opacity-80 font-bold">
                {data.gameData.leaders[1].leaders[0].leaders[0].athlete.shortName}
              </Typography>
              <Typography className=" max-w-[6rem] text-[10px] opacity-90 word truncate">
                {data.gameData.leaders[1].leaders[0].leaders[0].displayValue}
              </Typography>
            </Box>
            <Box className="flex flex-col justify-center items-center gap-1">
              <Image
                src={data.gameData.leaders[1].leaders[0].leaders[0].athlete.headshot.href}
                width={100}
                height={100}
                alt="player"
                className="w-10 h-10 md:w-[30px] md:h-[30px] border rounded-full object-cover"
              />
              <Typography className="text-xs opacity-80">{data.gameData.leaders[1].team.abbreviation}</Typography>
            </Box>
          </Box>

          <Typography className="text-sm col-span-2 text-center opacity-70 mb-[-0.5rem]">Rushing Yards</Typography>

          {/* HOME TEAM RUSHING LEADER */}
          <Box className="flex flex-row justify-between items-center">
            <Box className="flex flex-col justify-center items-center gap-1">
              <Image
                src={data.gameData.leaders[0].leaders[1].leaders[0].athlete.headshot.href}
                width={100}
                height={100}
                alt="player"
                className="w-10 h-10 md:w-[30px] md:h-[30px] border rounded-full object-cover"
              />
              <Typography className="text-xs opacity-80">{data.gameData.leaders[0].team.abbreviation}</Typography>
            </Box>
            <Box className="flex flex-col items-end">
              <Typography className="max-w-[6rem] truncate text-sm opacity-80 font-bold">
                {data.gameData.leaders[0].leaders[1].leaders[0].athlete.shortName}
              </Typography>
              <Typography className=" max-w-[6rem] text-[10px] opacity-90 word truncate">
                {data.gameData.leaders[0].leaders[1].leaders[0].displayValue}
              </Typography>
            </Box>
          </Box>

          {/* AWAY TEAM RUSHING LEADER */}
          <Box className="flex flex-row justify-between items-center">
            <Box className="flex flex-col items-start">
              <Typography className="max-w-[6rem] truncate text-sm opacity-80 font-bold">
                {data.gameData.leaders[1].leaders[1].leaders[0].athlete.shortName}
              </Typography>
              <Typography className=" max-w-[6rem] text-[10px] opacity-90 word truncate">
                {data.gameData.leaders[1].leaders[1].leaders[0].displayValue}
              </Typography>
            </Box>
            <Box className="flex flex-col justify-center items-center gap-1">
              <Image
                src={data.gameData.leaders[1].leaders[1].leaders[0].athlete.headshot.href}
                width={100}
                height={100}
                alt="player"
                className="w-10 h-10 md:w-[30px] md:h-[30px] border rounded-full object-cover"
              />
              <Typography className="text-xs opacity-80">{data.gameData.leaders[1].team.abbreviation}</Typography>
            </Box>
          </Box>
          <Typography className="text-sm col-span-2 text-center opacity-70 mb-[-0.5rem]">Recieving Yards</Typography>
          {/* HOME TEAM RECIEVING */}
          <Box className="flex flex-row justify-between items-center">
            <Box className="flex flex-col justify-center items-center gap-1">
              <Image
                src={data.gameData.leaders[0].leaders[2].leaders[0].athlete.headshot.href}
                width={100}
                height={100}
                alt="player"
                className="w-10 h-10 md:w-[30px] md:h-[30px] border rounded-full object-cover"
              />
              <Typography className="text-xs opacity-80">{data.gameData.leaders[0].team.abbreviation}</Typography>
            </Box>
            <Box className="flex flex-col items-end">
              <Typography className="max-w-[6rem] truncate text-sm opacity-80 font-bold">
                {data.gameData.leaders[0].leaders[2].leaders[0].athlete.shortName}
              </Typography>
              <Typography className=" max-w-[6rem] text-[10px] opacity-90 word truncate">
                {data.gameData.leaders[0].leaders[2].leaders[0].displayValue}
              </Typography>
            </Box>
          </Box>

          {/* AWAY TEAM RECIEVING LEADER */}
          <Box className="flex flex-row justify-between items-center">
            <Box className="flex flex-col items-start">
              <Typography className="text-sm opacity-80 font-bold">
                {data.gameData.leaders[1].leaders[2].leaders[0].athlete.shortName}
              </Typography>
              <Typography className=" max-w-[6rem] text-[10px] opacity-90 word truncate">
                {data.gameData.leaders[1].leaders[2].leaders[0].displayValue}
              </Typography>
            </Box>
            <Box className="flex flex-col justify-center items-center gap-1">
              <Image
                src={data.gameData.leaders[1].leaders[2].leaders[0].athlete.headshot.href}
                width={100}
                height={100}
                alt="player"
                className="w-10 h-10 md:w-[30px] md:h-[30px] border rounded-full object-cover"
              />
              <Typography className="text-xs opacity-80">{data.gameData.leaders[1].team.abbreviation}</Typography>
            </Box>
          </Box>
        </Box>
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
            <Typography className="opacity-70 font-semibold">{data.homeTeam.team.name} Stats</Typography>
          </Box>
          <Box className="grid grid-cols-3 gap-1">
            {Object.entries(data.awayTeamStats).map(([statName, value]: [string, any]) => (
              <React.Fragment key={uuidv4()}>
                <Box className="w-auto flex justify-center items-center flex-row p-3 bg-white gap-1 drop-shadow-md">
                  <Box className="flex flex-col justify-center gap-2 items-center">
                    <Typography className="text-sm">{statName}</Typography>
                    <Typography className="font-semibold text-3xl">{value.displayValue}</Typography>
                    <Typography className="text-base opacity-70">{value.rankDisplayValue}</Typography>
                  </Box>
                </Box>
              </React.Fragment>
            ))}
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
            <Typography className="opacity-70 font-semibold">{data.awayTeam.team.name} Stats</Typography>
          </Box>
          <Box className="grid grid-cols-3 gap-1">
            {Object.entries(data.homeTeamStats).map(([statName, value]: [string, any]) => (
              <React.Fragment key={uuidv4()}>
                <Box className="w-auto flex justify-center items-center flex-row p-3 bg-white gap-1 drop-shadow-md">
                  <Box className="flex flex-col justify-center gap-2 items-center">
                    <Typography className="text-sm">{statName}</Typography>
                    <Typography className="font-semibold text-3xl">{value.displayValue}</Typography>
                    <Typography className="text-base opacity-70">{value.rankDisplayValue}</Typography>
                  </Box>
                </Box>
              </React.Fragment>
            ))}
          </Box>
        </Box>
      </>
    );
  }

  if (!isLoading) {
    console.log(data);
  }

  if (!isLoading) {
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

            <ContainerBox
              altColor={data.isGameStarted ? data.winningTeam.team.alternateColor : "gray"}
              mainColor={data.isGameStarted ? data.winningTeam.team.color : "gray"}
              isDesktopScreen={isDesktopScreen}
            >
              <Box className="flex self-start flex-col justify-center items-center gap-3">
                <StadiumInfo data={data} />
                {data.isGameStarted && gameLeaders()}
                <DivisionStandings data={data} isNFL={true} />
              </Box>

              <Box className="flex flex-col gap-5">
                {data.isGameStarted && (
                  <>
                    <NFLBoxscore data={data} />
                    <NFLScoringPlays data={data} />
                    <NFLGameDrives data={data} />
                  </>
                )}
                {!data.isGameStarted && teamStats()}
              </Box>

              <Articles title="NFL News" teamNews={data.gameData.news} limit={6} />
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

            <GameUserSelection userSelection={userSelection} setUserSelection={setUserSelection} data={data} />
            <ContainerBox
              altColor={data.isGameStarted ? data.winningTeam.team.alternateColor : "gray"}
              mainColor={data.isGameStarted ? data.winningTeam.team.color : "gray"}
              isDesktopScreen={isDesktopScreen}
            >
              {userSelection === "gameInfo" && (
                <>
                  <Box className="w-full flex flex-col justify-center items-center gap-3">
                    <StadiumInfo data={data} />
                    {data.isGameStarted && gameLeaders()}
                    <DivisionStandings data={data} isNFL={true} />
                  </Box>
                </>
              )}

              {userSelection === "stats" && teamStats()}

              {userSelection === "scoreInfo" && (
                <>
                  <Box className="w-full flex flex-col gap-5">
                    {data.isGameStarted && (
                      <>
                        <NFLBoxscore data={data} />
                        <NFLScoringPlays data={data} />
                        <NFLGameDrives data={data} />
                      </>
                    )}
                  </Box>
                </>
              )}

              {userSelection === "news" && (
                <>
                  <Articles title="NFL News" teamNews={data.gameData.news} limit={6} />
                </>
              )}
            </ContainerBox>
          </>
        )}
      </>
    );
  }
}
