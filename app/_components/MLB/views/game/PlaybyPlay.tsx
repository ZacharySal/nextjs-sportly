"use client";

import ContainerBox from "@/app/_components/ContainerBox";
import { Box, useMediaQuery } from "@mui/material";
import MLBBoxscore from "@/app/_components/MLB/MLBBoxscore";
import MLBScoringPlays from "@/app/_components/MLB/MLBScoringPlays";
import DivisionStandings from "@/app/_components/DivisionStandings";
import GameUserSelection from "@/app/_components/GameUserSelection";
import Loading from "@/app/_components/Loading";
import MatchupPredictor from "@/app/_components/MatchupPredictor";
import Articles from "@/app/_components/Articles";

export default function Page({ data }: { data: any }) {
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  const desktopView = () => (
    <>
      <Box className="flex flex-col basis-1/2 gap-3">
        {data.isGameStarted && data.homeTeam.linescores && <MLBBoxscore data={data} />}
        {data.isGameStarted && <MLBScoringPlays data={data} />}
      </Box>

      <Box className="basis-1/4 flex flex-col gap-3">
        {data.gameData.predictor && <MatchupPredictor data={data} league="mlb" />}
        <DivisionStandings data={data} isNFL={false} league="mlb" />
        <Articles title="MLB News" teamNews={data.gameData.news} limit={6} />
      </Box>
    </>
  );

  const mobileView = () => (
    <>
      <Box className="flex flex-col basis-1/2 gap-3">
        {data.isGameStarted && data.homeTeam.linescores && <MLBBoxscore data={data} />}
        {data.isGameStarted && <MLBScoringPlays data={data} />}
      </Box>
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
