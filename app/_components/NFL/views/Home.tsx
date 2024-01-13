"use client";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import Articles from "../../Articles";
import ContainerBox from "../../ContainerBox";
import LeagueUserSelection from "../../LeagueUserSelection";
import Loading from "../../Loading";
import NFLScoreboard from "../NFLScoreboard";
import useHasHydrated from "../../hooks/useHasHyrdated";

export default function Home({ data }: { data: any }) {
  const [userSelection, setUserSelection] = useState("scoreboard");
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");
  const pageHydrated = useHasHydrated();

  if (!pageHydrated) return <Loading />;
  else {
    return (
      <main>
        {isDesktopScreen ? (
          <>
            <LeagueUserSelection userSelection={userSelection} league="nfl" />
            <ContainerBox isDesktopScreen={isDesktopScreen}>
              <div className="basis-3/4">
                <NFLScoreboard initialScoreData={data.scoreData} />
              </div>
              <div className="basis-1/4">
                <Articles title={`NFL News`} news={data.scoreData.news.articles} limit={10} />
              </div>
            </ContainerBox>
          </>
        ) : (
          <>
            <LeagueUserSelection userSelection={userSelection} league="nfl" />
            <ContainerBox isDesktopScreen={isDesktopScreen}>
              <NFLScoreboard initialScoreData={data.scoreData} />
            </ContainerBox>
          </>
        )}
      </main>
    );
  }
}
