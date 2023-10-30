"use client";

import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import useSwr from "swr";
import { mlbDivisonTeams } from "../_lib/constants";
import ContainerBox from "../_components/ContainerBox";
import Articles from "../_components/Articles";
import AllTeams from "../_components/AllTeams";
import { Box } from "@mui/material";
import LeagueHeader from "../_components/LeagueHeader";
import LeagueUserSelection from "../_components/LeagueUserSelection";
import Loading from "../_components/Loading";
import MLBScoreboard from "../_components/MLB/MLBScoreboard";
import LeagueStandings from "../_components/LeagueStandings";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const [userSelection, setUserSelection] = useState("scoreboard");

  const { data, isLoading } = useSwr(
    "https://nextjs-sportly.vercel.app/api/mlb/leagueData",
    fetcher
  );
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  if (isLoading) return <Loading />;
  else {
    return isDesktopScreen ? (
      <main>
        <LeagueUserSelection userSelection={userSelection} league="mlb" />
        <ContainerBox isDesktopScreen={isDesktopScreen}>
          <Box className="basis-2/3">
            <MLBScoreboard currentDate={data.currentDate} />
          </Box>
          <Box className="basis-1/4">
            <Articles title={`MLB News`} teamNews={data.news} limit={10} />
          </Box>
        </ContainerBox>
      </main>
    ) : (
      <main>
        <LeagueUserSelection userSelection={userSelection} league="mlb" />
        <ContainerBox isDesktopScreen={isDesktopScreen}>
          {userSelection === "teams" && (
            <AllTeams allTeams={mlbDivisonTeams} league="mlb" />
          )}
          {userSelection === "standings" && (
            <LeagueStandings data={data} league="mlb" />
          )}
          {userSelection === "scoreboard" && (
            <MLBScoreboard currentDate={data.currentDate} />
          )}
          {userSelection === "news" && (
            <Articles title={`MLB News`} teamNews={data.news} limit={10} />
          )}
        </ContainerBox>
      </main>
    );
  }
}
