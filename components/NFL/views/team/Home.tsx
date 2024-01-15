"use client";

import useMediaQuery from "@mui/material/useMediaQuery";
import Articles from "@/components/Articles";
import ContainerBox from "@/components/ContainerBox";
import DesktopTeamSchedule from "@/components/DesktopTeamSchedule";
import TeamNewsCards from "@/components/TeamNewsCards";
import TeamUserSelection from "@/components/TeamUserSelection";

export default function Home({ data }: { data: any }) {
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  const desktopView = () => (
    <>
      <div className="basis-1/4">
        <DesktopTeamSchedule data={data} league="nfl" isTeamView={false} />
      </div>

      <div className="basis-1/2">
        <TeamNewsCards data={data} league="nfl" />
      </div>

      <div className="flex flex-col gap-3 basis-1/4">
        <div className="bg-white p-3 pb-0 w-full rounded-xl h-max">
          <p className="px-3 py-1 mb-2 font-semibold text-base">2023 Team Stats</p>
          <div className="grid grid-cols-2 grid-rows-2 text-center justify-center border-t border-b border-dotted border-[rgba(0,0,0,0.3)]">
            <div className="w-full flex flex-col gap-1 border-r border-rgba(0,0,0,0.1) border-b py-2">
              <p className="text-sm opacity-60">Passing Yards</p>
              <p className="text-3xl opacity-80">{data.teamStats["Passing YPG"].displayValue}</p>
              <p className="opacity-70">{data.teamStats["Passing YPG"].rankDisplayValue}</p>
            </div>
            <div className="w-full flex flex-col gap-1 border-rgba(0,0,0,0.1) border-b py-2">
              <p className="text-sm opacity-60">Rushing Yards</p>
              <p className="text-3xl opacity-80">{data.teamStats["Rushing YPG"].displayValue}</p>
              <p className="opacity-70">{data.teamStats["Rushing YPG"].rankDisplayValue}</p>
            </div>
            <div className="w-full flex flex-col gap-1 border-r border-rgba(0,0,0,0.1) py-2">
              <p className="text-sm opacity-60 ">Total Points</p>
              <p className="text-3xl opacity-80">{data.teamStats["Total PPG"].displayValue}</p>
              <p className="opacity-70">{data.teamStats["Total PPG"].rankDisplayValue}</p>
            </div>
            <div className="w-full flex flex-col gap-1 py-2">
              <p className="text-sm opacity-60">3rd Down %</p>
              <p className="text-3xl opacity-80">{data.teamStats["3rd Down %"].displayValue}</p>
              <p className="opacity-70">{data.teamStats["3rd Down %"].rankDisplayValue}</p>
            </div>
          </div>
          {/* <Link href="stats"> */}
          <p className="text-center w-full h-full text-[13px] text-[#06c] cursor-pointer p-2 font-semibold">
            Full Team Stats
          </p>
          {/* </Link> */}
        </div>
        <Articles title="NFL News" limit={6} news={data.teamNews.articles} />
      </div>
    </>
  );

  const mobileView = () => (
    <>
      <TeamNewsCards data={data} league="nfl" />
    </>
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
