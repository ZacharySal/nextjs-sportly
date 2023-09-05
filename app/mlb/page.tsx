"use client";

import { useMediaQuery } from "@mui/material";
import ContainerBox from "../_components/ContainerBox";
import Articles from "../_components/Articles";
import AllTeams from "../_components/AllTeams";
import Scoreboard from "../_components/Scoreboard";
import LeagueHeader from "../_components/LeagueHeader";
import { mlbDivisonTeams } from "../_lib/constants";
import useSwr from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, isLoading } = useSwr(
    "http://localhost:3000/mlb/api/mlbData",
    fetcher
  );
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  if (!isLoading) {
    console.log(data.days);
  }
  if (!isLoading) {
    return (
      <main>
        <LeagueHeader backgroundColor="002D72" league="mlb" />
        <ContainerBox
          altColor="002D72"
          mainColor="D50A0A"
          isDesktopScreen={isDesktopScreen}
        >
          <AllTeams allTeams={mlbDivisonTeams} league="mlb" />
          <Scoreboard seasonWeeks={data.days} league={"mlb"} />
          <Articles title={`MLB News`} teamNews={data.news} articleLimit={10} />
        </ContainerBox>
      </main>
    );
  }
}
