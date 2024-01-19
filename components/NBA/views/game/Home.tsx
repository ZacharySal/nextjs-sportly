"use client";

import ContainerBox from "@/components/ContainerBox";
import Articles from "@/components/Articles";
import StadiumInfo from "@/components/StadiumInfo";
import useMediaQuery from "@mui/material/useMediaQuery";
import NBABoxscore from "@/components/NBA/NBABoxscore";
import DivisionStandings from "@/components/DivisionStandings";
import GameUserSelection from "@/components/GameUserSelection";
import MatchupPredictor from "@/components/MatchupPredictor";
import GameRecapArticle from "@/components/GameRecapArticle";
import NBAGameLeaders from "@/components/NBA/NBAGameLeaders";
import InjuryReport from "@/components/InjuryReport";
import LastFive from "@/components/LastFive";
import RecentPlays from "@/components/RecentPlays";
import SeasonSeries from "@/components/SeasonSeries";
import NBATeamStats from "../../NBATeamStats";
import useSWR from "swr";
import Image from "next/image";
import Loading from "@/app/loading";
import Linescores from "@/components/Linescores";
import GameFlow from "@/components/GameFlow";
import ShotChart from "../../ShotChart";
import WinProbability from "@/components/WinProbability";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home({ gameId }: { gameId: string }) {
  const isDesktopScreen = useMediaQuery("(min-width:800px)");

  const { data, isLoading } = useSWR(
    `https://nextjs-sportly.vercel.app/api/nba/gameData/${gameId}`,
    fetcher,
    {
      refreshInterval: 5000,
    }
  );

  const mobileView = () => (
    <div className="w-full flex flex-col justify-center items-center gap-3">
      <GameRecapArticle data={data} />
      {data.isGameStarted ? (
        <>
          {data.gameInfo.status.type.state === "in" && <RecentPlays data={data} />}
          {data.gameInfo.status.type.state === "post" && <RecentPlays data={data} />}
          <Linescores data={data} />
          <NBAGameLeaders data={data} />
          {data.isGameStarted && <NBATeamStats data={data} />}
          <GameFlow data={data} isDesktopScreen={isDesktopScreen} />
          <ShotChart data={data} />
          {data.gameInfo.status.type.state === "in" && <InjuryReport data={data} league="nba" />}
        </>
      ) : (
        <>
          <MatchupPredictor data={data} league={"nba"} />
          <NBAGameLeaders data={data} />
          <InjuryReport data={data} league="nba" />
          <LastFive data={data} league="nba" isDesktopScreen={isDesktopScreen} />
        </>
      )}
      <SeasonSeries data={data} league="nba" />
      <DivisionStandings data={data} isNFL={false} league="nba" />
      <StadiumInfo data={data} />
    </div>
  );

  const desktopView = () => (
    <>
      <div className="flex self-start flex-col justify-center items-center gap-3 basis-1/4">
        {data.gameInfo.status.type.state !== "pre" && <NBAGameLeaders data={data} />}

        <MatchupPredictor data={data} league="nba" />
        <DivisionStandings data={data} isNFL={false} league="nba" />
        <StadiumInfo data={data} />
      </div>

      <div className="flex flex-col gap-3 basis-1/2">
        {!data.isGameStarted && (
          <>
            <GameRecapArticle data={data} />
            <NBAGameLeaders data={data} />
            <InjuryReport data={data} league="nba" />
            <LastFive data={data} league="nba" isDesktopScreen={isDesktopScreen} />
          </>
        )}
        {data.isGameStarted && (
          <>
            <GameRecapArticle data={data} />
            {data.gameInfo.status.type.state === "in" && <RecentPlays data={data} />}
            {data.gameInfo.status.type.state === "post" && <RecentPlays data={data} />}
            {/* <WinProbability data={data} isDesktopScreen={isDesktopScreen} /> */}
            <GameFlow data={data} isDesktopScreen={isDesktopScreen} />
            <ShotChart data={data} />
            {data.gameInfo.status.type.state === "in" && <InjuryReport data={data} league="nba" />}
          </>
        )}
      </div>

      <div className="flex flex-col gap-3 basis-1/4">
        {data.isGameStarted && <NBATeamStats data={data} />}
        <SeasonSeries data={data} league="nba" />
        <Articles title="NBA News" news={data.gameData.news.articles} limit={3} />
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
