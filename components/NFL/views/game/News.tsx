"use client";

import ContainerBox from "@/components/ContainerBox";
import Articles from "@/components/Articles";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";
import DivisionStandings from "@/components/DivisionStandings";
import GameUserSelection from "@/components/GameUserSelection";
import MatchupPredictor from "@/components/MatchupPredictor";
import useSWR from "swr";
import Loading from "@/app/loading";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Page({ gameId }: { gameId: string }) {
  const isDesktopScreen = useMediaQuery("(min-width:800px)");

  const { data, isLoading } = useSWR(
    `https://nextjs-sportly.vercel.app/api/nfl/gameData/${gameId}`,
    fetcher,
    {
      refreshInterval: 5000,
    }
  );

  const desktopView = () => (
    <>
      <div className="flex flex-col basis-1/2 gap-3">
        <Articles title="NFL News" news={data.gameData.news.articles} limit={6} />
      </div>

      <div className="basis-1/4 flex flex-col gap-3">
        {data.gameData.predictor && <MatchupPredictor data={data} league="nfl" />}
        <DivisionStandings data={data} isNFL={true} league="nfl" />
      </div>
    </>
  );

  const mobileView = () => (
    <Articles title="NFL News" news={data.gameData.news.articles} limit={6} />
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
