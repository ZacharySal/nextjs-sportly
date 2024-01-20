"use client";

import useMediaQuery from "@mui/material/useMediaQuery";
import ContainerBox from "@/components/ContainerBox";
import Articles from "@/components/Articles";
import TeamUserSelection from "@/components/TeamUserSelection";
import TeamRoster from "@/components/NBA/NBARoster";
import LeagueContainerBox from "@/components/LeagueContainerBox";

export default function Roster({ data }: { data: any }) {
  const isDesktopScreen = useMediaQuery("(min-width:800px)");

  const desktopView = () => (
    <>
      <div className="basis-3/4">
        <TeamRoster data={data.teamRoster} />
      </div>
      <div className="flex basis-1/4 flex-col gap-3">
        <Articles
          title={`${data.teamData.team.name} News`}
          limit={6}
          news={data.teamNews.articles}
        />
      </div>
    </>
  );

  const mobileView = () => (
    <>
      <TeamRoster data={data.teamRoster} />
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
