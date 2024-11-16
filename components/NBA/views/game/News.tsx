"use client";

import Articles from "@/components/Articles";
import ContainerBox from "@/components/ContainerBox";
import DivisionStandings from "@/components/DivisionStandings";
import GameUserSelection from "@/components/GameUserSelection";
import Loading from "@/components/Loading";
import MatchupPredictor from "@/components/MatchupPredictor";
import useMediaQuery from "@mui/material/useMediaQuery";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Page({ gameId }: { gameId: string }) {
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
      <div className="flex basis-1/2 flex-col gap-3">
        <Articles
          title="NBA News"
          news={data.gameData.news.articles}
          limit={6}
        />
      </div>

      <div className="flex basis-1/4 flex-col gap-3">
        {data.gameData.predictor && (
          <MatchupPredictor data={data} league="nba" />
        )}
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
