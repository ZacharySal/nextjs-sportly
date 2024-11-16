"use client";

import Loading from "@/app/loading";
import Articles from "@/components/Articles";
import ContainerBox from "@/components/ContainerBox";
import DivisionStandings from "@/components/DivisionStandings";
import GameFlow from "@/components/GameFlow";
import GameRecapArticle from "@/components/GameRecapArticle";
import GameUserSelection from "@/components/GameUserSelection";
import InjuryReport from "@/components/InjuryReport";
import LastFive from "@/components/LastFive";
import Linescores from "@/components/Linescores";
import MatchupPredictor from "@/components/MatchupPredictor";
import NBAGameLeaders from "@/components/NBA/NBAGameLeaders";
import RecentPlays from "@/components/RecentPlays";
import SeasonSeries from "@/components/SeasonSeries";
import StadiumInfo from "@/components/StadiumInfo";
import useMediaQuery from "@mui/material/useMediaQuery";
import useSWR from "swr";
import NBATeamStats from "../../NBATeamStats";
import ShotChart from "../../ShotChart";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home({ gameId }: { gameId: string }) {
  const isDesktopScreen = useMediaQuery("(min-width:800px)");

  const { data, isLoading } = useSWR(
    `https://nextjs-sportly.vercel.app/api/nba/gameData/${gameId}`,
    fetcher,
    {
      refreshInterval: 5000,
    },
  );
  const mobileView = () => (
    <div className="flex w-full flex-col items-center justify-center gap-3">
      <GameRecapArticle data={data} />
      {data.isGameStarted ? (
        <>
          {data.gameInfo.status.type.state === "in" && (
            <RecentPlays data={data} isDesktopScreen={isDesktopScreen} />
          )}
          <Linescores data={data} />
          <NBAGameLeaders data={data} />
          {data.isGameStarted && <NBATeamStats data={data} />}
          <GameFlow data={data} isDesktopScreen={isDesktopScreen} />
          <ShotChart data={data} />
          {data.gameInfo.status.type.state === "in" && (
            <InjuryReport data={data} />
          )}
        </>
      ) : (
        <>
          <MatchupPredictor data={data} league={"nba"} />
          <NBAGameLeaders data={data} />
          <InjuryReport data={data} />
          <LastFive
            data={data}
            league="nba"
            isDesktopScreen={isDesktopScreen}
          />
        </>
      )}
      <SeasonSeries data={data} league="nba" />
      <DivisionStandings data={data} isNFL={false} league="nba" />
      <StadiumInfo data={data} />
    </div>
  );

  const desktopView = () => (
    <>
      <div className="flex basis-1/4 flex-col items-center justify-center gap-3 self-start">
        {data.gameInfo.status.type.state !== "pre" && (
          <NBAGameLeaders data={data} />
        )}

        <MatchupPredictor data={data} league="nba" />
        <DivisionStandings data={data} isNFL={false} league="nba" />
        <StadiumInfo data={data} />
      </div>

      <div className="flex basis-1/2 flex-col gap-3">
        {!data.isGameStarted && (
          <>
            <GameRecapArticle data={data} />
            <NBAGameLeaders data={data} />
            <InjuryReport data={data} />
            <LastFive
              data={data}
              league="nba"
              isDesktopScreen={isDesktopScreen}
            />
          </>
        )}
        {data.isGameStarted && (
          <>
            <GameRecapArticle data={data} />
            {data.gameInfo.status.type.state === "in" && (
              <RecentPlays data={data} isDesktopScreen={isDesktopScreen} />
            )}

            {/* <WinProbability data={data} isDesktopScreen={isDesktopScreen} /> */}
            <GameFlow data={data} isDesktopScreen={isDesktopScreen} />
            <ShotChart data={data} />
            {data.gameInfo.status.type.state === "in" && (
              <InjuryReport data={data} />
            )}
          </>
        )}
      </div>

      <div className="flex basis-1/4 flex-col gap-3">
        {data.isGameStarted && <NBATeamStats data={data} />}
        <SeasonSeries data={data} league="nba" />
        <Articles
          title="NBA News"
          news={data.gameData.news.articles}
          limit={3}
        />
      </div>
    </>
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
