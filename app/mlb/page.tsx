"use client";

import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import useSwr from "swr";
import { mlbDivisonTeams } from "../_lib/constants";
import ContainerBox from "../_components/ContainerBox";
import Articles from "../_components/Articles";
import AllTeams from "../_components/AllTeams";
import { Box } from "@mui/material";
import LeagueHeader from "../_components/LeagueHeader";
import LeagueUserSelection from "../_components/LeagueUserSelection";
import Loading from "../_components/Loading";
import MLBScoreboard from "../_components/MLB/MLBScoreboard";
import LeagueStandings from "../_components/LeagueStandings";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, isLoading } = useSwr(
    "https://nextjs-sportly.vercel.app/api/mlb/leagueData",
    fetcher
  );
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  const desktopView = () => (
    <>
      <Box className="basis-2/3">
        <MLBScoreboard currentDate={data.currentDate} />
      </Box>
      <Box className="basis-1/4">
        <Articles title={`MLB News`} teamNews={data.news} limit={10} />
      </Box>
    </>
  );

  const mobileView = () => <MLBScoreboard currentDate={data.currentDate} />;

  if (isLoading) return <Loading />;
  else {
    return (
      <>
        <LeagueUserSelection userSelection="scoreboard" league="mlb" />
        <ContainerBox isDesktopScreen={isDesktopScreen}>
          {isDesktopScreen ? desktopView() : mobileView()}
        </ContainerBox>
      </>
    );
  }
}
