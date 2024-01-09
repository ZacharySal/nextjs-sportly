"use client";

import useMediaQuery from "@mui/material/useMediaQuery";
import Articles from "@/app/_components/Articles";
import ContainerBox from "@/app/_components/ContainerBox";
import LeagueUserSelection from "@/app/_components/LeagueUserSelection";
import LeagueStandings from "@/app/_components/NBA/NBALeagueStandings";

export default function Standings({ data }: { data: any }) {
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  const desktopView = () => (
    <>
      <div className="basis-2/3">
        <LeagueStandings data={data.standingsData.content.standings} league="nba" />
      </div>
      <div className="basis-1/4">
        <Articles title={`NBA News`} teamNews={data.scoreData.news} limit={5} />
      </div>
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
      <ContainerBox isDesktopScreen={isDesktopScreen}>
        {isDesktopScreen ? desktopView() : mobileView()}
      </ContainerBox>
    </>
  );
}
