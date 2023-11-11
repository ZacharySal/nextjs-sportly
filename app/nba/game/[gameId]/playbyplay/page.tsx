"use client";

import useSwr from "swr";
import ContainerBox from "@/app/_components/ContainerBox";
import Articles from "@/app/_components/Articles";
import { Box, Typography, useMediaQuery } from "@mui/material";
import GameUserSelection from "@/app/_components/GameUserSelection";
import Loading from "@/app/_components/Loading";
import MatchupPredictor from "@/app/_components/MatchupPredictor";
import NBAPlaybyPlay from "@/app/_components/NBA/NBAPlaybyPlay";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Page({ params }: { params: { gameId: string } }) {
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  const { data, isLoading } = useSwr(
    `https://nextjs-sportly.vercel.app/api/nba/gameData/${params.gameId}`,
    fetcher,
    { refreshInterval: 5000 }
  );

  const desktopView = () => (
    <>
      <Box className="flex flex-col gap-3 basis-3/4">
        <NBAPlaybyPlay data={data} />
      </Box>
      <Box className="basis-1/4 flex flex-col gap-3">
        {data.gameData.predictor && <MatchupPredictor data={data} league="nba" />}
        <Articles title="NBA News" teamNews={data.gameData.news} limit={6} />
      </Box>
    </>
  );

  const mobileView = () => <NBAPlaybyPlay data={data} />;

  if (isLoading) return <Loading />;
  else {
    return (
      <>
        <GameUserSelection userSelection={"playbyplay"} data={data} />
        <ContainerBox isDesktopScreen={isDesktopScreen}>
          {isDesktopScreen ? desktopView() : mobileView()}
        </ContainerBox>
      </>
    );
  }
}
