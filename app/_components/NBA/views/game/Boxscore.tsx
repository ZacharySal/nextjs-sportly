"use client";

import ContainerBox from "@/app/_components/ContainerBox";
import Articles from "@/app/_components/Articles";
import { Box, useMediaQuery } from "@mui/material";
import DivisionStandings from "@/app/_components/DivisionStandings";
import GameUserSelection from "@/app/_components/GameUserSelection";
import Loading from "@/app/_components/Loading";
import MatchupPredictor from "@/app/_components/MatchupPredictor";
import NBAGameStats from "@/app/_components/NBA/NBAGameStats";
import useHasHydrated from "@/app/_components/hooks/useHasHyrdated";

export default function Boxscore({ data }: { data: any }) {
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  const mobileView = () => <NBAGameStats data={data} isDesktopScreen={isDesktopScreen} />;

  const desktopView = () => (
    <>
      <Box className="flex flex-col gap-3">
        <NBAGameStats data={data} isDesktopScreen={isDesktopScreen} />
      </Box>
      <Box className="flex flex-col basis-1/4 gap-3">
        {data.gameData.predictor && <MatchupPredictor data={data} league="nba" />}
        <DivisionStandings data={data} isNFL={false} league="nba" />
        <Articles title="NBA News" teamNews={data.gameData.news} limit={6} />
      </Box>
    </>
  );

  return (
    <>
      <GameUserSelection userSelection={"boxscore"} data={data} />
      <ContainerBox isDesktopScreen={isDesktopScreen}>
        {isDesktopScreen ? desktopView() : mobileView()}
      </ContainerBox>
    </>
  );
}
