"use client";

import ContainerBox from "@/app/_components/ContainerBox";
import GameRecapArticle from "@/app/_components/GameRecapArticle";
import Articles from "@/app/_components/Articles";
import { v4 as uuidv4 } from "uuid";
import { Box, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import useSwr from "swr";
import { useState } from "react";
import React from "react";
import StadiumInfo from "@/app/_components/StadiumInfo";
import MLBBoxscore from "@/app/_components/MLB/MLBBoxscore";
import MLBScoringPlays from "@/app/_components/MLB/MLBScoringPlays";
import DivisionStandings from "@/app/_components/DivisionStandings";
import GameUserSelection from "@/app/_components/GameUserSelection";
import Loading from "@/app/_components/Loading";
import NFLGameStats from "@/app/_components/NFL/NFLGameStats";
import MatchupPredictor from "@/app/_components/MatchupPredictor";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Page({ params }: { params: { gameId: string } }) {
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  const { data, isLoading } = useSwr(
    `https://nextjs-sportly.vercel.app/api/mlb/gameData/${params.gameId}`,
    fetcher
  );

  const desktopView = () => (
    <>
      <Box className="flex self-start basis-1/4  flex-col justify-center items-center gap-3">
        <StadiumInfo data={data} />
        <DivisionStandings data={data} isNFL={false} league="mlb" />
      </Box>

      <Box className="flex flex-col basis-1/2 gap-5">
        {data.isGameStarted && data.homeTeam.linescores && (
          <>
            <GameRecapArticle data={data} />
            <MLBBoxscore data={data} />
          </>
        )}
        {data.isGameStarted && (
          <>
            <MLBScoringPlays data={data} />
          </>
        )}
      </Box>

      <Box className="basis-1/4 flex flex-col gap-3">
        {data.gameData.predictor && (
          <MatchupPredictor data={data} league="mlb" />
        )}
        <Articles title="MLB News" teamNews={data.gameData.news} limit={6} />
      </Box>
    </>
  );

  const mobileView = () => (
    <>
      <Box className="w-full flex flex-col gap-3">
        {data.isGameStarted && data.homeTeam.linescores && (
          <>
            <GameRecapArticle data={data} />
            <MLBBoxscore data={data} />
          </>
        )}
        {data.isGameStarted && (
          <>
            <MLBScoringPlays data={data} />
          </>
        )}
        {data.gameData.predictor && (
          <MatchupPredictor data={data} league="mlb" />
        )}
        <DivisionStandings data={data} isNFL={false} league="mlb" />
        <StadiumInfo data={data} />
      </Box>
    </>
  );

  if (isLoading) return <Loading />;
  else {
    return (
      <>
        <GameUserSelection userSelection="gamecast" data={data} />
        <ContainerBox isDesktopScreen={isDesktopScreen}>
          {isDesktopScreen ? desktopView() : mobileView()}
        </ContainerBox>
      </>
    );
  }
}
