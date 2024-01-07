"use client";

import { Box, useMediaQuery } from "@mui/material";
import ContainerBox from "@/app/_components/ContainerBox";
import Articles from "@/app/_components/Articles";
import TeamUserSelection from "@/app/_components/TeamUserSelection";
import Roster from "@/app/_components/NFL/NFLRoster";

export default function TeamPage({ data }: { data: any }) {
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  const desktopView = () => (
    <>
      <Box className="basis-3/4">
        <Roster data={data.teamRoster} />
      </Box>
      <Box className="basis-1/4 flex flex-col gap-3">
        <Articles title="Team News" limit={6} teamNews={data.teamNews} />
      </Box>
    </>
  );

  const mobileView = () => (
    <>
      <Roster data={data.teamRoster} />
    </>
  );

  return (
    <>
      <TeamUserSelection userSelection={"roster"} />
      <ContainerBox isDesktopScreen={isDesktopScreen}>
        {isDesktopScreen ? desktopView() : mobileView()}
      </ContainerBox>
    </>
  );
}
