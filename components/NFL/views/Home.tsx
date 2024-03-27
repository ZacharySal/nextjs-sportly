"use client";

import useMediaQuery from "@mui/material/useMediaQuery";
import Articles from "../../Articles";
import LeagueUserSelection from "../../LeagueUserSelection";
import Loading from "../../Loading";
import NFLScoreboard from "../NFLScoreboard";
import useSWR from "swr";
import LeagueContainerBox from "@/components/LeagueContainerBox";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const isDesktopScreen = useMediaQuery("(min-width:800px)");

  const { data, isLoading } = useSWR(
    "https://nextjs-sportly.vercel.app/api/leagueData/nfl",
    fetcher,
    {
      refreshInterval: 5000,
    },
  );

  if (isLoading) return <Loading />;
  else {
    return (
      <main>
        {isDesktopScreen ? (
          <>
            <LeagueUserSelection userSelection={"scoreboard"} league="nfl" />
            <LeagueContainerBox isDesktopScreen={isDesktopScreen}>
              <NFLScoreboard initialScoreData={data} />
              <Articles
                title={`NFL News`}
                news={data.news.articles}
                limit={10}
              />
            </LeagueContainerBox>
          </>
        ) : (
          <>
            <LeagueUserSelection userSelection={"scoreboard"} league="nfl" />
            <LeagueContainerBox isDesktopScreen={isDesktopScreen}>
              <NFLScoreboard initialScoreData={data} />
            </LeagueContainerBox>
          </>
        )}
      </main>
    );
  }
}
