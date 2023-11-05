"use client";

import useSwr from "swr";
import ContainerBox from "@/app/_components/ContainerBox";
import Articles from "@/app/_components/Articles";
import { Box, useMediaQuery } from "@mui/material";
import DivisionStandings from "@/app/_components/DivisionStandings";
import GameUserSelection from "@/app/_components/GameUserSelection";
import Loading from "@/app/_components/Loading";
import NFLGameStats from "@/app/_components/NFL/NFLGameStats";
import MatchupPredictor from "@/app/_components/MatchupPredictor";
import NBAGameStats from "@/app/_components/NBA/NBAGameStats";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Page({ params }: { params: { gameId: string } }) {
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  console.log(params.gameId);

  const { data, isLoading } = useSwr(
    `https://nextjs-sportly.vercel.app/api/nba/gameData/${params.gameId}`,
    fetcher
  );

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

  if (isLoading) return <Loading />;
  else if (!isLoading) {
    return (
      <>
        <GameUserSelection userSelection={"boxscore"} data={data} />
        <ContainerBox isDesktopScreen={isDesktopScreen}>
          {isDesktopScreen ? desktopView() : mobileView()}
        </ContainerBox>
      </>
    );
  }
}
