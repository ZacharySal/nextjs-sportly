"use client";

import useMediaQuery from "@mui/material/useMediaQuery";
import Articles from "@/components/Articles";
import LeagueUserSelection from "@/components/LeagueUserSelection";
import ContainerBox from "@/components/ContainerBox";

export default function News({ data }: { data: any }) {
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  return (
    <main>
      {isDesktopScreen ? (
        <>
          <LeagueUserSelection userSelection={"news"} league="nba" />
          <ContainerBox isDesktopScreen={isDesktopScreen}>
            <div className="basis-3/4">
              <Articles title={`NBA News`} news={data.articles} limit={20} />
            </div>
          </ContainerBox>
        </>
      ) : (
        <>
          <LeagueUserSelection userSelection={"news"} league="nba" />
          <ContainerBox isDesktopScreen={isDesktopScreen}>
            <Articles title={`NBA News`} news={data.articles} limit={20} />
          </ContainerBox>
        </>
      )}
    </main>
  );
}
