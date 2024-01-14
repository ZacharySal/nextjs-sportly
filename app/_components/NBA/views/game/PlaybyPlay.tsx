"use client";

import ContainerBox from "@/app/_components/ContainerBox";
import Articles from "@/app/_components/Articles";
import useMediaQuery from "@mui/material/useMediaQuery";
import GameUserSelection from "@/app/_components/GameUserSelection";
import MatchupPredictor from "@/app/_components/MatchupPredictor";
import NBAPlaybyPlay from "@/app/_components/NBA/NBAPlaybyPlay";
import SeasonSeries from "@/app/_components/SeasonSeries";
import useSWR from "swr";
import { fetcher } from "@/app/_lib/utils";
import Loading from "@/app/loading";

export default function PlaybyPlay({ gameId }: { gameId: any }) {
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  const { data, isLoading } = useSWR(`http://localhost:3000/api/nba/gameData/${gameId}`, fetcher, {
    refreshInterval: 5000,
  });

  const desktopView = () => (
    <>
      <div className="flex flex-col gap-3 basis-3/4">
        <NBAPlaybyPlay data={data} />
      </div>
      <div className="basis-1/4 flex flex-col gap-3">
        {data.gameData.predictor && <MatchupPredictor data={data} league="nba" />}
        <SeasonSeries data={data} league="nba" />
        <Articles title="NBA News" news={data.gameData.news.articles} limit={6} />
      </div>
    </>
  );

  const mobileView = () => <NBAPlaybyPlay data={data} />;

  if (isLoading) return <Loading />;
  return (
    <>
      <GameUserSelection userSelection={"playbyplay"} data={data} />
      <ContainerBox isDesktopScreen={isDesktopScreen}>
        {isDesktopScreen ? desktopView() : mobileView()}
      </ContainerBox>
    </>
  );
}
