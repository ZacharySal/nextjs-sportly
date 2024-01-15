"use client";

import useMediaQuery from "@mui/material/useMediaQuery";
import ContainerBox from "@/components/ContainerBox";
import Articles from "@/components/Articles";
import TeamUserSelection from "@/components/TeamUserSelection";
import Roster from "@/components/NFL/NFLRoster";

export default function TeamPage({ data }: { data: any }) {
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

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
      <ContainerBox isDesktopScreen={isDesktopScreen}>
        {isDesktopScreen ? desktopView() : mobileView()}
      </ContainerBox>
    </>
  );
}
