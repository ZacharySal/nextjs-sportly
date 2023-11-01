"use client";

import { Box, useMediaQuery } from "@mui/material";
import { useState } from "react";
import useSwr from "swr";
import Articles from "@/app/_components/Articles";
import ContainerBox from "@/app/_components/ContainerBox";
import LeagueUserSelection from "@/app/_components/LeagueUserSelection";
import LeagueStandings from "@/app/_components/LeagueStandings";
import Loading from "@/app/_components/Loading";
import LeagueHeader from "@/app/_components/LeagueHeader";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  const { data, isLoading } = useSwr(
    `https://nextjs-sportly.vercel.app/api/mlb/leagueData`,
    fetcher
  );

  const desktopView = () => (
    <>
      <Box className="basis-2/3">
        <LeagueStandings data={data} league="mlb" />
      </Box>
      <Box className="basis-1/4">
        <Articles title={`MLB News`} teamNews={data.news} limit={5} />
      </Box>
    </>
  );

  const mobileView = () => <LeagueStandings data={data} league="mlb" />;

  if (isLoading) return <Loading />;
  else {
    return (
      <>
        <LeagueUserSelection userSelection={"standings"} league="mlb" />
        <ContainerBox isDesktopScreen={isDesktopScreen}>
          {isDesktopScreen ? desktopView() : mobileView()}
        </ContainerBox>
      </>
    );
  }
}
