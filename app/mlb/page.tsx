"use client";

import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import useSwr from "swr";
import { mlbDivisonTeams } from "../_lib/constants";
import ContainerBox from "../_components/ContainerBox";
import Articles from "../_components/Articles";
import AllTeams from "../_components/AllTeams";
import LeagueHeader from "../_components/LeagueHeader";
import LeagueUserSelection from "../_components/LeagueUserSelection";
import Loading from "../_components/Loading";
import MLBScoreboard from "../_components/MLB/MLBScoreboard";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const [userSelection, setUserSelection] = useState("scoreboard");

  const { data, isLoading } = useSwr("https://nextjs-sportly.vercel.app/api/mlb/leagueData", fetcher);
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  if (isLoading) return <Loading />;
  else {
    return isDesktopScreen ? (
      <>
        <main>
          <LeagueHeader backgroundColor="002D72" league="mlb" />
          <ContainerBox altColor="002D72" mainColor="D50A0A" isDesktopScreen={isDesktopScreen}>
            <AllTeams allTeams={mlbDivisonTeams} league="mlb" />
            <MLBScoreboard currentDate={data.currentDate} />
            <Articles title={`MLB News`} teamNews={data.news} limit={10} />
          </ContainerBox>
        </main>
      </>
    ) : (
      <>
        <main>
          <LeagueHeader backgroundColor="002D72" league="mlb" />
          <LeagueUserSelection userSelection={userSelection} setUserSelection={setUserSelection} />
          <ContainerBox altColor="002D72" mainColor="D50A0A" isDesktopScreen={isDesktopScreen}>
            {userSelection === "teams" && <AllTeams allTeams={mlbDivisonTeams} league="mlb" />}
            {userSelection === "scoreboard" && <MLBScoreboard currentDate={data.currentDate} />}
            {userSelection === "news" && <Articles title={`MLB News`} teamNews={data.news} limit={10} />}
          </ContainerBox>
        </main>
      </>
    );
  }
}
