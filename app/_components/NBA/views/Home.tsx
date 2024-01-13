"use client";

import useMediaQuery from "@mui/material/useMediaQuery";
import Articles from "../../Articles";
import ContainerBox from "../../ContainerBox";
import LeagueUserSelection from "../../LeagueUserSelection";
import Loading from "../../Loading";
import useHasHydrated from "../../hooks/useHasHyrdated";
import NBAScoreboard from "../NBAScoreboard";

export default function Home({ data }: { data: any }) {
  const isDesktopScreen = useMediaQuery("(min-width:1000px");
  const pageHydrated = useHasHydrated();

  if (!pageHydrated) return <Loading />;
  else
    return (
      <main>
        {isDesktopScreen ? (
          <>
            <LeagueUserSelection userSelection={"scoreboard"} league="nba" />
            <ContainerBox isDesktopScreen={isDesktopScreen}>
              <div className="basis-3/4">
                <NBAScoreboard initialScoreData={data.scoreData} />
              </div>
              <div className="basis-1/4">
                <Articles title={`NBA News`} news={data.scoreData.news.articles} limit={10} />
              </div>
            </ContainerBox>
          </>
        ) : (
          <>
            <LeagueUserSelection userSelection={"scoreboard"} league="nba" />
            <ContainerBox isDesktopScreen={isDesktopScreen}>
              <NBAScoreboard initialScoreData={data.scoreData} />
            </ContainerBox>
          </>
        )}
      </main>
    );
}
