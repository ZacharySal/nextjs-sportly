"use client";

import { nbaDivisionTeams } from "@/app/_lib/constants";
import { useMediaQuery, Box } from "@mui/material";
import { useState } from "react";
import AllTeams from "../../AllTeams";
import Articles from "../../Articles";
import ContainerBox from "../../ContainerBox";
import LeagueUserSelection from "../../LeagueUserSelection";
import Loading from "../../Loading";
import useHasHydrated from "../../hooks/useHasHyrdated";
import LeagueStandings from "../NBALeagueStandings";
import NBAScoreboard from "../NBAScoreboard";

export default function Home({ data }: { data: any }) {
  const [userSelection, setUserSelection] = useState("scoreboard");
  const isDesktopScreen = useMediaQuery("(min-width:1000px");
  const pageHydrated = useHasHydrated();

  if (!pageHydrated) return <Loading />;
  else
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
