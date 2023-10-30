"use client";

import { Box, useMediaQuery } from "@mui/material";
import { useState } from "react";
import useSwr from "swr";
import { nflDivisonTeams } from "@/app/_lib/constants";
import Articles from "@/app/_components/Articles";
import ContainerBox from "@/app/_components/ContainerBox";
import AllTeams from "@/app/_components/AllTeams";
import LeagueHeader from "@/app/_components/LeagueHeader";
import LeagueUserSelection from "@/app/_components/LeagueUserSelection";
import Loading from "@/app/_components/Loading";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const [userSelection, setUserSelection] = useState("teams");
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
            <LeagueUserSelection userSelection={userSelection} league="nfl" />
            <ContainerBox isDesktopScreen={isDesktopScreen}>
              <Box className="basis-2/3">
                <AllTeams allTeams={nflDivisonTeams} league="nfl" />
              </Box>
              <Box className="basis-1/4">
                <Articles
                  title={`NFL News`}
                  teamNews={data.newsData}
                  limit={10}
                />
              </Box>
            </ContainerBox>
          </>
        ) : (
          <>
            {/* <LeagueHeader backgroundColor="013369" league="nfl" /> */}
            <LeagueUserSelection userSelection={userSelection} league="nfl" />
            <ContainerBox isDesktopScreen={isDesktopScreen}>
              <AllTeams allTeams={nflDivisonTeams} league="nfl" />
            </ContainerBox>
          </>
        )}
      </main>
    );
  }
}
