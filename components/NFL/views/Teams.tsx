"use client";

import useMediaQuery from "@mui/material/useMediaQuery";
import { nflDivisonTeams } from "@/lib/constants";
import Articles from "@/components/Articles";
import AllTeams from "@/components/AllTeams";
import LeagueUserSelection from "@/components/LeagueUserSelection";
import LeagueContainerBox from "@/components/LeagueContainerBox";

export default function Teams({ data }: { data: any }) {
  const isDesktopScreen = useMediaQuery("(min-width:800px)");

  const desktopView = () => (
    <>
      <AllTeams allTeams={nflDivisonTeams} league="nfl" />
      <Articles title={`NFL News`} news={data.articles} limit={10} />
    </>
  );

  const mobileView = () => <AllTeams allTeams={nflDivisonTeams} league="nfl" />;

  return (
    <>
      <LeagueUserSelection userSelection={"teams"} league="nfl" />
      <LeagueContainerBox isDesktopScreen={isDesktopScreen}>
        {isDesktopScreen ? desktopView() : mobileView()}
      </LeagueContainerBox>
    </>
  );
}
