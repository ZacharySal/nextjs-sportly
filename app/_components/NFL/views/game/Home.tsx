"use client";

import useMediaQuery from "@mui/material/useMediaQuery";
import ContainerBox from "@/app/_components/ContainerBox";
import Articles from "@/app/_components/Articles";
import StadiumInfo from "@/app/_components/StadiumInfo";
import NFLBoxscore from "@/app/_components/NFL/NFLBoxscore";
import DivisionStandings from "@/app/_components/DivisionStandings";
import NFLScoringPlays from "@/app/_components/NFL/NFLScoringPlays";
import GameUserSelection from "@/app/_components/GameUserSelection";
import MatchupPredictor from "@/app/_components/MatchupPredictor";
import GameRecapArticle from "@/app/_components/GameRecapArticle";
import NFLGameLeaders from "@/app/_components/NFL/NFLGameLeaders";
import InjuryReport from "@/app/_components/InjuryReport";
import LastFive from "@/app/_components/LastFive";

export default function Home({ data }: { data: any }) {
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

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
        <Articles title="NFL News" teamNews={data.gameData.news} limit={6} />
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

  return (
    <>
      <GameUserSelection userSelection={"gamecast"} data={data} />
      <ContainerBox isDesktopScreen={isDesktopScreen}>
        {isDesktopScreen ? desktopView() : mobileView()}
      </ContainerBox>
    </>
  );
}
