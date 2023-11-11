"use client";

import { Box, useMediaQuery } from "@mui/material";
import { useState } from "react";
import useSwr from "swr";
import { nflDivisonTeams } from "@/app/_lib/constants";
import Articles from "@/app/_components/Articles";
import ContainerBox from "@/app/_components/ContainerBox";
import AllTeams from "@/app/_components/AllTeams";
import LeagueUserSelection from "@/app/_components/LeagueUserSelection";
import Loading from "@/app/_components/Loading";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  const { data, isLoading } = useSwr(
    `https://nextjs-sportly.vercel.app/api/nfl/leagueData`,
    fetcher,
    { refreshInterval: 5000 }
  );

  const desktopView = () => (
    <>
      <Box className="basis-2/3">
        <AllTeams allTeams={nflDivisonTeams} league="nfl" />
      </Box>
      <Box className="basis-1/4">
        <Articles title={`NFL News`} teamNews={data.newsData} limit={10} />
      </Box>
    </>
  );

  const mobileView = () => <AllTeams allTeams={nflDivisonTeams} league="nfl" />;

  if (isLoading) return <Loading />;
  else {
    return (
      <>
        <LeagueUserSelection userSelection={"teams"} league="nfl" />
        <ContainerBox isDesktopScreen={isDesktopScreen}>
          {isDesktopScreen ? desktopView() : mobileView()}
        </ContainerBox>
      </>
    );
  }
}
