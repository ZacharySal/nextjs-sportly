"use client";

import { Box, useMediaQuery } from "@mui/material";
import Articles from "@/app/_components/Articles";
import LeagueUserSelection from "@/app/_components/LeagueUserSelection";
import ContainerBox from "@/app/_components/ContainerBox";

export default function News({ data }: { data: any }) {
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  return (
    <main>
      {isDesktopScreen ? (
        <>
          <LeagueUserSelection userSelection={"news"} league="nfl" />
          <ContainerBox isDesktopScreen={isDesktopScreen}>
            <Box className="basis-3/4">
              <Articles title={`NFL News`} teamNews={data.newsData} limit={10} />
            </Box>
          </ContainerBox>
        </>
      ) : (
        <>
          <LeagueUserSelection userSelection={"news"} league="nfl" />
          <ContainerBox isDesktopScreen={isDesktopScreen}>
            <Articles title={`NFL News`} teamNews={data.newsData} limit={10} />
          </ContainerBox>
        </>
      )}
    </main>
  );
}