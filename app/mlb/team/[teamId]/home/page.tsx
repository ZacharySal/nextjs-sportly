"use client";

import Articles from "@/app/_components/Articles";
import ContainerBox from "@/app/_components/ContainerBox";
import TeamUserSelection from "@/app/_components/TeamUserSelection";
import DesktopTeamSchedule from "@/app/_components/DesktopTeamSchedule";
import TeamNewsCards from "@/app/_components/TeamNewsCards";
import { useMediaQuery, Typography, Box } from "@mui/material";
import Loading from "@/app/_components/Loading";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function TeamPage({ params }: { params: { teamId: string } }) {
  const { data, isLoading } = useSWR(
    `https://nextjs-sportly.vercel.app/api/mlb/teamData/${params.teamId}`,
    fetcher
  );

  const desktopView = () => (
    <ContainerBox isDesktopScreen={isDesktopScreen}>
      <Box className="basis-1/4">
        <DesktopTeamSchedule data={data} league="mlb" />
      </Box>
      <Box className="basis-1/2">
        <TeamNewsCards data={data} league="mlb" />
      </Box>
      <Box className="basis-1/4">
        <Articles
          title={`${data.teamData.team.name} News`}
          teamNews={data.teamNews}
          limit={8}
        />
      </Box>
    </ContainerBox>
  );

  const mobileView = () => (
    <>
      <ContainerBox isDesktopScreen={isDesktopScreen}>
        <Box className="flex flex-col gap-3">
          <DesktopTeamSchedule data={data} league="mlb" />
          <TeamNewsCards data={data} league="mlb" />
        </Box>
      </ContainerBox>
    </>
  );
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  if (isLoading) return <Loading />;
  else {
    return isDesktopScreen ? desktopView() : mobileView();
  }
}
