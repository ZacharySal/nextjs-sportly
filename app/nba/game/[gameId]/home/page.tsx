"use client";

import useSwr from "swr";
import { useState } from "react";
import ContainerBox from "@/app/_components/ContainerBox";
import Articles from "@/app/_components/Articles";
import StadiumInfo from "@/app/_components/StadiumInfo";
import { Box, useMediaQuery } from "@mui/material";
import NBABoxscore from "@/app/_components/NBA/NBABoxscore";
import DivisionStandings from "@/app/_components/DivisionStandings";
import GameUserSelection from "@/app/_components/GameUserSelection";
import Loading from "@/app/_components/Loading";
import MatchupPredictor from "@/app/_components/MatchupPredictor";
import GameRecapArticle from "@/app/_components/GameRecapArticle";
import NBAGameLeaders from "@/app/_components/NBA/NBAGameLeaders";
import SeasonSeries from "@/app/_components/SeasonSeries";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Page({ params }: { params: { gameId: string } }) {
  const [userSelection, setUserSelection] = useState("gamecast");
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  const { data, isLoading } = useSwr(
    `https://nextjs-sportly.vercel.app/api/nba/gameData/${params.gameId}`,
    fetcher
  );

  if (!isLoading) {
    console.log(data);
  }

  const mobileView = () => (
    <Box className="w-full flex flex-col justify-center items-center gap-3">
      {data.isGameStarted && <NBABoxscore data={data} />}
      {data.gameData.leaders[0].leaders.length > 0 && (
        <NBAGameLeaders data={data} />
      )}
      {data.gameData.predictor && <MatchupPredictor data={data} league="nba" />}
      <DivisionStandings data={data} isNFL={false} league="nba" />
      <StadiumInfo data={data} />
    </Box>
  );

  const desktopView = () => (
    <>
      <Box className="flex self-start flex-col justify-center items-center gap-3 basis-1/4">
        {data.gameData.leaders[0].leaders.length > 0 && (
          <NBAGameLeaders data={data} />
        )}
        <DivisionStandings data={data} isNFL={false} league="nba" />
        <StadiumInfo data={data} />
      </Box>

      <Box className="flex flex-col gap-5 basis-1/2">
        {data.isGameStarted && (
          <>
            <NBABoxscore data={data} />
            <GameRecapArticle data={data} />
          </>
        )}
      </Box>

      <Box className="flex flex-col gap-5 basis-1/4">
        {data.gameData.predictor && (
          <MatchupPredictor data={data} league="nba" />
        )}
        {/* {data.gameData.seasonseries && <SeasonSeries data={data} />} */}
        <Articles title="NBA News" teamNews={data.gameData.news} limit={6} />
      </Box>
    </>
  );

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
