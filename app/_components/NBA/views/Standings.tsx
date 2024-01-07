"use client";

import { Box, useMediaQuery } from "@mui/material";
import Articles from "@/app/_components/Articles";
import ContainerBox from "@/app/_components/ContainerBox";
import LeagueUserSelection from "@/app/_components/LeagueUserSelection";
import LeagueStandings from "@/app/_components/NBA/NBALeagueStandings";

export default function Standings({ data }: { data: any }) {
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  const desktopView = () => (
    <>
      <Box className="basis-2/3">
        <LeagueStandings data={data} league="nba" />
      </Box>
      <Box className="basis-1/4">
        <Articles title={`NBA News`} teamNews={data.news} limit={5} />
      </Box>
    </>
  );

  const mobileView = () => (
    <>
      <LeagueStandings data={data} league="nba" />
    </>
  );

  return (
    <>
      <LeagueUserSelection userSelection={"standings"} league="nba" />
      <ContainerBox isDesktopScreen={isDesktopScreen}>
        {isDesktopScreen ? desktopView() : mobileView()}
      </ContainerBox>
    </>
  );
}
