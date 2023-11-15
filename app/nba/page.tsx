"use client";

import Articles from "../_components/Articles";
import LeagueUserSelection from "../_components/LeagueUserSelection";
import ContainerBox from "../_components/ContainerBox";
import NBAScoreboard from "../_components/NBA/NBAScoreboard";
import LeagueHeader from "../_components/LeagueHeader";
import AllTeams from "../_components/AllTeams";
import { nbaDivisionTeams } from "../_lib/constants";
import useSwr from "swr";
import { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import Loading from "../_components/Loading";
import LeagueStandings from "../_components/LeagueStandings";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const [userSelection, setUserSelection] = useState("scoreboard");

  const { data, isLoading } = useSwr(
    "https://nextjs-sportly.vercel.app/api/nba/leagueData",
    fetcher
  );

  const isDesktopScreen = useMediaQuery("(min-width:1000px");

  if (isLoading) return <Loading />;
  else {
    return (
      <main>
        {isDesktopScreen ? (
          <>
            <LeagueUserSelection userSelection={userSelection} league="nba" />
            <ContainerBox isDesktopScreen={isDesktopScreen}>
              <Box className="basis-3/4">
                <NBAScoreboard currentDate={data.currentDate} />
              </Box>
              <Box className="basis-1/4">
                <Articles title={`NBA News`} teamNews={data.news} limit={10} />
              </Box>
            </ContainerBox>
          </>
        ) : (
          <>
            <LeagueUserSelection userSelection={userSelection} league="nba" />
            <ContainerBox isDesktopScreen={isDesktopScreen}>
              {userSelection === "teams" && <AllTeams allTeams={nbaDivisionTeams} league="nba" />}
              {userSelection === "scoreboard" && <NBAScoreboard currentDate={data.currentDate} />}
              {userSelection === "standings" && <LeagueStandings data={data} league="nba" />}
              {userSelection === "news" && (
                <Articles title={`NBA News`} teamNews={data.news} limit={10} />
              )}
            </ContainerBox>
          </>
        )}
      </main>
    );
  }
}
