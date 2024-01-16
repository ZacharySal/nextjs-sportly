"use client";

import useMediaQuery from "@mui/material/useMediaQuery";
import { nbaDivisionTeams } from "@/lib/constants";
import Articles from "@/components/Articles";
import AllTeams from "@/components/AllTeams";
import LeagueUserSelection from "@/components/LeagueUserSelection";
import LeagueContainerBox from "@/components/LeagueContainerBox";

export default function Teams({ data }: { data: any }) {
  const isDesktopScreen = useMediaQuery("(min-width:800px)");

  const desktopView = () => (
    <>
      <AllTeams allTeams={nbaDivisionTeams} league="nba" />
      <Articles title={`NBA News`} news={data.articles} limit={10} />
    </>
  );

  const mobileView = () => <AllTeams allTeams={nbaDivisionTeams} league="nba" />;

  return (
    <>
      <LeagueUserSelection userSelection={"teams"} league="nba" />
      <LeagueContainerBox isDesktopScreen={isDesktopScreen}>
        {isDesktopScreen ? desktopView() : mobileView()}
      </LeagueContainerBox>
    </>
  );
}
