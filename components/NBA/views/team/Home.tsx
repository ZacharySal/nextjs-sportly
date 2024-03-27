"use client";

import Articles from "@/components/Articles";
import ContainerBox from "@/components/ContainerBox";
import useMediaQuery from "@mui/material/useMediaQuery";
import DesktopTeamSchedule from "@/components/DesktopTeamSchedule";
import TeamNewsCards from "@/components/TeamNewsCards";
import Link from "next/link";
import TeamUserSelection from "@/components/TeamUserSelection";

export default function TeamPage({ data }: { data: any }) {
  const isDesktopScreen = useMediaQuery("(min-width:800px)");

  const desktopView = () => (
    <>
      <div className="basis-1/4">
        <DesktopTeamSchedule data={data} league="nba" isTeamView={false} />
      </div>

      <div className="basis-1/2">
        <TeamNewsCards league="nba" data={data} />
      </div>

      <div className="flex basis-1/4 flex-col gap-3">
        <div className="h-max w-full rounded-xl bg-white p-3 pb-0">
          <p className="mb-2 px-3 py-1 text-base font-semibold">
            2023 Team Stats
          </p>
          <div className="grid grid-cols-2 grid-rows-2 justify-center border-b border-t border-dotted border-[rgba(0,0,0,0.3)] text-center">
            <div className="border-rgba(0,0,0,0.1) flex w-full flex-col gap-1 border-b border-r py-2">
              <p className="text-sm opacity-60">Points Per Game</p>
              <p className="text-3xl opacity-80">
                {data.teamStats["Points Per Game"].displayValue}
              </p>
              <p className="opacity-70">
                {data.teamStats["Points Per Game"].rankDisplayValue}
              </p>
            </div>
            <div className="border-rgba(0,0,0,0.1) flex w-full flex-col gap-1 border-b py-2">
              <p className="text-sm opacity-60">Assists Per Game</p>
              <p className="text-3xl opacity-80">
                {data.teamStats["Assists Per Game"].displayValue}
              </p>
              <p className="opacity-70">
                {data.teamStats["Assists Per Game"].rankDisplayValue}
              </p>
            </div>
            <div className="border-rgba(0,0,0,0.1) flex w-full flex-col gap-1 border-r py-2">
              <p className="text-sm opacity-60 ">Rebounds Per Game</p>
              <p className="text-3xl opacity-80">
                {data.teamStats["Rebounds Per Game"].displayValue}
              </p>
              <p className="opacity-70">
                {data.teamStats["Rebounds Per Game"].rankDisplayValue}
              </p>
            </div>
            <div className="flex w-full flex-col gap-1 py-2">
              <p className="text-sm opacity-60">3rd Point %</p>
              <p className="text-3xl opacity-80">
                {data.teamStats["3 Point %"].displayValue}
              </p>
              <p className="opacity-70">
                {data.teamStats["3 Point %"].rankDisplayValue}
              </p>
            </div>
          </div>
          <Link href="stats">
            <p className="h-full w-full cursor-pointer p-2 text-center text-[13px] font-semibold text-[#06c]">
              Full Team Stats
            </p>
          </Link>
        </div>
        <Articles
          title={`${data.teamData.team.name} News`}
          news={data.teamNews.articles}
          limit={8}
        />
      </div>
    </>
  );

  const mobileView = () => (
    <div className="flex w-full flex-col">
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
