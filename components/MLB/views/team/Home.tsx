"use client";

import Articles from "@/components/Articles";
import ContainerBox from "@/components/ContainerBox";
import DesktopTeamSchedule from "@/components/DesktopTeamSchedule";
import TeamNewsCards from "@/components/TeamNewsCards";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Home({ data }: { data: any }) {
  const desktopView = () => (
    <ContainerBox isDesktopScreen={isDesktopScreen}>
      <div className="basis-1/4">
        <DesktopTeamSchedule data={data} league="mlb" isTeamView={false} />
      </div>
      <div className="basis-1/2">
        <TeamNewsCards data={data} league="mlb" />
      </div>
      <div className="basis-1/4">
        <Articles
          title={`${data.teamData.team.name} News`}
          news={data.teamNews.articles}
          limit={8}
        />
      </div>
    </ContainerBox>
  );

  const mobileView = () => (
    <>
      <ContainerBox isDesktopScreen={isDesktopScreen}>
        <div className="flex flex-col gap-3">
          <DesktopTeamSchedule data={data} league="mlb" isTeamView={false} />
          <TeamNewsCards data={data} league="mlb" />
        </div>
      </ContainerBox>
    </>
  );
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  return isDesktopScreen ? desktopView() : mobileView();
}
