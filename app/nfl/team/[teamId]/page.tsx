"use client";

import { Box, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";
import useSwr from "swr";
import TeamStats from "@/app/_components/TeamStats";
import Articles from "@/app/_components/Articles";
import TeamHeader from "@/app/_components/TeamHeader";
import ContainerBox from "@/app/_components/ContainerBox";
import TeamSchedule from "@/app/_components/TeamSchedule";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function TeamPage({ params }: { params: { teamId: string } }) {
  const [userSelection, setUserSelection] = useState("schedule");

  const { data, isLoading } = useSwr(
    `http://` +
      process.env.VERCEL_URL +
      `/nfl/team/${params.teamId}/api/teamData?teamId=${params.teamId}`,
    fetcher
  );

  const isDesktopScreen = useMediaQuery("(min-width:1000px)");
  const isSelected = (selection: string) => selection === userSelection;

  if (!isLoading)
    return (
      <>
        {isDesktopScreen ? (
          <>
            <TeamHeader teamData={data.teamData} league="nfl" />
            <ContainerBox
              altColor={data.teamData.team.alternateColor}
              mainColor={data.teamData.team.color}
              isDesktopScreen={isDesktopScreen}
            >
              <Box className="flex-basis-1/4">
                <TeamStats stats={data.teamStats} />
              </Box>

              <Box className="flex-basis-1/2">
                <TeamSchedule teamSchedule={data.teamSchedule} league="nfl" />
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
            <TeamHeader teamData={data.teamData} league="nfl" />
            <Box className="block w-full h-10 flex justify-start items-center gap-3 bg-white pl-5">
              <Typography
                onClick={() => setUserSelection("schedule")}
                sx={{ fontWeight: isSelected("schedule") ? "700" : "400" }}
                className="opacity-70 text-sm"
              >
                Schedule
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
              <Typography
                onClick={() => setUserSelection("standings")}
                sx={{ fontWeight: isSelected("standings") ? "700" : "400" }}
                className="opacity-70 text-sm"
              >
                Standings
              </Typography>
            </Box>
            <ContainerBox
              altColor={data.teamData.team.alternateColor}
              mainColor={data.teamData.team.color}
              isDesktopScreen={isDesktopScreen}
            >
              {userSelection === "stats" && (
                <TeamStats stats={data.teamStats} />
              )}
              {userSelection === "schedule" && (
                <TeamSchedule teamSchedule={data.teamSchedule} league="nfl" />
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
        )}
      </>
    );
}
