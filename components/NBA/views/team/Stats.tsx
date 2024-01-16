"use client";

import useMediaQuery from "@mui/material/useMediaQuery";
import ContainerBox from "@/components/ContainerBox";
import FullTeamStats from "@/components/FullTeamStats";
import Articles from "@/components/Articles";
import TeamUserSelection from "@/components/TeamUserSelection";
import LeagueContainerBox from "@/components/LeagueContainerBox";

export default function Stats({ data }: { data: any }) {
  const isDesktopScreen = useMediaQuery("(min-width:800px)");

  const desktopView = () => (
    <>
      <div className="basis-3/4">
        <FullTeamStats data={data} />
      </div>
      <div className="basis-1/4 flex flex-col gap-3">
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
      <FullTeamStats data={data} />
    </>
  );

  return (
    <>
      <TeamUserSelection userSelection={"stats"} />
      <LeagueContainerBox isDesktopScreen={isDesktopScreen}>
        {isDesktopScreen ? desktopView() : mobileView()}
      </LeagueContainerBox>
    </>
  );
}
