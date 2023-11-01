"use client";

import { Box, Typography, useMediaQuery, Divider } from "@mui/material";
import Image from "next/image";
import ContainerBox from "@/app/_components/ContainerBox";
import useSwr from "swr";
import DivisionStandings from "@/app/_components/DivisionStandings";
import GameUserSelection from "@/app/_components/GameUserSelection";
import Loading from "@/app/_components/Loading";
import NFLPlayByPlay from "@/app/_components/NFL/NFLPlayByPlay";
import MatchupPredictor from "@/app/_components/MatchupPredictor";
import Link from "next/link";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function TeamPage({ params }: { params: { gameId: string } }) {
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  const { data, isLoading } = useSwr(
    `https://nextjs-sportly.vercel.app/api/nfl/gameData/${params.gameId}`,
    fetcher
  );

  function gameLeaders() {
    return (
      <Box className="w-full bg-white rounded-xl p-3">
        <Typography className="text-sm opacity-70 font-semibold text-start mb-1">
          {data.isGameStarted ? "Game Leaders" : "Season Leaders"}
        </Typography>

        <Box className="grid grid-rows-[auto,auto,auto,auto,auto,auto] grid-cols-2 gap-x-2 gap-y-0 items-center justify-between">
          <Box className="w-full col-span-2">
            <Divider className="mt-2" />
            <Typography className="text-sm text-center opacity-70 mb-[-0.5rem] my-2">
              Passing Yards
            </Typography>
          </Box>
          {/* AWAY TEAM PASSING LEADER */}
          <Box className="grid place-items-end justify-center gap-x-2 gap-y-0 grid-cols-[1fr, 3fr] grid-rows-2 justify-between relative my-2">
            <Box className="flex col-start-1 flex-col row-span-2 justify-center items-center gap-1 player-divider">
              <Image
                src={
                  data.gameData.leaders[1].leaders[0].leaders[0].athlete
                    .headshot.href
                }
                width={100}
                height={100}
                alt="player"
                className="w-12 h-12 md:w-[35px] md:h-[35px] border rounded-full object-cover"
              />
              <Typography className="text-xs opacity-80">
                {data.gameData.leaders[1].team.abbreviation}
              </Typography>
            </Box>
            <Typography className="col-start-2 row-start-1 text-end text-xs opacity-80 font-bold pr-2">
              {data.gameData.leaders[1].leaders[0].leaders[0].athlete.shortName}
            </Typography>
            <Typography className="col-start-2 row-start-2 flex h-full text-end text-[10px] opacity-70 pr-2">
              {data.gameData.leaders[1].leaders[0].leaders[0].displayValue}
            </Typography>
          </Box>

          {/* HOME TEAM PASSING LEADER */}
          <Box className="grid items-end gap-x-2 gap-y-0 grid-cols-[1fr, 3fr] grid-rows-2 justify-between">
            <Box className="flex col-start-2 flex-col row-span-2 justify-center items-center gap-1">
              <Image
                src={
                  data.gameData.leaders[0].leaders[0].leaders[0].athlete
                    .headshot.href
                }
                width={100}
                height={100}
                alt="player"
                className="w-12 h-12 md:w-[35px] md:h-[35px] border rounded-full object-cover"
              />
              <Typography className="text-xs opacity-80">
                {data.gameData.leaders[0].team.abbreviation}
              </Typography>
            </Box>

            <Typography className="col-start-1 row-start-1 w-full text-start text-xs opacity-80 font-bold pl-2">
              {data.gameData.leaders[0].leaders[0].leaders[0].athlete.shortName}
            </Typography>
            <Typography className="col-start-1 row-start-2 flex h-full text-start text-[10px] opacity-70 pl-2">
              {data.gameData.leaders[0].leaders[0].leaders[0].displayValue}
            </Typography>
          </Box>

          <Box className="w-full col-span-2">
            <Divider className="mt-2" />
            <Typography className="text-sm text-center opacity-70 mb-[-0.5rem] my-2">
              Rushing Yards
            </Typography>
          </Box>

          {/* AWAY TEAM RUSHING LEADER */}
          <Box className="grid place-items-end gap-x-2 gap-y-0 grid-cols-[1fr, 3fr] grid-rows-2 justify-between relative">
            <Box className="flex col-start-1 flex-col row-span-2 justify-center items-center gap-1 player-divider">
              <Image
                src={
                  data.gameData.leaders[1].leaders[1].leaders[0].athlete
                    .headshot.href
                }
                width={100}
                height={100}
                alt="player"
                className="w-12 h-12 md:w-[35px] md:h-[35px] border rounded-full object-cover"
              />
              <Typography className="text-xs opacity-80">
                {data.gameData.leaders[1].team.abbreviation}
              </Typography>
            </Box>
            <Typography className="col-start-2 row-start-1 truncate text-end text-xs opacity-80 font-bold pr-2">
              {data.gameData.leaders[1].leaders[1].leaders[0].athlete.shortName}
            </Typography>
            <Typography className="col-start-2 row-start-2 flex h-full text-end text-[10px] opacity-70 pr-2">
              {data.gameData.leaders[1].leaders[1].leaders[0].displayValue}
            </Typography>
          </Box>

          {/* HOME TEAM RUSHING LEADER */}
          <Box className="grid items-end gap-x-2 gap-y-0 grid-cols-[1fr, 3fr] grid-rows-2 justify-between my-2">
            <Box className="flex col-start-2 flex-col row-span-2 justify-center items-center gap-1">
              <Image
                src={
                  data.gameData.leaders[0].leaders[1].leaders[0].athlete
                    .headshot.href
                }
                width={100}
                height={100}
                alt="player"
                className="w-12 h-12 md:w-[35px] md:h-[35px] border rounded-full object-cover"
              />
              <Typography className="text-xs opacity-80">
                {data.gameData.leaders[0].team.abbreviation}
              </Typography>
            </Box>

            <Typography className="col-start-1 row-start-1 w-full text-start text-xs opacity-80 font-bold pl-2">
              {data.gameData.leaders[0].leaders[1].leaders[0].athlete.shortName}
            </Typography>
            <Typography className="col-start-1 row-start-2 flex h-full text-start text-[10px] opacity-70 pl-2">
              {data.gameData.leaders[0].leaders[1].leaders[0].displayValue}
            </Typography>
          </Box>

          <Box className="w-full col-span-2">
            <Divider className="mt-2" />
            <Typography className="text-sm text-center opacity-70 mb-[-0.5rem] my-2">
              Recieving Yards
            </Typography>
          </Box>

          {/* AWAY TEAM RECIEVING LEADER */}
          <Box className="grid place-items-end gap-x-2 gap-y-0 grid-cols-[1fr, 3fr] grid-rows-2 justify-between my-2 relative">
            <Box className="flex col-start-1 flex-col row-span-2 justify-center items-center gap-1 player-divider">
              <Image
                src={
                  data.gameData.leaders[1].leaders[2].leaders[0].athlete
                    .headshot.href
                }
                width={100}
                height={100}
                alt="player"
                className="w-12 h-12 md:w-[35px] md:h-[35px] border rounded-full object-cover"
              />
              <Typography className="text-xs opacity-80">
                {data.gameData.leaders[1].team.abbreviation}
              </Typography>
            </Box>
            <Typography className="col-start-2 row-start-1 text-end text-xs opacity-80 font-bold pr-2">
              {data.gameData.leaders[1].leaders[2].leaders[0].athlete.shortName}
            </Typography>
            <Typography className="col-start-2 row-start-2 flex h-full text-end text-[10px] opacity-70 pr-2">
              {data.gameData.leaders[1].leaders[2].leaders[0].displayValue}
            </Typography>
          </Box>

          {/* HOME TEAM RECIEVING LEADER */}
          <Box className="grid items-end gap-x-2 gap-y-0 grid-cols-[1fr, 3fr] grid-rows-2 justify-between">
            <Box className="flex col-start-2 flex-col row-span-2 justify-center items-center gap-1">
              <Image
                src={
                  data.gameData.leaders[0].leaders[2].leaders[0].athlete
                    .headshot.href
                }
                width={100}
                height={100}
                alt="player"
                className="w-12 h-12 md:w-[35px] md:h-[35px] border rounded-full object-cover"
              />
              <Typography className="text-xs opacity-80">
                {data.gameData.leaders[0].team.abbreviation}
              </Typography>
            </Box>

            <Typography className="col-start-1 row-start-1 w-full text-start text-xs opacity-80 font-bold pl-2">
              {data.gameData.leaders[0].leaders[2].leaders[0].athlete.shortName}
            </Typography>
            <Typography className="col-start-1 row-start-2 flex h-full text-start text-[10px] opacity-70 pl-2">
              {data.gameData.leaders[0].leaders[2].leaders[0].displayValue}
            </Typography>
          </Box>
        </Box>
        <Divider className="my-2" />
        <Link href="boxscore">
          <Typography className="text-center w-full h-full text-xs text-[#06c] cursor-pointer py-1 font-semibold">
            Full Box Score
          </Typography>
        </Link>
      </Box>
    );
  }

  const desktopView = () => (
    <>
      <Box className="flex flex-col gap-5 basis-2/3">
        <NFLPlayByPlay data={data} />
      </Box>
      <Box className="flex self-start flex-col justify-center items-center gap-3 basis-1/4">
        {data.gameData.predictor && (
          <MatchupPredictor data={data} league={"nfl"} />
        )}
        {data.gameData.leaders[0].leaders.length > 0 &&
          data.gameData.leaders[1].leaders.length > 0 &&
          gameLeaders()}
        <DivisionStandings data={data} isNFL={true} league="nfl" />
      </Box>
    </>
  );

  const mobileView = () => <NFLPlayByPlay data={data} />;

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <>
        <GameUserSelection userSelection={"playbyplay"} data={data} />
        <ContainerBox isDesktopScreen={isDesktopScreen}>
          {isDesktopScreen ? desktopView() : mobileView()}
        </ContainerBox>
      </>
    );
  }
}
