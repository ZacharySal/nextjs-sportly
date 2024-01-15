"use client";

import ContainerBox from "@/components/ContainerBox";
import Articles from "@/components/Articles";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";
import DivisionStandings from "@/components/DivisionStandings";
import GameUserSelection from "@/components/GameUserSelection";
import Loading from "@/components/Loading";
import MatchupPredictor from "@/components/MatchupPredictor";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";

export default function Page({ gameId }: { gameId: string }) {
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  const { data, isLoading } = useSWR(
    `https://nextjs-sportly.vercel.app/api/nba/gameData/${gameId}`,
    fetcher,
    {
      refreshInterval: 5000,
    }
  );

  const desktopView = () => (
    <>
      <div className="flex flex-col basis-1/2 gap-3">
        <Articles title="NBA News" news={data.gameData.news.articles} limit={6} />
      </div>

      <div className="basis-1/4 flex flex-col gap-3">
        {data.gameData.predictor && <MatchupPredictor data={data} league="nba" />}
        <DivisionStandings data={data} isNFL={false} league="nba" />
      </div>
    </>
  );

  const mobileView = () => (
    <Articles title="NBA News" news={data.gameData.news.articles} limit={6} />
  );

  if (isLoading) return <Loading />;
  return (
    <>
      <GameUserSelection userSelection={"news"} data={data} />
      <ContainerBox isDesktopScreen={isDesktopScreen}>
        {isDesktopScreen ? desktopView() : mobileView()}
      </ContainerBox>
    </>
  );
}
