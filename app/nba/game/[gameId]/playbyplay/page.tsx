"use client";

import useSwr from "swr";
import { useState } from "react";
import ContainerBox from "@/app/_components/ContainerBox";
import Articles from "@/app/_components/Articles";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import StadiumInfo from "@/app/_components/StadiumInfo";
import { Box, Typography, useMediaQuery } from "@mui/material";
import NBABoxscore from "@/app/_components/NBA/NBABoxscore";
import DivisionStandings from "@/app/_components/DivisionStandings";
import GameUserSelection from "@/app/_components/GameUserSelection";
import Loading from "@/app/_components/Loading";
import NFLGameStats from "@/app/_components/NFL/NFLGameStats";
import MatchupPredictor from "@/app/_components/MatchupPredictor";
import GameRecapArticle from "@/app/_components/GameRecapArticle";
import NBAPlaybyPlay from "@/app/_components/NBA/NBAPlaybyPlay";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Page({ params }: { params: { gameId: string } }) {
  const [userSelection, setUserSelection] = useState("playbyplay");
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  const { data, isLoading } = useSwr(
    `https://nextjs-sportly.vercel.app/api/nba/gameData/${params.gameId}`,
    fetcher
  );

  const desktopView = () => (
    <>
      <Box className="flex flex-col gap-5 basis-3/4">
        <NBAPlaybyPlay data={data} />
      </Box>
      <Box className="basis-1/4 flex flex-col gap-3">
        {data.gameData.predictor && (
          <MatchupPredictor data={data} league="nba" />
        )}
        <Articles title="NBA News" teamNews={data.gameData.news} limit={6} />
      </Box>
    </>
  );

  const mobileView = () => <NBAPlaybyPlay data={data} />;

  if (isLoading) return <Loading />;
  else {
    return (
      <>
        <GameUserSelection userSelection={userSelection} data={data} />
        <ContainerBox isDesktopScreen={isDesktopScreen}>
          {isDesktopScreen ? desktopView() : mobileView()}
        </ContainerBox>
      </>
    );
  }
}
