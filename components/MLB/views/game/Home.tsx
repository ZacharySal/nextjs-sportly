"use client";

import ContainerBox from "@/components/ContainerBox";
import GameRecapArticle from "@/components/GameRecapArticle";
import Articles from "@/components/Articles";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";
import StadiumInfo from "@/components/StadiumInfo";
import MLBBoxscore from "@/components/MLB/MLBBoxscore";
import MLBScoringPlays from "@/components/MLB/MLBScoringPlays";
import DivisionStandings from "@/components/DivisionStandings";
import GameUserSelection from "@/components/GameUserSelection";
import Loading from "@/components/Loading";
import MatchupPredictor from "@/components/MatchupPredictor";

export default function Home({ data }: { data: any }) {
  const isDesktopScreen = useMediaQuery("(min-width:800px)");

  const desktopView = () => (
    <>
      <div className="flex self-start basis-1/4  flex-col justify-center items-center gap-3">
        <StadiumInfo data={data} />
        <DivisionStandings data={data} isNFL={false} league="mlb" />
      </div>

      <div className="flex flex-col basis-1/2 gap-5">
        {data.isGameStarted && data.homeTeam.linescores && (
          <>
            <GameRecapArticle data={data} />
            <MLBBoxscore data={data} />
          </>
        )}
        {data.isGameStarted && (
          <>
            <MLBScoringPlays data={data} />
          </>
        )}
      </div>

      <div className="basis-1/4 flex flex-col gap-3">
        {data.gameData.predictor && <MatchupPredictor data={data} league="mlb" />}
        <Articles title="MLB News" news={data.gameData.news.articles} limit={6} />
      </div>
    </>
  );

  const mobileView = () => (
    <>
      <div className="w-full flex flex-col gap-3">
        {data.isGameStarted && data.homeTeam.linescores && (
          <>
            <GameRecapArticle data={data} />
            <MLBBoxscore data={data} />
          </>
        )}
        {data.isGameStarted && (
          <>
            <MLBScoringPlays data={data} />
          </>
        )}
        {data.gameData.predictor && <MatchupPredictor data={data} league="mlb" />}
        <DivisionStandings data={data} isNFL={false} league="mlb" />
        <StadiumInfo data={data} />
      </div>
    </>
  );

  return (
    <>
      <GameUserSelection userSelection="gamecast" data={data} />
      <ContainerBox isDesktopScreen={isDesktopScreen}>
        {isDesktopScreen ? desktopView() : mobileView()}
      </ContainerBox>
    </>
  );
}
