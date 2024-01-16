"use client";

import ContainerBox from "@/components/ContainerBox";
import Articles from "@/components/Articles";
import useMediaQuery from "@mui/material/useMediaQuery";
import GameUserSelection from "@/components/GameUserSelection";
import MatchupPredictor from "@/components/MatchupPredictor";
import NBAPlaybyPlay from "@/components/NBA/NBAPlaybyPlay";
import SeasonSeries from "@/components/SeasonSeries";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

import Loading from "@/app/loading";
import LeagueContainerBox from "@/components/LeagueContainerBox";

export default function PlaybyPlay({ gameId }: { gameId: any }) {
  const isDesktopScreen = useMediaQuery("(min-width:800px)");

  const { data, isLoading } = useSWR(
    `https://nextjs-sportly.vercel.app/api/nba/gameData/${gameId}`,
    fetcher,
    {
      refreshInterval: 5000,
    }
  );

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
      <LeagueContainerBox isDesktopScreen={isDesktopScreen}>
        {isDesktopScreen ? desktopView() : mobileView()}
      </LeagueContainerBox>
    </>
  );
}
