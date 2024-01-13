"use client";

import useMediaQuery from "@mui/material/useMediaQuery";
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
            <div className="basis-3/4">
              <Articles title={`NFL News`} news={data.articles} limit={10} />
            </div>
          </ContainerBox>
        </>
      ) : (
        <>
          <LeagueUserSelection userSelection={"news"} league="nfl" />
          <ContainerBox isDesktopScreen={isDesktopScreen}>
            <Articles title={`NFL News`} news={data.articles} limit={10} />
          </ContainerBox>
        </>
      )}
    </main>
  );
}
