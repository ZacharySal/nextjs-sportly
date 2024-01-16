"use client";

import useMediaQuery from "@mui/material/useMediaQuery";
import Articles from "@/components/Articles";
import LeagueContainerBox from "@/components/LeagueContainerBox";
import LeagueUserSelection from "@/components/LeagueUserSelection";
import LeagueStandings from "@/components/NBA/NBALeagueStandings";

export default function Standings({ data }: { data: any }) {
  const isDesktopScreen = useMediaQuery("(min-width:800px)");

  const desktopView = () => (
    <>
      <LeagueStandings data={data.standingsData.content.standings} league="nba" />
      <Articles title={`NBA News`} news={data.newsData.articles} limit={5} />
    </>
  );

  const mobileView = () => (
    <>
      <LeagueStandings data={data.standingsData.content.standings} league="nba" />
    </>
  );

  return (
    <>
      <LeagueUserSelection userSelection={"standings"} league="nba" />
      <LeagueContainerBox isDesktopScreen={isDesktopScreen}>
        {isDesktopScreen ? desktopView() : mobileView()}
      </LeagueContainerBox>
    </>
  );
}
