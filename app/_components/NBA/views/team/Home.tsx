"use client";

import Articles from "@/app/_components/Articles";
import ContainerBox from "@/app/_components/ContainerBox";
import useMediaQuery from "@mui/material/useMediaQuery";
import DesktopTeamSchedule from "@/app/_components/DesktopTeamSchedule";
import TeamNewsCards from "@/app/_components/TeamNewsCards";
import Link from "next/link";
import TeamUserSelection from "@/app/_components/TeamUserSelection";

export default function TeamPage({ data }: { data: any }) {
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  const desktopView = () => (
    <>
      <div className="basis-1/4">
        <DesktopTeamSchedule data={data} league="nba" isTeamView={false} />
      </div>

      <div className="basis-1/2">
        <TeamNewsCards league="nba" data={data} />
      </div>

      <div className="flex flex-col gap-3 basis-1/4">
        <div className="bg-white p-3 pb-0 w-full rounded-xl h-max">
          <p className="px-3 py-1 mb-2 font-semibold text-base">2023 Team Stats</p>
          <div className="grid grid-cols-2 grid-rows-2 text-center justify-center border-t border-b border-dotted border-[rgba(0,0,0,0.3)]">
            <div className="w-full flex flex-col gap-1 border-r border-rgba(0,0,0,0.1) border-b py-2">
              <p className="text-sm opacity-60">Points Per Game</p>
              <p className="text-3xl opacity-80">
                {data.teamStats["Points Per Game"].displayValue}
              </p>
              <p className="opacity-70">{data.teamStats["Points Per Game"].rankDisplayValue}</p>
            </div>
            <div className="w-full flex flex-col gap-1 border-rgba(0,0,0,0.1) border-b py-2">
              <p className="text-sm opacity-60">Assists Per Game</p>
              <p className="text-3xl opacity-80">
                {data.teamStats["Assists Per Game"].displayValue}
              </p>
              <p className="opacity-70">{data.teamStats["Assists Per Game"].rankDisplayValue}</p>
            </div>
            <div className="w-full flex flex-col gap-1 border-r border-rgba(0,0,0,0.1) py-2">
              <p className="text-sm opacity-60 ">Rebounds Per Game</p>
              <p className="text-3xl opacity-80">
                {data.teamStats["Rebounds Per Game"].displayValue}
              </p>
              <p className="opacity-70">{data.teamStats["Rebounds Per Game"].rankDisplayValue}</p>
            </div>
            <div className="w-full flex flex-col gap-1 py-2">
              <p className="text-sm opacity-60">3rd Point %</p>
              <p className="text-3xl opacity-80">{data.teamStats["3 Point %"].displayValue}</p>
              <p className="opacity-70">{data.teamStats["3 Point %"].rankDisplayValue}</p>
            </div>
          </div>
          <Link href="stats">
            <p className="text-center w-full h-full text-[13px] text-[#06c] cursor-pointer p-2 font-semibold">
              Full Team Stats
            </p>
          </Link>
        </div>
        <Articles title={`${data.teamData.team.name} News`} teamNews={data.teamNews} limit={8} />
      </div>
    </>
  );

  const mobileView = () => (
    <div className="w-full flex flex-col">
      <TeamNewsCards data={data} league="nba" />
    </div>
  );

  return (
    <>
      <TeamUserSelection userSelection={"home"} />
      <ContainerBox isDesktopScreen={isDesktopScreen}>
        {isDesktopScreen ? desktopView() : mobileView()}
      </ContainerBox>
    </>
  );
}
