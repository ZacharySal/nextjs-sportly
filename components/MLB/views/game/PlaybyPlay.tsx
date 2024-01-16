"use client";

import ContainerBox from "@/components/ContainerBox";
import useMediaQuery from "@mui/material/useMediaQuery";
import MLBBoxscore from "@/components/MLB/MLBBoxscore";
import MLBScoringPlays from "@/components/MLB/MLBScoringPlays";
import DivisionStandings from "@/components/DivisionStandings";
import GameUserSelection from "@/components/GameUserSelection";
import MatchupPredictor from "@/components/MatchupPredictor";
import Articles from "@/components/Articles";

export default function Page({ data }: { data: any }) {
  const isDesktopScreen = useMediaQuery("(min-width:800px)");

  const desktopView = () => (
    <>
      <div className="flex flex-col basis-1/2 gap-3">
        {data.isGameStarted && data.homeTeam.linescores && <MLBBoxscore data={data} />}
        {data.isGameStarted && <MLBScoringPlays data={data} />}
      </div>

      <div className="basis-1/4 flex flex-col gap-3">
        {data.gameData.predictor && <MatchupPredictor data={data} league="mlb" />}
        <DivisionStandings data={data} isNFL={false} league="mlb" />
        <Articles title="MLB News" news={data.gameData.news.articles} limit={6} />
      </div>
    </>
  );

  const mobileView = () => (
    <>
      <div className="flex flex-col basis-1/2 gap-3">
        {data.isGameStarted && data.homeTeam.linescores && <MLBBoxscore data={data} />}
        {data.isGameStarted && <MLBScoringPlays data={data} />}
      </div>
    </>
  );

  return (
    <>
      <GameUserSelection userSelection={"playbyplay"} data={data} />
      <ContainerBox isDesktopScreen={isDesktopScreen}>
        {isDesktopScreen ? desktopView() : mobileView()}
      </ContainerBox>
    </>
  );
}
