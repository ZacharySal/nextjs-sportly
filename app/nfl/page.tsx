"use client";

import { Box, useMediaQuery } from "@mui/material";
import { useState } from "react";
import useSwr from "swr";
import { nflDivisonTeams } from "../_lib/constants";
import Articles from "../_components/Articles";
import ContainerBox from "../_components/ContainerBox";
import Scoreboard from "../_components/NFL/NFLScoreboard";
import LeagueHeader from "../_components/LeagueHeader";
import AllTeams from "../_components/AllTeams";
import LeagueUserSelection from "../_components/LeagueUserSelection";
import LeagueStandings from "../_components/LeagueStandings";
import Loading from "../_components/Loading";
import Navbar from "../_components/Navbar";
import MobileNavbar from "../_components/MobileNavbar";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const [userSelection, setUserSelection] = useState("scoreboard");
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  const { data, isLoading } = useSwr(
    `https://nextjs-sportly.vercel.app/api/nfl/leagueData`,
    fetcher
  );

  if (isLoading) return <Loading />;
  else {
    return (
      <main>
        {isDesktopScreen ? (
          <>
            <Navbar />
            <LeagueUserSelection userSelection={userSelection} league="nfl" />
            <ContainerBox isDesktopScreen={isDesktopScreen}>
              <Box className="basis-2/3">
                <Scoreboard seasonData={data} />
              </Box>
              <Box className="basis-1/4">
                <Articles title={`NFL News`} teamNews={data.newsData} limit={10} />
              </Box>
            </ContainerBox>
          </>
        ) : (
          <>
            {/* <LeagueHeader backgroundColor="013369" league="nfl" /> */}
            <MobileNavbar />
            <LeagueUserSelection userSelection={userSelection} league="nfl" />
            <ContainerBox isDesktopScreen={isDesktopScreen}>
              <Scoreboard seasonData={data} />
            </ContainerBox>
          </>
        )}
      </main>
    );
  }
}
