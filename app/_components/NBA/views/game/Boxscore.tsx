"use client";

import ContainerBox from "@/app/_components/ContainerBox";
import useMediaQuery from "@mui/material/useMediaQuery";
import DivisionStandings from "@/app/_components/DivisionStandings";
import GameUserSelection from "@/app/_components/GameUserSelection";
import NBAGameStats from "@/app/_components/NBA/NBAGameStats";
import useSWR from "swr";
import { fetcher } from "@/app/_lib/utils";
import Loading from "@/app/_components/Loading";

export default function Boxscore({ gameId }: { gameId: string }) {
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  const { data, isLoading } = useSWR(
    `https://nextjs-sportly.vercel.app/api/nba/gameData/${gameId}`,
    fetcher,
    {
      refreshInterval: 5000,
    }
  );

  const mobileView = () => <NBAGameStats data={data} isDesktopScreen={isDesktopScreen} />;

  const desktopView = () => (
    <>
      <div className="flex flex-col gap-3">
        <NBAGameStats data={data} isDesktopScreen={isDesktopScreen} />
      </div>
      <div className="flex flex-col basis-1/4 gap-3">
        <DivisionStandings data={data} isNFL={false} league="nba" />
      </div>
    </>
  );

  if (isLoading) return <Loading />;
  return (
    <>
      <GameUserSelection userSelection={"boxscore"} data={data} />
      <ContainerBox isDesktopScreen={isDesktopScreen}>
        {isDesktopScreen ? desktopView() : mobileView()}
      </ContainerBox>
    </>
  );
}
