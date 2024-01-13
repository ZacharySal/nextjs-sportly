"use client";

import ContainerBox from "@/app/_components/ContainerBox";
import Articles from "@/app/_components/Articles";
import StadiumInfo from "@/app/_components/StadiumInfo";
import useMediaQuery from "@mui/material/useMediaQuery";
import NBABoxscore from "@/app/_components/NBA/NBABoxscore";
import DivisionStandings from "@/app/_components/DivisionStandings";
import GameUserSelection from "@/app/_components/GameUserSelection";
import MatchupPredictor from "@/app/_components/MatchupPredictor";
import GameRecapArticle from "@/app/_components/GameRecapArticle";
import NBAGameLeaders from "@/app/_components/NBA/NBAGameLeaders";
import InjuryReport from "@/app/_components/InjuryReport";
import LastFive from "@/app/_components/LastFive";
import RecentPlays from "@/app/_components/RecentPlays";
import SeasonSeries from "@/app/_components/SeasonSeries";

export default function Home({ data }: { data: any }) {
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  const mobileView = () => (
    <div className="w-full flex flex-col justify-center items-center gap-3">
      <GameRecapArticle data={data} />
      {data.isGameStarted ? (
        <>
          <NBABoxscore data={data} />
          <NBAGameLeaders data={data} />
          {data.gameInfo.status.type.state === "in" && <RecentPlays data={data} />}
          <MatchupPredictor data={data} league={"nba"} />
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
            <NBAGameLeaders data={data} />
            <NBABoxscore data={data} />
          </>
        )}
      </div>

      <div className="flex flex-col gap-3 basis-1/4">
        <SeasonSeries data={data} league="nba" />
        <Articles title="NBA News" news={data.gameData.news.articles} limit={6} />
      </div>
    </>
  );

  return (
    <>
      <GameUserSelection userSelection={"gamecast"} data={data} />
      <ContainerBox isDesktopScreen={isDesktopScreen}>
        {isDesktopScreen ? desktopView() : mobileView()}
      </ContainerBox>
    </>
  );
}
