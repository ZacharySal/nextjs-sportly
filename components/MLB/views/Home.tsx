"use client";

import LeagueContainerBox from "@/components/LeagueContainerBox";
import useMediaQuery from "@mui/material/useMediaQuery";
import useSWR from "swr";
import Articles from "../../Articles";
import LeagueUserSelection from "../../LeagueUserSelection";
import Loading from "../../Loading";
import MLBScoreboard from "../MLBScoreboard";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home({ date }: { date?: string }) {
  const isDesktopScreen = useMediaQuery("(min-width:800px)");

  const { data, isLoading } = useSWR(
    "https://nextjs-sportly.vercel.app/api/leagueData/mlb",
    fetcher,
    {
      refreshInterval: 5000,
    },
  );

  const desktopView = () => (
    <>
      <MLBScoreboard initialScoreData={data} date={date} />
      <Articles title={`MLB News`} news={data.news.articles} limit={10} />
    </>
  );

  const mobileView = () => (
    <MLBScoreboard initialScoreData={data} date={date} />
  );

  if (isLoading) return <Loading />;
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
