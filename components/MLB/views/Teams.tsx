"use client";

import useMediaQuery from "@mui/material/useMediaQuery";
import { mlbDivisonTeams } from "@/lib/constants";
import Articles from "@/components/Articles";
import AllTeams from "@/components/AllTeams";
import LeagueUserSelection from "@/components/LeagueUserSelection";
import LeagueContainerBox from "@/components/LeagueContainerBox";

export default function Home({ data }: { data: any }) {
  const isDesktopScreen = useMediaQuery("(min-width:800px)");

  const desktopView = () => (
    <>
      <AllTeams allTeams={mlbDivisonTeams} league="mlb" />
      <Articles
        title={`MLB News`}
        news={data.scoreData.news.articles}
        limit={10}
      />
    </>
  );

  const mobileView = () => <AllTeams allTeams={mlbDivisonTeams} league="mlb" />;

  return (
    <>
      <LeagueUserSelection userSelection={"teams"} league="mlb" />
      <LeagueContainerBox isDesktopScreen={isDesktopScreen}>
        {isDesktopScreen ? desktopView() : mobileView()}
      </LeagueContainerBox>
    </>
  );
}
