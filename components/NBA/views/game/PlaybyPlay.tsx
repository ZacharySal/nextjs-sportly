"use client";

import Articles from "@/components/Articles";
import GameUserSelection from "@/components/GameUserSelection";
import MatchupPredictor from "@/components/MatchupPredictor";
import NBAPlaybyPlay from "@/components/NBA/NBAPlaybyPlay";
import SeasonSeries from "@/components/SeasonSeries";
import useMediaQuery from "@mui/material/useMediaQuery";
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
    },
  );

  const desktopView = () => (
    <>
      <div className="flex basis-3/4 flex-col gap-3">
        <NBAPlaybyPlay data={data} />
      </div>
      <div className="flex basis-1/4 flex-col gap-3">
        {data.gameData.predictor && (
          <MatchupPredictor data={data} league="nba" />
        )}
        <SeasonSeries data={data} league="nba" />
        <Articles
          title="NBA News"
          news={data.gameData.news.articles}
          limit={6}
        />
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
