"use client";

import Articles from "@/app/_components/Articles";
import ContainerBox from "@/app/_components/ContainerBox";
import useSwr from "swr";
import { useMediaQuery, Box, Typography } from "@mui/material";
import Loading from "@/app/_components/Loading";
import DesktopTeamSchedule from "@/app/_components/DesktopTeamSchedule";
import TeamNewsCards from "@/app/_components/TeamNewsCards";
import Link from "next/link";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function TeamPage({ params }: { params: { teamId: string } }) {
  const { data, isLoading } = useSwr(
    `https://nextjs-sportly.vercel.app/api/nba/teamData/${params.teamId}`,
    fetcher
  );

  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  const desktopView = () => (
    <>
      <Box className="basis-1/4">
        <DesktopTeamSchedule data={data} league="nba" />
      </Box>

      <Box className="basis-1/2">
        {/* <TeamSchedule teamSchedule={data.teamSchedule} league="nfl" /> */}
        <TeamNewsCards league="nba" data={data} />
      </Box>

      <Box className="flex flex-col gap-3 basis-1/4">
        <Box className="bg-white p-3 pb-0 w-full rounded-xl h-max">
          <Typography className="px-3 py-1 mb-2 font-semibold text-base opacity-80">
            2023 Team Stats
          </Typography>
          <Box className="grid grid-cols-2 grid-rows-2 text-center justify-center border-t border-b border-dotted border-[rgba(0,0,0,0.3)]">
            <Box className="w-full flex flex-col gap-1 border-r border-rgba(0,0,0,0.1) border-b py-2">
              <Typography className="text-sm opacity-60">
                Points Per Game
              </Typography>
              <Typography className="text-3xl opacity-80">
                {data.teamStats["Points Per Game"].displayValue}
              </Typography>
              <Typography className="opacity-70">
                {data.teamStats["Points Per Game"].rankDisplayValue}
              </Typography>
            </Box>
            <Box className="w-full flex flex-col gap-1 border-rgba(0,0,0,0.1) border-b py-2">
              <Typography className="text-sm opacity-60">
                Assists Per Game
              </Typography>
              <Typography className="text-3xl opacity-80">
                {data.teamStats["Assists Per Game"].displayValue}
              </Typography>
              <Typography className="opacity-70">
                {data.teamStats["Assists Per Game"].rankDisplayValue}
              </Typography>
            </Box>
            <Box className="w-full flex flex-col gap-1 border-r border-rgba(0,0,0,0.1) py-2">
              <Typography className="text-sm opacity-60 ">
                Rebounds Per Game
              </Typography>
              <Typography className="text-3xl opacity-80">
                {data.teamStats["Rebounds Per Game"].displayValue}
              </Typography>
              <Typography className="opacity-70">
                {data.teamStats["Rebounds Per Game"].rankDisplayValue}
              </Typography>
            </Box>
            <Box className="w-full flex flex-col gap-1 py-2">
              <Typography className="text-sm opacity-60">
                3rd Point %
              </Typography>
              <Typography className="text-3xl opacity-80">
                {data.teamStats["3 Point %"].displayValue}
              </Typography>
              <Typography className="opacity-70">
                {data.teamStats["3 Point %"].rankDisplayValue}
              </Typography>
            </Box>
          </Box>
          <Link href="stats">
            <Typography className="text-center w-full h-full text-[13px] text-[#06c] cursor-pointer p-2 font-semibold">
              Full Team Stats
            </Typography>
          </Link>
        </Box>
        <Articles
          title={`${data.teamData.team.name} News`}
          teamNews={data.teamNews}
          limit={8}
        />
      </Box>
    </>
  );

  const mobileView = () => (
    <Box className="w-full flex flex-col">
      <TeamNewsCards data={data} league="nba" />
      <DesktopTeamSchedule data={data} league="nba" />
    </Box>
  );

  if (isLoading) return <Loading />;
  else {
    return (
      <ContainerBox isDesktopScreen={isDesktopScreen}>
        {isDesktopScreen ? desktopView() : mobileView()}
      </ContainerBox>
    );
  }
}