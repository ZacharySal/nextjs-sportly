"use client";

import useMediaQuery from "@mui/material/useMediaQuery";
import { mlbDivisonTeams } from "@/lib/constants";
import Articles from "@/components/Articles";
import ContainerBox from "@/components/ContainerBox";
import AllTeams from "@/components/AllTeams";
import LeagueUserSelection from "@/components/LeagueUserSelection";

export default function Home({ data }: { data: any }) {
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  const desktopView = () => (
    <>
      <div className="basis-2/3">
        <AllTeams allTeams={mlbDivisonTeams} league="mlb" />
      </div>
      <div className="basis-1/4">
        <Articles title={`MLB News`} news={data.scoreData.news.articles} limit={10} />
      </div>
    </>
  );

  const mobileView = () => <AllTeams allTeams={mlbDivisonTeams} league="mlb" />;

  return (
    <>
      <LeagueUserSelection userSelection={"teams"} league="mlb" />
      <ContainerBox isDesktopScreen={isDesktopScreen}>
        {isDesktopScreen ? desktopView() : mobileView()}
      </ContainerBox>
    </>
  );
}
