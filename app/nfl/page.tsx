"use client";

import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import useSwr from "swr";
import { nflDivisonTeams } from "../_lib/constants";
import Articles from "../_components/Articles";
import ContainerBox from "../_components/ContainerBox";
import Scoreboard from "../_components/Scoreboard";
import LeagueHeader from "../_components/LeagueHeader";
import AllTeams from "../_components/AllTeams";
import LeagueUserSelection from "../_components/LeagueUserSelection";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const [userSelection, setUserSelection] = useState("scoreboard");
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  const { data, isLoading } = useSwr("https://nextjs-sportly.vercel.app/api/nfl/leagueData", fetcher);

  if (!isLoading) {
    return (
      <main>
        {isDesktopScreen ? (
          <>
            <LeagueHeader backgroundColor="013369" league="nfl" />
            <ContainerBox altColor="013369" mainColor="D50A0A" isDesktopScreen={isDesktopScreen}>
              <AllTeams allTeams={nflDivisonTeams} league="nfl" />
              <Scoreboard seasonWeeks={data.seasonWeeks} league="nfl" />
              <Articles title={`NFL News`} teamNews={data.newsData} limit={10} />
            </ContainerBox>
          </>
        ) : (
          <>
            <LeagueHeader backgroundColor="013369" league="nfl" />
            <LeagueUserSelection userSelection={userSelection} setUserSelection={setUserSelection} />
            <ContainerBox altColor="013369" mainColor="D50A0A" isDesktopScreen={isDesktopScreen}>
              {userSelection === "teams" && <AllTeams allTeams={nflDivisonTeams} league="nfl" />}
              {userSelection === "scoreboard" && <Scoreboard seasonWeeks={data.seasonWeeks} league="nfl" />}
              {userSelection === "news" && <Articles title={`NFL News`} teamNews={data.newsData} limit={10} />}
            </ContainerBox>
          </>
        )}
      </main>
    );
  }
}
