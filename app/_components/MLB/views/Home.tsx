"use client";

import { useMediaQuery, Box } from "@mui/material";
import Articles from "../../Articles";
import ContainerBox from "../../ContainerBox";
import LeagueUserSelection from "../../LeagueUserSelection";
import Loading from "../../Loading";
import MLBScoreboard from "../MLBScoreboard";
import useHasHydrated from "../../hooks/useHasHyrdated";

export default function Home({ data }: { data: any }) {
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");
  const pageHydrated = useHasHydrated();

  const desktopView = () => (
    <>
      <Box className="basis-3/4">
        <MLBScoreboard currentDate={data.currentDate} />
      </Box>
      <Box className="basis-1/4">
        <Articles title={`MLB News`} teamNews={data.news} limit={10} />
      </Box>
    </>
  );

  const mobileView = () => <MLBScoreboard currentDate={data.currentDate} />;

  if (!pageHydrated) return <Loading />;
  else
    return (
      <>
        <LeagueUserSelection userSelection="scoreboard" league="mlb" />
        <ContainerBox isDesktopScreen={isDesktopScreen}>
          {isDesktopScreen ? desktopView() : mobileView()}
        </ContainerBox>
      </>
    );
}
