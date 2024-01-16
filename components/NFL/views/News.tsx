"use client";

import useMediaQuery from "@mui/material/useMediaQuery";
import Articles from "@/components/Articles";
import LeagueUserSelection from "@/components/LeagueUserSelection";
import ContainerBox from "@/components/ContainerBox";

export default function News({ data }: { data: any }) {
  const isDesktopScreen = useMediaQuery("(min-width:800px)");

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
