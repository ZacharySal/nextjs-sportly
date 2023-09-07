"use client";

import GameHeader from "@/app/_components/GameHeader";
import ContainerBox from "@/app/_components/ContainerBox";
import Articles from "@/app/_components/Articles";
import { v4 as uuidv4 } from "uuid";
import { Box, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import useSwr from "swr";
import { useState } from "react";
import React from "react";
import StadiumInfo from "@/app/_components/StadiumInfo";
import MLBBoxscore from "@/app/_components/MLBBoxscore";
import MLBScoringPlays from "@/app/_components/MLBScoringPlays";
import DivisionStandings from "@/app/_components/DivisionStandings";
import GameUserSelection from "@/app/_components/GameUserSelection";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Page({ params }: { params: { gameId: string } }) {
  const [userSelection, setUserSelection] = useState("gameInfo");

  const { data, isLoading } = useSwr(
    `https://nextjs-sportly.vercel.app/api/mlb/gameData/${params.gameId}`,
    fetcher
  );

  const isDesktopScreen = useMediaQuery("(min-width:1000px)");
  const isSelected = (selection: string) => selection === userSelection;

  function teamStats() {
    return (
      <>
        <Box className="w-full flex flex-col gap-2 mb-5">
          <Box className="flex flex-row gap-1 justify-start items-center">
            <Image
              src={`/mlb/${data.homeTeam.team.name
                .replace(" ", "")
                .toLowerCase()}.png`}
              width={100}
              height={100}
              alt="home team logo"
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
              src={`/mlb/${data.awayTeam.team.name
                .replace(" ", "")
                .toLowerCase()}.png`}
              width={100}
              height={100}
              alt="away team logo"
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

  if (!isLoading) {
    return (
      <>
        {isDesktopScreen ? (
          <>
            <GameHeader
              backgroundColor={"#002D72"}
              homeTeam={data.homeTeam}
              awayTeam={data.awayTeam}
              winningTeam={data.winningTeam}
              isGameStarted={data.isGameStarted}
              league="mlb"
              gameInfo={data.gameInfo}
              isDesktopScreen={isDesktopScreen}
            />

            <ContainerBox
              altColor={
                data.isGameStarted
                  ? data.winningTeam.team.alternateColor
                  : "gray"
              }
              mainColor={
                data.isGameStarted ? data.winningTeam.team.color : "gray"
              }
              isDesktopScreen={isDesktopScreen}
            >
              <Box className="w-1/3 flex flex-col justify-center items-center gap-3">
                <StadiumInfo data={data} />
                <DivisionStandings data={data} />
              </Box>

              <Box className="w-7/12 flex flex-col gap-5">
                {data.isGameStarted && <MLBBoxscore data={data} />}
                {data.isGameStarted && <MLBScoringPlays data={data} />}
                {teamStats()}
              </Box>

              <Articles
                title="MLB News"
                teamNews={data.gameData.news}
                limit={6}
              />
            </ContainerBox>
          </>
        ) : (
          <>
            <GameHeader
              backgroundColor={"#002D72"}
              homeTeam={data.homeTeam}
              awayTeam={data.awayTeam}
              winningTeam={data.winningTeam}
              isGameStarted={data.isGameStarted}
              league="mlb"
              gameInfo={data.gameInfo}
              isDesktopScreen={isDesktopScreen}
            />
            <GameUserSelection
              userSelection={userSelection}
              setUserSelection={setUserSelection}
              data={data}
            />
            <ContainerBox
              altColor={
                data.isGameStarted
                  ? data.winningTeam.team.alternateColor
                  : "gray"
              }
              mainColor={
                data.isGameStarted ? data.winningTeam.team.color : "gray"
              }
              isDesktopScreen={isDesktopScreen}
            >
              {userSelection === "gameInfo" && (
                <Box className="w-full flex flex-col justify-center items-center gap-3">
                  <StadiumInfo data={data} />
                  <DivisionStandings data={data} />
                </Box>
              )}

              {userSelection === "scoreInfo" && (
                <Box className="w-full flex flex-col gap-5">
                  {data.isGameStarted && <MLBBoxscore data={data} />}
                  {data.isGameStarted && <MLBScoringPlays data={data} />}
                </Box>
              )}

              {userSelection === "stats" && teamStats()}

              {userSelection === "news" && (
                <Articles
                  title="MLB News"
                  teamNews={data.gameData.news}
                  limit={6}
                />
              )}
            </ContainerBox>
          </>
        )}
      </>
    );
  }
}
