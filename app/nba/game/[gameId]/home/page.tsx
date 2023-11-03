"use client";

import useSwr from "swr";
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
import InjuryReport from "@/app/_components/InjuryReport";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Page({ params }: { params: { gameId: string } }) {
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
      {data.gameData.leaders[0].leaders.length > 0 && <NBAGameLeaders data={data} />}
      {data.gameData.predictor && <MatchupPredictor data={data} league="nba" />}
      <DivisionStandings data={data} isNFL={false} league="nba" />
      <StadiumInfo data={data} />
    </Box>
  );

  const desktopView = () => (
    <>
      <Box className="flex self-start flex-col justify-center items-center gap-3 basis-1/4">
        <DivisionStandings data={data} isNFL={false} league="nba" />
        <StadiumInfo data={data} />
      </Box>

      <Box className="flex flex-col gap-3 basis-1/2">
        {!data.isGameStarted && (
          <>
            <GameRecapArticle data={data} />
            {data.gameData.leaders[0].leaders.length > 0 && <NBAGameLeaders data={data} />}
            <InjuryReport data={data} league="nba" />
          </>
        )}
        {data.isGameStarted && (
          <>
            <GameRecapArticle data={data} />
            {data.gameData.leaders[0].leaders.length > 0 && <NBAGameLeaders data={data} />}
            <NBABoxscore data={data} />
          </>
        )}
      </Box>

      <Box className="flex flex-col gap-3 basis-1/4">
        {data.gameData.predictor && <MatchupPredictor data={data} league="nba" />}
        {/* {data.gameData.seasonseries && <SeasonSeries data={data} />} */}
        <Articles title="NBA News" teamNews={data.gameData.news} limit={6} />
      </Box>
    </>
  );

  if (isLoading) return <Loading />;
  else {
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
