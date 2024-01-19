"use client";

import ContainerBox from "@/components/ContainerBox";
import useMediaQuery from "@mui/material/useMediaQuery";
import DivisionStandings from "@/components/DivisionStandings";
import GameUserSelection from "@/components/GameUserSelection";
import NBAGameStats from "@/components/NBA/NBAGameStats";
import useSWR from "swr";

import Loading from "@/components/Loading";
import LeagueContainerBox from "@/components/LeagueContainerBox";
import NBAGameLeaders from "../../NBAGameLeaders";
import NBATeamStats from "../../NBATeamStats";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Boxscore({ gameId }: { gameId: string }) {
  const isDesktopScreen = useMediaQuery("(min-width:800px)");

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
        <NBATeamStats data={data} />
        <NBAGameLeaders data={data} />
      </div>
    </>
  );

  if (isLoading) return <Loading />;
  return (
    <>
      <GameUserSelection userSelection={"boxscore"} data={data} />
      <LeagueContainerBox isDesktopScreen={isDesktopScreen}>
        {isDesktopScreen ? desktopView() : mobileView()}
      </LeagueContainerBox>
    </>
  );
}
