"use client";

import { Box, Typography, useMediaQuery, Divider } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import ContainerBox from "@/app/_components/ContainerBox";
import Articles from "@/app/_components/Articles";
import useSwr from "swr";
import StadiumInfo from "@/app/_components/StadiumInfo";
import NFLBoxscore from "@/app/_components/NFL/NFLBoxscore";
import DivisionStandings from "@/app/_components/DivisionStandings";
import NFLScoringPlays from "@/app/_components/NFL/NFLScoringPlays";
import GameUserSelection from "@/app/_components/GameUserSelection";
import Loading from "@/app/_components/Loading";
import MatchupPredictor from "@/app/_components/MatchupPredictor";
import GameRecapArticle from "@/app/_components/GameRecapArticle";
import NFLGameLeaders from "@/app/_components/NFL/NFLGameLeaders";
import InjuryReport from "@/app/_components/InjuryReport";
import LastFive from "@/app/_components/LastFive";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function TeamPage({ params }: { params: { gameId: string } }) {
  const { data, isLoading } = useSwr(
    `https://nextjs-sportly.vercel.app/api/nfl/gameData/${params.gameId}`,
    fetcher
  );

  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  function gameLeaders() {}

  const desktopView = () => (
    <>
      <Box className="flex self-start flex-col justify-center items-center gap-3 basis-1/4">
        <NFLGameLeaders data={data} />
        <DivisionStandings data={data} isNFL={false} league="nba" />
        <StadiumInfo data={data} />
      </Box>

      <Box className="flex flex-col gap-3 basis-1/2">
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
      </Box>

      <Box className="flex self-start flex-col justify-center items-center gap-3 basis-1/4">
        <MatchupPredictor data={data} league="nfl" />
        <Articles title="NFL News" teamNews={data.gameData.news} limit={6} />
      </Box>
    </>
  );

  const mobileView = () => (
    <Box className="w-full flex flex-col justify-center items-center gap-3">
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
    </Box>
  );

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <>
        <GameUserSelection userSelection={"gamecast"} data={data} />
        <ContainerBox isDesktopScreen={isDesktopScreen}>
          {isDesktopScreen ? desktopView() : mobileView()}
        </ContainerBox>
      </>
    );
  }
}
