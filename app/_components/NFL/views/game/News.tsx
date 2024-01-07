"use client";

import ContainerBox from "@/app/_components/ContainerBox";
import Articles from "@/app/_components/Articles";
import { Box, useMediaQuery } from "@mui/material";
import React from "react";
import DivisionStandings from "@/app/_components/DivisionStandings";
import GameUserSelection from "@/app/_components/GameUserSelection";
import MatchupPredictor from "@/app/_components/MatchupPredictor";

export default function Page({ data }: { data: any }) {
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  const desktopView = () => (
    <>
      <Box className="flex flex-col basis-1/2 gap-3">
        <Articles title="NFL News" teamNews={data.gameData.news} limit={6} />
      </Box>

      <Box className="basis-1/4 flex flex-col gap-3">
        {data.gameData.predictor && <MatchupPredictor data={data} league="nfl" />}
        <DivisionStandings data={data} isNFL={true} league="nfl" />
      </Box>
    </>
  );

  const mobileView = () => <Articles title="NFL News" teamNews={data.gameData.news} limit={6} />;

  return (
    <>
      <GameUserSelection userSelection={"news"} data={data} />
      <ContainerBox isDesktopScreen={isDesktopScreen}>
        {isDesktopScreen ? desktopView() : mobileView()}
      </ContainerBox>
    </>
  );
}
