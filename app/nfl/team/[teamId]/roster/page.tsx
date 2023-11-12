"use client";

import { Box, Typography, useMediaQuery } from "@mui/material";
import useSwr from "swr";
import ContainerBox from "@/app/_components/ContainerBox";
import Loading from "@/app/_components/Loading";
import FullTeamStats from "@/app/_components/FullTeamStats";
import DesktopTeamSchedule from "@/app/_components/DesktopTeamSchedule";
import Articles from "@/app/_components/Articles";
import TeamUserSelection from "@/app/_components/TeamUserSelection";
import Roster from "@/app/_components/NFL/NFLRoster";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function TeamPage({ params }: { params: { teamId: string } }) {
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  const { data, isLoading } = useSwr(
    `https://nextjs-sportly.vercel.app/api/nfl/teamData/${params.teamId}`,
    fetcher
  );

  if (!isLoading) {
    console.log(data);
  }

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

  if (isLoading) return <Loading />;
  else
    return (
      <>
        <TeamUserSelection userSelection={"roster"} />
        <ContainerBox isDesktopScreen={isDesktopScreen}>
          {isDesktopScreen ? desktopView() : mobileView()}
        </ContainerBox>
      </>
    );
}
