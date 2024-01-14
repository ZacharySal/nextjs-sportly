"use client";

import useMediaQuery from "@mui/material/useMediaQuery";
import Articles from "../../Articles";
import ContainerBox from "../../ContainerBox";
import LeagueUserSelection from "../../LeagueUserSelection";
import Loading from "../../Loading";
import NBAScoreboard from "../NBAScoreboard";
import useSWR from "swr";
import { fetcher } from "../../../_lib/utils";

export default function Home() {
  const isDesktopScreen = useMediaQuery("(min-width:1000px");

  const { data, isLoading } = useSWR("http://localhost:3000/api/leagueData/nba", fetcher, {
    refreshInterval: 5000,
  });

  if (isLoading) return <Loading />;
  else
    return (
      <main>
        {isDesktopScreen ? (
          <>
            <LeagueUserSelection userSelection={"scoreboard"} league="nba" />
            <ContainerBox isDesktopScreen={isDesktopScreen}>
              <div className="basis-3/4">
                <NBAScoreboard initialScoreData={data} />
              </div>
              <div className="basis-1/4">
                <Articles title={`NBA News`} news={data.news.articles} limit={10} />
              </div>
            </ContainerBox>
          </>
        ) : (
          <>
            <LeagueUserSelection userSelection={"scoreboard"} league="nba" />
            <ContainerBox isDesktopScreen={isDesktopScreen}>
              <NBAScoreboard initialScoreData={data} />
            </ContainerBox>
          </>
        )}
      </main>
    );
}
