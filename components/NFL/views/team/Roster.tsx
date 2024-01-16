"use client";

import useMediaQuery from "@mui/material/useMediaQuery";
import ContainerBox from "@/components/ContainerBox";
import Articles from "@/components/Articles";
import TeamUserSelection from "@/components/TeamUserSelection";
import Roster from "@/components/NFL/NFLRoster";
import LeagueContainerBox from "@/components/LeagueContainerBox";

export default function TeamPage({ data }: { data: any }) {
  const isDesktopScreen = useMediaQuery("(min-width:800px)");

  const desktopView = () => (
    <>
      <div className="basis-3/4">
        <Roster data={data.teamRoster} />
      </div>
      <div className="basis-1/4 flex flex-col gap-3">
        <Articles title="Team News" limit={6} news={data.teamNews.articles} />
      </div>
    </>
  );

  const mobileView = () => (
    <>
      <Roster data={data.teamRoster} />
    </>
  );

  return (
    <>
      <TeamUserSelection userSelection={"roster"} />
      <LeagueContainerBox isDesktopScreen={isDesktopScreen}>
        {isDesktopScreen ? desktopView() : mobileView()}
      </LeagueContainerBox>
    </>
  );
}
