"use client";

import useMediaQuery from "@mui/material/useMediaQuery";
import ContainerBox from "@/app/_components/ContainerBox";
import Articles from "@/app/_components/Articles";
import LeagueUserSelection from "@/app/_components/LeagueUserSelection";

export default function Home({ data }: { data: any }) {
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  const desktopView = () => (
    <div className="basis-2/4">
      <Articles title={`MLB News`} teamNews={data.news} limit={20} />
    </div>
  );

  const mobileView = () => <Articles title={`MLB News`} teamNews={data.news} limit={20} />;

  return (
    <>
      <LeagueUserSelection userSelection="news" league="mlb" />
      <ContainerBox isDesktopScreen={isDesktopScreen}>
        {isDesktopScreen ? desktopView() : mobileView()}
      </ContainerBox>
    </>
  );
}
