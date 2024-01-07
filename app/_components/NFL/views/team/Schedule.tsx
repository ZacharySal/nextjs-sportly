"use client";

import Articles from "@/app/_components/Articles";
import ContainerBox from "@/app/_components/ContainerBox";
import { useMediaQuery, Box, Typography } from "@mui/material";
import DesktopTeamSchedule from "@/app/_components/DesktopTeamSchedule";
import Link from "next/link";
import TeamUserSelection from "@/app/_components/TeamUserSelection";

export default function Schedule({ data }: { data: any }) {
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  const desktopView = () => (
    <>
      <Box className="basis-1/2">
        <DesktopTeamSchedule data={data} league="nfl" isTeamView={true} />
      </Box>

      <Box className="flex flex-col gap-3 basis-1/4">
        <Box className="bg-white p-3 pb-0 w-full rounded-xl h-max">
          <Typography className="px-3 py-1 mb-2 font-semibold text-base opacity-80">
            2023 Team Stats
          </Typography>
          <Box className="grid grid-cols-2 grid-rows-2 text-center justify-center border-t border-b border-dotted border-[rgba(0,0,0,0.3)]">
            <Box className="w-full flex flex-col gap-1 border-r border-rgba(0,0,0,0.1) border-b py-2">
              <Typography className="text-sm opacity-60">Passing Yards</Typography>
              <Typography className="text-3xl opacity-80">
                {data.teamStats["Passing YPG"].displayValue}
              </Typography>
              <Typography className="opacity-70">
                {data.teamStats["Passing YPG"].rankDisplayValue}
              </Typography>
            </Box>
            <Box className="w-full flex flex-col gap-1 border-rgba(0,0,0,0.1) border-b py-2">
              <Typography className="text-sm opacity-60">Rushing Yards</Typography>
              <Typography className="text-3xl opacity-80">
                {data.teamStats["Rushing YPG"].displayValue}
              </Typography>
              <Typography className="opacity-70">
                {data.teamStats["Rushing YPG"].rankDisplayValue}
              </Typography>
            </Box>
            <Box className="w-full flex flex-col gap-1 border-r border-rgba(0,0,0,0.1) py-2">
              <Typography className="text-sm opacity-60 ">Total Points</Typography>
              <Typography className="text-3xl opacity-80">
                {data.teamStats["Total PPG"].displayValue}
              </Typography>
              <Typography className="opacity-70">
                {data.teamStats["Total PPG"].rankDisplayValue}
              </Typography>
            </Box>
            <Box className="w-full flex flex-col gap-1 py-2">
              <Typography className="text-sm opacity-60">3rd Down %</Typography>
              <Typography className="text-3xl opacity-80">
                {data.teamStats["3rd Down %"].displayValue}
              </Typography>
              <Typography className="opacity-70">
                {data.teamStats["3rd Down %"].rankDisplayValue}
              </Typography>
            </Box>
          </Box>
          <Link href="stats">
            <Typography className="text-center w-full h-full text-[13px] text-[#06c] cursor-pointer p-2 font-semibold">
              Full Team Stats
            </Typography>
          </Link>
        </Box>
        <Articles title={`${data.teamData.team.name} News`} teamNews={data.teamNews} limit={8} />
      </Box>
    </>
  );

  const mobileView = () => (
    <Box className="w-full flex flex-col">
      <DesktopTeamSchedule data={data} league="nfl" isTeamView={true} />
    </Box>
  );

  return (
    <>
      <TeamUserSelection userSelection={"schedule"} />
      <ContainerBox isDesktopScreen={isDesktopScreen}>
        {isDesktopScreen ? desktopView() : mobileView()}
      </ContainerBox>
    </>
  );
}
