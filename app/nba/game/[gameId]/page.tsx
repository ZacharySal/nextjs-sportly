"use client";

import useSwr from "swr";
import { useState } from "react";
import GameHeader from "@/app/_components/GameHeader";
import ContainerBox from "@/app/_components/ContainerBox";
import Articles from "@/app/_components/Articles";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import StadiumInfo from "@/app/_components/StadiumInfo";
import { Box, Typography, useMediaQuery } from "@mui/material";
import NBABoxscore from "@/app/_components/NBABoxscore";
import DivisionStandings from "@/app/_components/DivisionStandings";
import GameUserSelection from "@/app/_components/GameUserSelection";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Page({ params }: { params: { gameId: string } }) {
  const [userSelection, setUserSelection] = useState("gameInfo");
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  const { data, isLoading } = useSwr(`https://nextjs-sportly.vercel.app/api/nba/gameData/${params.gameId}`, fetcher);

  console.log(data.backgroundColor);

  function getTeamName(id: string) {
    return id === data.homeTeam.id ? data.homeTeam.team.name : data.awayTeam.team.name;
  }

  function teamStats() {
    return (
      <>
        <Box className="w-full flex flex-col gap-2 mb-5">
          <Box className="flex flex-row gap-1 justify-start items-center">
            <Image
              src={`/nba/${data.homeTeam.team.name.replace(" ", "").toLowerCase()}.png`}
              width={100}
              height={100}
              className="w-8 object-contain"
              alt="home team logo"
            />
            <Typography className="opacity-70 font-semibold">{data.homeTeam.team.name} Stats</Typography>
          </Box>
          <Box className="grid grid-cols-3 gap-1">
            {Object.entries(data.awayTeamStats).map(([statName, value]: [string, any]) => (
              <Box
                key={uuidv4()}
                className="w-auto flex justify-center items-center flex-row p-3 bg-white gap-1 drop-shadow-md"
              >
                <Box className="flex flex-col justify-center gap-2 items-center">
                  <Typography className="text-sm">{statName}</Typography>
                  <Typography className="font-semibold text-3xl">{value.displayValue}</Typography>
                  <Typography className="text-base opacity-70">{value.rankDisplayValue}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
        <Box className="w-full flex flex-col gap-1">
          <Box className="flex flex-row gap-1 justify-start items-center">
            <Image
              src={`/nba/${data.awayTeam.team.name.replace(" ", "").toLowerCase()}.png`}
              width={100}
              height={100}
              className="w-8 object-contain"
              alt="away team logo"
            />
            <Typography className="opacity-70 font-semibold">{data.awayTeam.team.name} Stats</Typography>
          </Box>
          <Box className="grid grid-cols-3 gap-1">
            {Object.entries(data.homeTeamStats).map(([statName, value]: [string, any]) => (
              <Box
                key={uuidv4()}
                className="w-auto flex justify-center items-center flex-row p-3 bg-white gap-1 drop-shadow-md"
              >
                <Box className="flex flex-col justify-center gap-2 items-center">
                  <Typography className="text-sm">{statName}</Typography>
                  <Typography className="font-semibold text-3xl">{value.displayValue}</Typography>
                  <Typography className="text-base opacity-70">{value.rankDisplayValue}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </>
    );
  }

  if (!isLoading) {
    return isDesktopScreen ? (
      <>
        <GameHeader
          backgroundColor={data.backgroundColor}
          homeTeam={data.homeTeam}
          awayTeam={data.awayTeam}
          winningTeam={data.winningTeam}
          isGameStarted={data.isGameStarted}
          league="nba"
          gameInfo={data.gameInfo}
          isDesktopScreen={isDesktopScreen}
        />

        <ContainerBox
          altColor={data.isGameStarted ? data.winningTeam.team.alternateColor : "gray"}
          mainColor={data.isGameStarted ? data.winningTeam.team.color : "gray"}
          isDesktopScreen={isDesktopScreen}
        >
          <Box className="flex self-start flex-col justify-center items-center gap-3">
            <StadiumInfo data={data} />
            <DivisionStandings data={data} />
          </Box>

          <Box className="flex-col gap-5">
            {data.isGameStarted && <NBABoxscore data={data} />}
            {teamStats()}
          </Box>

          <Articles title="NBA News" teamNews={data.gameData.news} limit={6} />
        </ContainerBox>
      </>
    ) : (
      <>
        <GameHeader
          backgroundColor={"#013369"}
          homeTeam={data.homeTeam}
          awayTeam={data.awayTeam}
          winningTeam={data.winningTeam}
          isGameStarted={data.isGameStarted}
          league="nba"
          gameInfo={data.gameInfo}
          isDesktopScreen={isDesktopScreen}
        />
        <GameUserSelection userSelection={userSelection} setUserSelection={setUserSelection} data={data} />

        <ContainerBox
          altColor={data.isGameStarted ? data.winningTeam.team.alternateColor : "gray"}
          mainColor={data.isGameStarted ? data.winningTeam.team.color : "gray"}
          isDesktopScreen={isDesktopScreen}
        >
          {userSelection === "gameInfo" && (
            <Box className="w-full flex flex-col justify-center items-center gap-3">
              <StadiumInfo data={data} />
              <DivisionStandings data={data} />
            </Box>
          )}

          {userSelection === "scoreInfo" && (
            <Box className="w-full flex flex-col gap-5">{data.isGameStarted && <NBABoxscore data={data} />}</Box>
          )}

          {userSelection === "stats" && teamStats()}

          {userSelection === "news" && <Articles title="NBA News" teamNews={data.gameData.news} limit={6} />}
        </ContainerBox>
      </>
    );
  }
}
