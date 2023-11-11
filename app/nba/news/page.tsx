"use client";

import { Box, useMediaQuery } from "@mui/material";
import { useState } from "react";
import useSwr from "swr";
import Articles from "@/app/_components/Articles";
import Loading from "@/app/_components/Loading";
import LeagueUserSelection from "@/app/_components/LeagueUserSelection";
import ContainerBox from "@/app/_components/ContainerBox";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const [userSelection, setUserSelection] = useState("scoreboard");
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  const { data, isLoading } = useSwr(
    `https://nextjs-sportly.vercel.app/api/nba/leagueData`,
    fetcher,
    { refreshInterval: 5000 }
  );

  if (isLoading) return <Loading />;
  else {
    return (
      <main>
        {isDesktopScreen ? (
          <>
            <LeagueUserSelection userSelection={"news"} league="nba" />
            <ContainerBox isDesktopScreen={isDesktopScreen}>
              <Box className="basis-3/4">
                <Articles title={`NBA News`} teamNews={data.news} limit={20} />
              </Box>
            </ContainerBox>
          </>
        ) : (
          <>
            <LeagueUserSelection userSelection={"news"} league="nba" />
            <ContainerBox isDesktopScreen={isDesktopScreen}>
              <Articles title={`NBA News`} teamNews={data.news} limit={20} />
            </ContainerBox>
          </>
        )}
      </main>
    );
  }
}
