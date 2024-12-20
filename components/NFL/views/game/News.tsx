"use client";

import Loading from "@/app/loading";
import Articles from "@/components/Articles";
import ContainerBox from "@/components/ContainerBox";
import DivisionStandings from "@/components/DivisionStandings";
import GameUserSelection from "@/components/GameUserSelection";
import MatchupPredictor from "@/components/MatchupPredictor";
import useMediaQuery from "@mui/material/useMediaQuery";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Page({ gameId }: { gameId: string }) {
  const isDesktopScreen = useMediaQuery("(min-width:800px)");

  const { data, isLoading, error } = useSWR(
    `https://nextjs-sportly.vercel.app/api/nfl/gameData/${gameId}`,
    fetcher,
    {
      refreshInterval: 5000,
    },
  );

  const desktopView = () => (
    <>
      <div className="flex basis-1/2 flex-col gap-3">
        <Articles
          title="NFL News"
          news={data.gameData.news.articles}
          limit={6}
        />
      </div>

      <div className="flex basis-1/4 flex-col gap-3">
        {data.gameData.predictor && (
          <MatchupPredictor data={data} league="nfl" />
        )}
        <DivisionStandings data={data} isNFL={true} league="nfl" />
      </div>
    </>
  );

  const mobileView = () => (
    <Articles title="NFL News" news={data.gameData.news.articles} limit={6} />
  );

  if (isLoading) return <Loading />;
  else
    return (
      <>
        <GameUserSelection userSelection={"news"} data={data} />
        <ContainerBox isDesktopScreen={isDesktopScreen}>
          {isDesktopScreen ? desktopView() : mobileView()}
        </ContainerBox>
      </>
    );
}
