"use client";

import useMediaQuery from "@mui/material/useMediaQuery";
import ContainerBox from "@/components/ContainerBox";
import Articles from "@/components/Articles";
import LeagueUserSelection from "@/components/LeagueUserSelection";

export default function Home({ data }: { data: any }) {
  const isDesktopScreen = useMediaQuery("(min-width:800px)");

  const desktopView = () => (
    <div className="basis-2/4">
      <Articles title={`MLB News`} news={data.scoreData.news.articles} limit={20} />
    </div>
  );

  const mobileView = () => (
    <Articles title={`MLB News`} news={data.scoreData.news.articles} limit={20} />
  );

  return (
    <>
      <LeagueUserSelection userSelection="news" league="mlb" />
      <ContainerBox isDesktopScreen={isDesktopScreen}>
        {isDesktopScreen ? desktopView() : mobileView()}
      </ContainerBox>
    </>
  );
}
