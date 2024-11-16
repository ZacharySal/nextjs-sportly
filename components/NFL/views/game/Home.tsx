"use client";

import Articles from "@/components/Articles";
import ContainerBox from "@/components/ContainerBox";
import DivisionStandings from "@/components/DivisionStandings";
import GameRecapArticle from "@/components/GameRecapArticle";
import GameUserSelection from "@/components/GameUserSelection";
import InjuryReport from "@/components/InjuryReport";
import LastFive from "@/components/LastFive";
import Linescores from "@/components/Linescores";
import Loading from "@/components/Loading";
import MatchupPredictor from "@/components/MatchupPredictor";
import NFLGameLeaders from "@/components/NFL/NFLGameLeaders";
import NFLScoringPlays from "@/components/NFL/NFLScoringPlays";
import StadiumInfo from "@/components/StadiumInfo";
import useMediaQuery from "@mui/material/useMediaQuery";
import useSWR from "swr";
import NFLTeamStats from "../../NFLTeamStats";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home({ gameId }: { gameId: string }) {
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
      <div className="flex flex-col items-center justify-center gap-3 self-start">
        <NFLGameLeaders data={data} />
        <DivisionStandings data={data} isNFL={true} league="nfl" />
        <StadiumInfo data={data} />
      </div>

      <div className="flex flex-col gap-3">
        {data.isGameStarted && (
          <>
            <GameRecapArticle data={data} />
            <NFLScoringPlays data={data} />
          </>
        )}
        {!data.isGameStarted && (
          <>
            <GameRecapArticle data={data} />
            <InjuryReport data={data} />
            <LastFive
              data={data}
              league="nfl"
              isDesktopScreen={isDesktopScreen}
            />
          </>
        )}
      </div>

      <div className="flex flex-col items-center justify-center gap-3 self-start">
        {data.gameInfo.status.type.state !== "pre" && (
          <NFLTeamStats data={data} />
        )}
        <MatchupPredictor data={data} league="nfl" />
        <Articles
          title="NFL News"
          news={data.gameData.news.articles}
          limit={6}
        />
      </div>
    </>
  );

  const mobileView = () => (
    <div className="flex w-full flex-col items-center justify-center gap-3">
      <GameRecapArticle data={data} />
      {data.isGameStarted ? (
        <>
          <Linescores data={data} />
          <NFLGameLeaders data={data} />
          <NFLScoringPlays data={data} />
          <NFLTeamStats data={data} />
        </>
      ) : (
        <>
          <MatchupPredictor data={data} league={"nfl"} />
          <NFLGameLeaders data={data} />
          <InjuryReport data={data} />
          <LastFive
            data={data}
            league="nfl"
            isDesktopScreen={isDesktopScreen}
          />
        </>
      )}
      <DivisionStandings data={data} isNFL league="nfl" />
      <StadiumInfo data={data} />
    </div>
  );

  if (isLoading) return <Loading />;
  return (
    <>
      <GameUserSelection userSelection={"gamecast"} data={data} />
      <ContainerBox isDesktopScreen={isDesktopScreen}>
        {isDesktopScreen ? desktopView() : mobileView()}
      </ContainerBox>
    </>
  );
}
