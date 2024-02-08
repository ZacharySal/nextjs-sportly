"use client";

import useMediaQuery from "@mui/material/useMediaQuery";
import Articles from "@/components/Articles";
import LeagueUserSelection from "@/components/LeagueUserSelection";
import LeagueStandings from "@/components/LeagueStandings";
import LeagueContainerBox from "@/components/LeagueContainerBox";

export default function Standings({ data }: { data: any }) {
  const isDesktopScreen = useMediaQuery("(min-width:800px)");

  const desktopView = () => (
    <>
      <LeagueStandings
        data={data.standingsData.content.standings}
        league="nfl"
      />
      <Articles title={`NFL News`} news={data.newsData.articles} limit={5} />
    </>
  );

  const mobileView = () => (
    <LeagueStandings data={data.standingsData.content.standings} league="nfl" />
  );

  return (
    <>
      <LeagueUserSelection userSelection={"standings"} league="nfl" />
      <LeagueContainerBox isDesktopScreen={isDesktopScreen}>
        {isDesktopScreen ? desktopView() : mobileView()}
      </LeagueContainerBox>
    </>
  );
}
