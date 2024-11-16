"use client";

import LeagueContainerBox from "@/components/LeagueContainerBox";
import useMediaQuery from "@mui/material/useMediaQuery";
import useSWR from "swr";
import Articles from "../../Articles";
import LeagueUserSelection from "../../LeagueUserSelection";
import Loading from "../../Loading";
import NBAScoreboard from "../NBAScoreboard";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home({ date }: { date?: string }) {
  const isDesktopScreen = useMediaQuery("(min-width:1000px");

  console.log("rendering");

  const { data, isLoading } = useSWR(
    "https://nextjs-sportly.vercel.app/api/leagueData/nba",
    fetcher,
    {
      refreshInterval: 5000,
    },
  );

  if (isLoading) return <Loading />;
  else
    return (
      <main>
        {isDesktopScreen ? (
          <>
            <LeagueUserSelection userSelection={"scoreboard"} league="nba" />
            <LeagueContainerBox isDesktopScreen={isDesktopScreen}>
              <NBAScoreboard initialScoreData={data} date={date} />
              <Articles
                title={`NBA News`}
                news={data?.news?.articles}
                limit={10}
              />
            </LeagueContainerBox>
          </>
        ) : (
          <>
            <LeagueUserSelection userSelection={"scoreboard"} league="nba" />
            <LeagueContainerBox isDesktopScreen={isDesktopScreen}>
              <NBAScoreboard initialScoreData={data} date={date} />
            </LeagueContainerBox>
          </>
        )}
      </main>
    );
}
