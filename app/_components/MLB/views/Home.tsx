"use client";

import useMediaQuery from "@mui/material/useMediaQuery";
import Articles from "../../Articles";
import ContainerBox from "../../ContainerBox";
import LeagueUserSelection from "../../LeagueUserSelection";
import Loading from "../../Loading";
import MLBScoreboard from "../MLBScoreboard";
import useHasHydrated from "../../hooks/useHasHyrdated";

export default function Home({ data }: { data: any }) {
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");
  const pageHydrated = useHasHydrated();

  const desktopView = () => (
    <>
      <div className="basis-3/4">
        <MLBScoreboard initialScoreData={data.scoreData} />
      </div>
      <div className="basis-1/4">
        <Articles title={`MLB News`} teamNews={data.scoreData.news} limit={10} />
      </div>
    </>
  );

  const mobileView = () => <MLBScoreboard initialScoreData={data.scoreData} />;

  if (!pageHydrated) return <Loading />;
  else
    return (
      <>
        <LeagueUserSelection userSelection="scoreboard" league="mlb" />
        <ContainerBox isDesktopScreen={isDesktopScreen}>
          {isDesktopScreen ? desktopView() : mobileView()}
        </ContainerBox>
      </>
    );
}
