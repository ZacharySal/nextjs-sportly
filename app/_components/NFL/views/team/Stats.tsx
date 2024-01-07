"use client";

import { Box, useMediaQuery } from "@mui/material";
import ContainerBox from "@/app/_components/ContainerBox";
import FullTeamStats from "@/app/_components/FullTeamStats";
import Articles from "@/app/_components/Articles";
import TeamUserSelection from "@/app/_components/TeamUserSelection";

export default function Stats({ data }: { data: any }) {
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  const desktopView = () => (
    <>
      <Box className="basis-3/4">
        <FullTeamStats data={data} />
      </Box>
      <Box className="basis-1/4 flex flex-col gap-3">
        <Articles title="NFL News" limit={6} teamNews={data.teamNews} />
      </Box>
    </>
  );

  const mobileView = () => (
    <>
      <FullTeamStats data={data} />
    </>
  );

  return (
    <>
      <TeamUserSelection userSelection={"stats"} />
      <ContainerBox isDesktopScreen={isDesktopScreen}>
        {isDesktopScreen ? desktopView() : mobileView()}
      </ContainerBox>
    </>
  );
}
