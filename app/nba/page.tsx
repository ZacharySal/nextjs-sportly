"use client";

import Articles from "../_components/Articles";
import LeagueUserSelection from "../_components/LeagueUserSelection";
import ContainerBox from "../_components/ContainerBox";
import Scoreboard from "../_components/Scoreboard";
import LeagueHeader from "../_components/LeagueHeader";
import AllTeams from "../_components/AllTeams";
import { nbaDivisionTeams } from "../_lib/constants";
import useSwr from "swr";
import { useState } from "react";
import { useMediaQuery } from "@mui/material";
import Loading from "../_components/Loading";
import NBAScoreboard from "../_components/NBA/NBAScoreboard";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const [userSelection, setUserSelection] = useState("scoreboard");

  const { data, isLoading } = useSwr("https://nextjs-sportly.vercel.app/api/nba/leagueData", fetcher);

  const isDesktopScreen = useMediaQuery("(min-width:1000px");

  if (isLoading) return <Loading />;
  else {
    return (
      <main>
        {isDesktopScreen ? (
          <>
            <LeagueHeader backgroundColor="013369" league="nba" />
            <ContainerBox altColor="013369" mainColor="D50A0A" isDesktopScreen={isDesktopScreen}>
              <AllTeams allTeams={nbaDivisionTeams} league="nba" />
              <Scoreboard
                seasonWeeks={data.nbaWeeks}
                league="nba"
                events={null}
                year={null}
                type={null}
                setYear={null}
                setType={null}
              />
              <Articles title={`NBA News`} teamNews={data.news} limit={10} />
            </ContainerBox>
          </>
        ) : (
          <>
            <LeagueHeader backgroundColor="013369" league="nba" />
            <LeagueUserSelection userSelection={userSelection} setUserSelection={setUserSelection} />
            <ContainerBox altColor="013369" mainColor="D50A0A" isDesktopScreen={isDesktopScreen}>
              {userSelection === "teams" && <AllTeams allTeams={nbaDivisionTeams} league="nba" />}
              {userSelection === "scoreboard" && <NBAScoreboard currentDate={data.currentDate} />}
              {userSelection === "news" && <Articles title={`NBA News`} teamNews={data.news} limit={10} />}
            </ContainerBox>
          </>
        )}
      </main>
    );
  }
}
