"use client";

import { Box, useMediaQuery } from "@mui/material";
import Articles from "@/app/_components/Articles";
import ContainerBox from "@/app/_components/ContainerBox";
import LeagueUserSelection from "@/app/_components/LeagueUserSelection";
import LeagueStandings from "@/app/_components/LeagueStandings";
import Loading from "@/app/_components/Loading";

export default function Standings({ data }: { data: any }) {
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  const desktopView = () => (
    <>
      <Box className="basis-2/3">
        <LeagueStandings data={data} league="nfl" />
      </Box>
      <Box className="basis-1/4">
        <Articles title={`NFL News`} teamNews={data.newsData} limit={5} />
      </Box>
    </>
  );

  const mobileView = () => <LeagueStandings data={data} league="nfl" />;

  return (
    <>
      <LeagueUserSelection userSelection={"standings"} league="nfl" />
      <ContainerBox isDesktopScreen={isDesktopScreen}>
        {isDesktopScreen ? desktopView() : mobileView()}
      </ContainerBox>
    </>
  );
}
