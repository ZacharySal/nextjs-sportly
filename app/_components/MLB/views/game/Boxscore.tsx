"use client";

import ContainerBox from "@/app/_components/ContainerBox";
import Articles from "@/app/_components/Articles";
import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import DivisionStandings from "@/app/_components/DivisionStandings";
import GameUserSelection from "@/app/_components/GameUserSelection";
import NFLGameStats from "@/app/_components/NFL/NFLGameStats";
import MatchupPredictor from "@/app/_components/MatchupPredictor";

export default function Boxscore({ data }: { data: any }) {
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  const desktopView = () => (
    <>
      <Box className="flex flex-col basis-1/2 gap-3">
        <NFLGameStats data={data} league="mlb" />
      </Box>

      <Box className="basis-1/4 flex flex-col gap-3">
        {data.gameData.predictor && <MatchupPredictor data={data} league="mlb" />}
        <DivisionStandings data={data} isNFL={false} league="mlb" />
        <Articles title="MLB News" teamNews={data.gameData.news} limit={6} />
      </Box>
    </>
  );

  const mobileView = () => <NFLGameStats data={data} league="mlb" />;

  return (
    <>
      <GameUserSelection userSelection={"boxscore"} data={data} />
      <ContainerBox isDesktopScreen={isDesktopScreen}>
        {isDesktopScreen ? desktopView() : mobileView()}
      </ContainerBox>
    </>
  );
}
