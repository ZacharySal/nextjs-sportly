"use client";

import useMediaQuery from "@mui/material/useMediaQuery";
import ContainerBox from "@/components/ContainerBox";
import Articles from "@/components/Articles";
import StadiumInfo from "@/components/StadiumInfo";
import NFLBoxscore from "@/components/NFL/NFLBoxscore";
import DivisionStandings from "@/components/DivisionStandings";
import NFLScoringPlays from "@/components/NFL/NFLScoringPlays";
import GameUserSelection from "@/components/GameUserSelection";
import MatchupPredictor from "@/components/MatchupPredictor";
import GameRecapArticle from "@/components/GameRecapArticle";
import NFLGameLeaders from "@/components/NFL/NFLGameLeaders";
import InjuryReport from "@/components/InjuryReport";
import LastFive from "@/components/LastFive";
import RecentPlays from "@/components/RecentPlays";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import Loading from "@/components/Loading";

export default function Home({ gameId }: { gameId: string }) {
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  const { data, isLoading } = useSWR(
    `https://nextjs-sportly.vercel.app/api/nfl/gameData/${gameId}`,
    fetcher,
    {
      refreshInterval: 5000,
    }
  );

  if (!isLoading) {
    console.log(data);
  }

  const desktopView = () => (
    <>
      <div className="flex self-start flex-col justify-center items-center gap-3 basis-1/4">
        <NFLGameLeaders data={data} />
        <DivisionStandings data={data} isNFL={true} league="nfl" />
        <StadiumInfo data={data} />
      </div>

      <div className="flex flex-col gap-3 basis-1/2">
        {data.isGameStarted && (
          <>
            <GameRecapArticle data={data} />
            <NFLBoxscore data={data} />
            <NFLScoringPlays data={data} />
          </>
        )}
        {!data.isGameStarted && (
          <>
            <GameRecapArticle data={data} />
            <InjuryReport data={data} league="nfl" />
            <LastFive data={data} league="nfl" isDesktopScreen={isDesktopScreen} />
          </>
        )}
      </div>

      <div className="flex self-start flex-col justify-center items-center gap-3 basis-1/4">
        <MatchupPredictor data={data} league="nfl" />
        <Articles title="NFL News" news={data.gameData.news.articles} limit={6} />
      </div>
    </>
  );

  const mobileView = () => (
    <div className="w-full flex flex-col justify-center items-center gap-3">
      <GameRecapArticle data={data} />
      {data.isGameStarted ? (
        <>
          <NFLBoxscore data={data} />
          <NFLGameLeaders data={data} />
          <NFLScoringPlays data={data} />
          <MatchupPredictor data={data} league={"nfl"} />
        </>
      ) : (
        <>
          <MatchupPredictor data={data} league={"nfl"} />
          <NFLGameLeaders data={data} />
          <InjuryReport data={data} league="nfl" />
          <LastFive data={data} league="nfl" isDesktopScreen={isDesktopScreen} />
        </>
      )}
      <DivisionStandings data={data} isNFL={true} league="nfl" />
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