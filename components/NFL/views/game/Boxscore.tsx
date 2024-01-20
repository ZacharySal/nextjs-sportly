"use client";

import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";
import ContainerBox from "@/components/ContainerBox";
import Articles from "@/components/Articles";
import DivisionStandings from "@/components/DivisionStandings";
import GameUserSelection from "@/components/GameUserSelection";
import NFLGameStats from "@/components/NFL/NFLGameStats";
import MatchupPredictor from "@/components/MatchupPredictor";
import useSWR from "swr";
import Loading from "@/app/loading";
import LeagueContainerBox from "@/components/LeagueContainerBox";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function View({ gameId }: { gameId: string }) {
  const isDesktopScreen = useMediaQuery("(min-width:800px)");

  const { data, isLoading } = useSWR(
    `https://nextjs-sportly.vercel.app/api/nfl/gameData/${gameId}`,
    fetcher,
    {
      refreshInterval: 5000,
    },
  );

  function gameLeaders() {
    return (
      <div className="w-full rounded-xl bg-white p-3">
        <p className="mb-1 text-start text-sm font-semibold opacity-70">
          {data.isGameStarted ? "Game Leaders" : "Season Leaders"}
        </p>

        <div className="grid grid-cols-2 grid-rows-[auto,auto,auto,auto,auto,auto] items-center justify-between gap-x-2 gap-y-0">
          <div className="col-span-2 w-full">
            <hr className="mt-2" />
            <p className="my-2 mb-[-0.5rem] text-center text-sm opacity-70">
              Passing Yards
            </p>
          </div>
          {/* AWAY TEAM PASSING LEADER */}
          <div className="grid-cols-[1fr, 3fr] relative my-2 grid grid-rows-2 place-items-end justify-center justify-between gap-x-2 gap-y-0">
            <div className="player-divider col-start-1 row-span-2 flex flex-col items-center justify-center gap-1">
              <Image
                src={
                  data.gameData.leaders[1].leaders[0].leaders[0].athlete
                    .headshot.href
                }
                width={100}
                height={100}
                alt="player"
                className="h-12 w-12 rounded-full border object-cover md:h-[35px] md:w-[35px]"
              />
              <p className="text-xs opacity-80">
                {data.gameData.leaders[1].team.abbreviation}
              </p>
            </div>
            <p className="col-start-2 row-start-1 pr-2 text-end text-xs font-bold opacity-80">
              {data.gameData.leaders[1].leaders[0].leaders[0].athlete.shortName}
            </p>
            <p className="col-start-2 row-start-2 flex h-full pr-2 text-end text-[10px] opacity-70">
              {data.gameData.leaders[1].leaders[0].leaders[0].displayValue}
            </p>
          </div>

          {/* HOME TEAM PASSING LEADER */}
          <div className="grid-cols-[1fr, 3fr] grid grid-rows-2 items-end justify-between gap-x-2 gap-y-0">
            <div className="col-start-2 row-span-2 flex flex-col items-center justify-center gap-1">
              <Image
                src={
                  data.gameData.leaders[0].leaders[0].leaders[0].athlete
                    .headshot.href
                }
                width={100}
                height={100}
                alt="player"
                className="h-12 w-12 rounded-full border object-cover md:h-[35px] md:w-[35px]"
              />
              <p className="text-xs opacity-80">
                {data.gameData.leaders[0].team.abbreviation}
              </p>
            </div>

            <p className="col-start-1 row-start-1 w-full pl-2 text-start text-xs font-bold opacity-80">
              {data.gameData.leaders[0].leaders[0].leaders[0].athlete.shortName}
            </p>
            <p className="col-start-1 row-start-2 flex h-full pl-2 text-start text-[10px] opacity-70">
              {data.gameData.leaders[0].leaders[0].leaders[0].displayValue}
            </p>
          </div>

          <div className="col-span-2 w-full">
            <hr className="mt-2" />
            <p className="my-2 mb-[-0.5rem] text-center text-sm opacity-70">
              Rushing Yards
            </p>
          </div>

          {/* AWAY TEAM RUSHING LEADER */}
          <div className="grid-cols-[1fr, 3fr] relative grid grid-rows-2 place-items-end justify-between gap-x-2 gap-y-0">
            <div className="player-divider col-start-1 row-span-2 flex flex-col items-center justify-center gap-1">
              <Image
                src={
                  data.gameData.leaders[1].leaders[1].leaders[0].athlete
                    .headshot.href
                }
                width={100}
                height={100}
                alt="player"
                className="h-12 w-12 rounded-full border object-cover md:h-[35px] md:w-[35px]"
              />
              <p className="text-xs opacity-80">
                {data.gameData.leaders[1].team.abbreviation}
              </p>
            </div>
            <p className="col-start-2 row-start-1 truncate pr-2 text-end text-xs font-bold opacity-80">
              {data.gameData.leaders[1].leaders[1].leaders[0].athlete.shortName}
            </p>
            <p className="col-start-2 row-start-2 flex h-full pr-2 text-end text-[10px] opacity-70">
              {data.gameData.leaders[1].leaders[1].leaders[0].displayValue}
            </p>
          </div>

          {/* HOME TEAM RUSHING LEADER */}
          <div className="grid-cols-[1fr, 3fr] my-2 grid grid-rows-2 items-end justify-between gap-x-2 gap-y-0">
            <div className="col-start-2 row-span-2 flex flex-col items-center justify-center gap-1">
              <Image
                src={
                  data.gameData.leaders[0].leaders[1].leaders[0].athlete
                    .headshot.href
                }
                width={100}
                height={100}
                alt="player"
                className="h-12 w-12 rounded-full border object-cover md:h-[35px] md:w-[35px]"
              />
              <p className="text-xs opacity-80">
                {data.gameData.leaders[0].team.abbreviation}
              </p>
            </div>

            <p className="col-start-1 row-start-1 w-full pl-2 text-start text-xs font-bold opacity-80">
              {data.gameData.leaders[0].leaders[1].leaders[0].athlete.shortName}
            </p>
            <p className="col-start-1 row-start-2 flex h-full pl-2 text-start text-[10px] opacity-70">
              {data.gameData.leaders[0].leaders[1].leaders[0].displayValue}
            </p>
          </div>

          <div className="col-span-2 w-full">
            <hr className="mt-2" />
            <p className="my-2 mb-[-0.5rem] text-center text-sm opacity-70">
              Recieving Yards
            </p>
          </div>

          {/* AWAY TEAM RECIEVING LEADER */}
          <div className="grid-cols-[1fr, 3fr] relative my-2 grid grid-rows-2 place-items-end justify-between gap-x-2 gap-y-0">
            <div className="player-divider col-start-1 row-span-2 flex flex-col items-center justify-center gap-1">
              <Image
                src={
                  data.gameData.leaders[1].leaders[2].leaders[0].athlete
                    .headshot.href
                }
                width={100}
                height={100}
                alt="player"
                className="h-12 w-12 rounded-full border object-cover md:h-[35px] md:w-[35px]"
              />
              <p className="text-xs opacity-80">
                {data.gameData.leaders[1].team.abbreviation}
              </p>
            </div>
            <p className="col-start-2 row-start-1 pr-2 text-end text-xs font-bold opacity-80">
              {data.gameData.leaders[1].leaders[2].leaders[0].athlete.shortName}
            </p>
            <p className="col-start-2 row-start-2 flex h-full pr-2 text-end text-[10px] opacity-70">
              {data.gameData.leaders[1].leaders[2].leaders[0].displayValue}
            </p>
          </div>

          {/* HOME TEAM RECIEVING LEADER */}
          <div className="grid-cols-[1fr, 3fr] grid grid-rows-2 items-end justify-between gap-x-2 gap-y-0">
            <div className="col-start-2 row-span-2 flex flex-col items-center justify-center gap-1">
              <Image
                src={
                  data.gameData.leaders[0].leaders[2].leaders[0].athlete
                    .headshot.href
                }
                width={100}
                height={100}
                alt="player"
                className="h-12 w-12 rounded-full border object-cover md:h-[35px] md:w-[35px]"
              />
              <p className="text-xs opacity-80">
                {data.gameData.leaders[0].team.abbreviation}
              </p>
            </div>

            <p className="col-start-1 row-start-1 w-full pl-2 text-start text-xs font-bold opacity-80">
              {data.gameData.leaders[0].leaders[2].leaders[0].athlete.shortName}
            </p>
            <p className="col-start-1 row-start-2 flex h-full pl-2 text-start text-[10px] opacity-70">
              {data.gameData.leaders[0].leaders[2].leaders[0].displayValue}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const desktopView = () => (
    <>
      <NFLGameStats data={data} league="nfl" />
      <div className="flex flex-col items-center justify-center gap-3 self-start">
        {data.gameData.leaders[0].leaders.length > 0 &&
          data.gameData.leaders[1].leaders.length > 0 &&
          gameLeaders()}
        {data.gameData.predictor && (
          <MatchupPredictor data={data} league={"nfl"} />
        )}
        <DivisionStandings data={data} isNFL={true} league="nfl" />
        <Articles
          title="NFL News"
          news={data.gameData.news.articles}
          limit={6}
        />
      </div>
    </>
  );

  const mobileView = () => <NFLGameStats data={data} league="nfl" />;

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
