"use client";

import { Box, Typography, useMediaQuery } from "@mui/material";
import useSwr from "swr";
import ContainerBox from "@/app/_components/ContainerBox";
import Loading from "@/app/_components/Loading";
import FullTeamStats from "@/app/_components/FullTeamStats";
import DesktopTeamSchedule from "@/app/_components/DesktopTeamSchedule";
import Articles from "@/app/_components/Articles";
import TeamUserSelection from "@/app/_components/TeamUserSelection";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function TeamPage({ params }: { params: { teamId: string } }) {
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  const { data, isLoading } = useSwr(
    `https://nextjs-sportly.vercel.app/api/nfl/teamData/${params.teamId}`,
    fetcher,
    { refreshInterval: 5000 }
  );

  if (!isLoading) {
    console.log(data);
  }

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

  if (isLoading) return <Loading />;
  else
    return (
      <>
        <TeamUserSelection userSelection={"stats"} />
        <ContainerBox isDesktopScreen={isDesktopScreen}>
          {isDesktopScreen ? desktopView() : mobileView()}
        </ContainerBox>
      </>
    );
}
