"use client";

import ContainerBox from "@/app/_components/ContainerBox";
import Articles from "@/app/_components/Articles";
import { Box, useMediaQuery } from "@mui/material";
import useSwr from "swr";
import React from "react";
import DivisionStandings from "@/app/_components/DivisionStandings";
import GameUserSelection from "@/app/_components/GameUserSelection";
import Loading from "@/app/_components/Loading";
import MatchupPredictor from "@/app/_components/MatchupPredictor";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Page({ params }: { params: { gameId: string } }) {
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  const { data, isLoading } = useSwr(
    `https://nextjs-sportly.vercel.app/api/nfl/gameData/${params.gameId}`,
    fetcher
  );

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

  if (isLoading) return <Loading />;
  else {
    return (
      <>
        <GameUserSelection userSelection={"news"} data={data} />
        <ContainerBox isDesktopScreen={isDesktopScreen}>
          {isDesktopScreen ? desktopView() : mobileView()}
        </ContainerBox>
      </>
    );
  }
}
