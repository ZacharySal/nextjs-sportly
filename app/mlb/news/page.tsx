"use client";

import { useMediaQuery } from "@mui/material";
import useSwr from "swr";
import ContainerBox from "@/app/_components/ContainerBox";
import Articles from "@/app/_components/Articles";
import LeagueUserSelection from "@/app/_components/LeagueUserSelection";
import Loading from "@/app/_components/Loading";
import { Box } from "@mui/material";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, isLoading } = useSwr(
    "https://nextjs-sportly.vercel.app/api/mlb/leagueData",
    fetcher,
    { refreshInterval: 5000 }
  );
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  const desktopView = () => (
    <Box className="basis-2/4">
      <Articles title={`MLB News`} teamNews={data.news} limit={20} />
    </Box>
  );

  const mobileView = () => <Articles title={`MLB News`} teamNews={data.news} limit={20} />;

  if (isLoading) return <Loading />;
  else {
    return (
      <>
        <LeagueUserSelection userSelection="news" league="mlb" />
        <ContainerBox isDesktopScreen={isDesktopScreen}>
          {isDesktopScreen ? desktopView() : mobileView()}
        </ContainerBox>
      </>
    );
  }
}
