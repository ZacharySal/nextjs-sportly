"use client";

import useMediaQuery from "@mui/material/useMediaQuery";
import Articles from "../../Articles";
import ContainerBox from "../../ContainerBox";
import LeagueUserSelection from "../../LeagueUserSelection";
import Loading from "../../Loading";
import NFLScoreboard from "../NFLScoreboard";
import { fetcher } from "@/app/_lib/utils";
import useSWR from "swr";

export default function Home() {
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  const { data, isLoading } = useSWR("http://localhost:3000/api/leagueData/nfl", fetcher, {
    refreshInterval: 5000,
  });

  if (isLoading) return <Loading />;
  else {
    return (
      <main>
        {isDesktopScreen ? (
          <>
            <LeagueUserSelection userSelection={"scoreboard"} league="nfl" />
            <ContainerBox isDesktopScreen={isDesktopScreen}>
              <div className="basis-3/4">
                <NFLScoreboard initialScoreData={data} />
              </div>
              <div className="basis-1/4">
                <Articles title={`NFL News`} news={data.news.articles} limit={10} />
              </div>
            </ContainerBox>
          </>
        ) : (
          <>
            <LeagueUserSelection userSelection={"scoreboard"} league="nfl" />
            <ContainerBox isDesktopScreen={isDesktopScreen}>
              <NFLScoreboard initialScoreData={data} />
            </ContainerBox>
          </>
        )}
      </main>
    );
  }
}
