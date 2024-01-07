"use client";

import { Box, Typography, useMediaQuery } from "@mui/material";
import ContainerBox from "@/app/_components/ContainerBox";
import Articles from "@/app/_components/Articles";
import TeamUserSelection from "@/app/_components/TeamUserSelection";
import TeamRoster from "@/app/_components/NBA/NBARoster";

export default function Roster({ data }: { data: any }) {
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  const desktopView = () => (
    <>
      <Box className="basis-3/4">
        <TeamRoster data={data.teamRoster} />
      </Box>
      <Box className="basis-1/4 flex flex-col gap-3">
        <Articles title="NBA News" limit={6} teamNews={data.teamNews} />
      </Box>
    </>
  );

  const mobileView = () => (
    <>
      <TeamRoster data={data.teamRoster} />
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
