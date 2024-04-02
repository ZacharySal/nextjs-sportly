"use client";

import LeagueContainerBox from "@/components/LeagueContainerBox";
import useMediaQuery from "@mui/material/useMediaQuery";
import Articles from "../../Articles";
import LeagueUserSelection from "../../LeagueUserSelection";
import Loading from "../../Loading";
import useHasHydrated from "../../hooks/useHasHyrdated";
import MLBScoreboard from "../MLBScoreboard";

export default function Home({ data, date }: { data: any; date?: string }) {
  const isDesktopScreen = useMediaQuery("(min-width:800px)");
  const pageHydrated = useHasHydrated();

  const desktopView = () => (
    <>
      <MLBScoreboard initialScoreData={data.scoreData} date={date} />
      <Articles
        title={`MLB News`}
        news={data.scoreData.news.articles}
        limit={10}
      />
    </>
  );

  const mobileView = () => (
    <MLBScoreboard initialScoreData={data.scoreData} date={date} />
  );

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
