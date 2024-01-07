"use client";

import { Box, useMediaQuery } from "@mui/material";
import { mlbDivisonTeams } from "@/app/_lib/constants";
import Articles from "@/app/_components/Articles";
import ContainerBox from "@/app/_components/ContainerBox";
import AllTeams from "@/app/_components/AllTeams";
import LeagueUserSelection from "@/app/_components/LeagueUserSelection";

export default function Home({ data }: { data: any }) {
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  const desktopView = () => (
    <>
      <Box className="basis-2/3">
        <AllTeams allTeams={mlbDivisonTeams} league="mlb" />
      </Box>
      <Box className="basis-1/4">
        <Articles title={`MLB News`} teamNews={data.news} limit={10} />
      </Box>
    </>
  );

  const mobileView = () => <AllTeams allTeams={mlbDivisonTeams} league="mlb" />;

  return (
    <>
      <LeagueUserSelection userSelection={"teams"} league="mlb" />
      <ContainerBox isDesktopScreen={isDesktopScreen}>
        {isDesktopScreen ? desktopView() : mobileView()}
      </ContainerBox>
    </>
  );
}