"use client";

import { useMediaQuery, Box } from "@mui/material";
import { useState } from "react";
import Articles from "../../Articles";
import ContainerBox from "../../ContainerBox";
import LeagueUserSelection from "../../LeagueUserSelection";
import Loading from "../../Loading";
import NFLScoreboard from "../NFLScoreboard";
import useHasHydrated from "../../hooks/useHasHyrdated";

export default function Home({ data }: { data: any }) {
  const [userSelection, setUserSelection] = useState("scoreboard");
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");
  const pageHydrated = useHasHydrated();

  if (!pageHydrated) return <Loading />;
  else {
    return (
      <main>
        {isDesktopScreen ? (
          <>
            <LeagueUserSelection userSelection={userSelection} league="nfl" />
            <ContainerBox isDesktopScreen={isDesktopScreen}>
              <Box className="basis-3/4">
                <NFLScoreboard seasonData={data} />
              </Box>
              <Box className="basis-1/4">
                <Articles title={`NFL News`} teamNews={data.newsData} limit={10} />
              </Box>
            </ContainerBox>
          </>
        ) : (
          <>
            <LeagueUserSelection userSelection={userSelection} league="nfl" />
            <ContainerBox isDesktopScreen={isDesktopScreen}>
              <NFLScoreboard seasonData={data} />
            </ContainerBox>
          </>
        )}
      </main>
    );
  }
}
