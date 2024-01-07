"use client";

import Articles from "@/app/_components/Articles";
import ContainerBox from "@/app/_components/ContainerBox";
import DesktopTeamSchedule from "@/app/_components/DesktopTeamSchedule";
import TeamNewsCards from "@/app/_components/TeamNewsCards";
import { useMediaQuery, Typography, Box } from "@mui/material";

export default function Home({ data }: { data: any }) {
  const desktopView = () => (
    <ContainerBox isDesktopScreen={isDesktopScreen}>
      <Box className="basis-1/4">
        <DesktopTeamSchedule data={data} league="mlb" isTeamView={false} />
      </Box>
      <Box className="basis-1/2">
        <TeamNewsCards data={data} league="mlb" />
      </Box>
      <Box className="basis-1/4">
        <Articles title={`${data.teamData.team.name} News`} teamNews={data.teamNews} limit={8} />
      </Box>
    </ContainerBox>
  );

  const mobileView = () => (
    <>
      <ContainerBox isDesktopScreen={isDesktopScreen}>
        <Box className="flex flex-col gap-3">
          <DesktopTeamSchedule data={data} league="mlb" isTeamView={false} />
          <TeamNewsCards data={data} league="mlb" />
        </Box>
      </ContainerBox>
    </>
  );
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  return isDesktopScreen ? desktopView() : mobileView();
}
