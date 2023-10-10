"use client";

import { useMediaQuery } from "@mui/material";
import { Suspense, useState } from "react";
import useSwr from "swr";
import { nflDivisonTeams } from "../_lib/constants";
import Articles from "../_components/Articles";
import ContainerBox from "../_components/ContainerBox";
import Scoreboard from "../_components/Scoreboard";
import LeagueHeader from "../_components/LeagueHeader";
import AllTeams from "../_components/AllTeams";
import LeagueUserSelection from "../_components/LeagueUserSelection";
import Loading from "../_components/Loading";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const [userSelection, setUserSelection] = useState("scoreboard");
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  const [year, setYear] = useState("2023");
  const [type, setType] = useState("2");

  const { data, isLoading } = useSwr(`https://nextjs-sportly.vercel.app/api/nfl/leagueData/${year}/${type}`, fetcher);

  if (isLoading) return <Loading />;
  else {
    return (
      <main>
        {isDesktopScreen ? (
          <>
            <LeagueHeader backgroundColor="013369" league="nfl" />
            <ContainerBox altColor="013369" mainColor="D50A0A" isDesktopScreen={isDesktopScreen}>
              <AllTeams allTeams={nflDivisonTeams} league="nfl" />
              <Scoreboard
                league="nfl"
                seasonWeeks={data.seasonWeeks}
                events={data.events}
                year={year}
                type={type}
                setYear={setYear}
                setType={setType}
              />
              <Articles title={`NFL News`} teamNews={data.newsData} limit={10} />
            </ContainerBox>
          </>
        ) : (
          <>
            <LeagueHeader backgroundColor="013369" league="nfl" />
            <LeagueUserSelection userSelection={userSelection} setUserSelection={setUserSelection} />
            <ContainerBox altColor="013369" mainColor="D50A0A" isDesktopScreen={isDesktopScreen}>
              {userSelection === "teams" && <AllTeams allTeams={nflDivisonTeams} league="nfl" />}
              {userSelection === "scoreboard" && (
                <Scoreboard
                  league="nfl"
                  seasonWeeks={data.seasonWeeks}
                  events={data.events}
                  year={year}
                  type={type}
                  setYear={setYear}
                  setType={setType}
                />
              )}
              {userSelection === "news" && <Articles title={`NFL News`} teamNews={data.newsData} limit={10} />}
            </ContainerBox>
          </>
        )}
      </main>
    );
  }
}
