"use client";

import useMediaQuery from "@mui/material/useMediaQuery";
import Articles from "../../Articles";
import LeagueUserSelection from "../../LeagueUserSelection";
import Loading from "../../Loading";
import MLBScoreboard from "../MLBScoreboard";
import useHasHydrated from "../../hooks/useHasHyrdated";
import LeagueContainerBox from "@/components/LeagueContainerBox";

export default function Home({ data }: { data: any }) {
  const isDesktopScreen = useMediaQuery("(min-width:800px)");
  const pageHydrated = useHasHydrated();

  const desktopView = () => (
    <>
      <MLBScoreboard initialScoreData={data.scoreData} />
      <Articles title={`MLB News`} news={data.scoreData.news.articles} limit={10} />
    </>
  );

  const mobileView = () => <MLBScoreboard initialScoreData={data.scoreData} />;

  if (!pageHydrated) return <Loading />;
  else
    return (
      <>
        <LeagueUserSelection userSelection="scoreboard" league="mlb" />
        <LeagueContainerBox isDesktopScreen={isDesktopScreen}>
          {isDesktopScreen ? desktopView() : mobileView()}
        </LeagueContainerBox>
      </>
    );
}
