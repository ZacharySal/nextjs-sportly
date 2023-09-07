"use client";

import TeamStats from "@/app/_components/TeamStats";
import Articles from "@/app/_components/Articles";
import ContainerBox from "@/app/_components/ContainerBox";
import TeamSchedule from "@/app/_components/TeamSchedule";
import Header from "@/app/_components/TeamHeader";
import useSwr from "swr";
import { useMediaQuery, Typography, Box } from "@mui/material";
import { useState } from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function TeamPage({ params }: { params: { teamId: string } }) {
  const [userSelection, setUserSelection] = useState("games");

  const { data, isLoading } = useSwr(
    `https://nextjs-sportly.vercel.app/api/mlb/teamData/${params.teamId}`,
    fetcher
  );

  const isDesktopScreen = useMediaQuery("(min-width:1000px)");
  const isSelected = (selection: string) => selection === userSelection;

  if (!isLoading) {
    return isDesktopScreen ? (
      <>
        <Header teamData={data.teamData} league="mlb" />
        <ContainerBox
          altColor={data.teamData.team.alternateColor}
          mainColor={data.teamData.team.color}
          isDesktopScreen={isDesktopScreen}
        >
          <Box className="flex-basis-1/5">
            <TeamStats stats={data.teamStats} />
          </Box>
          <Box className="flex-basis-1/2">
            <TeamSchedule teamSchedule={data.teamSchedule} league="mlb" />
          </Box>
          <Articles
            title={`${data.teamData.team.name} News`}
            teamNews={data.teamNews}
            articleLimit={8}
          />
        </ContainerBox>
      </>
    ) : (
      <>
        <Header teamData={data.teamData} league="mlb" />

        <Box className="block md:hidden w-full h-10 flex justify-start items-center gap-3 bg-white pl-5">
          <Typography
            onClick={() => setUserSelection("games")}
            sx={{ fontWeight: isSelected("games") ? "700" : "400" }}
            className="opacity-70 text-sm"
          >
            Games
          </Typography>
          <Typography
            onClick={() => setUserSelection("stats")}
            sx={{ fontWeight: isSelected("stats") ? "700" : "400" }}
            className="opacity-70 text-sm"
          >
            Stats
          </Typography>

          <Typography
            onClick={() => setUserSelection("news")}
            sx={{ fontWeight: isSelected("news") ? "700" : "400" }}
            className="opacity-70 text-sm"
          >
            News
          </Typography>
        </Box>
        <ContainerBox
          altColor={data.teamData.team.alternateColor}
          mainColor={data.teamData.team.color}
          isDesktopScreen={isDesktopScreen}
        >
          {userSelection === "stats" && <TeamStats stats={data.teamStats} />}
          {userSelection === "games" && (
            <TeamSchedule teamSchedule={data.teamSchedule} league="mlb" />
          )}
          {userSelection === "news" && (
            <Articles
              title={`${data.teamData.team.name} News`}
              teamNews={data.teamNews}
              articleLimit={8}
            />
          )}
        </ContainerBox>
      </>
    );
  }
}
