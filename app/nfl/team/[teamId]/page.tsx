"use client";

import { Box, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";
import useSwr from "swr";
import TeamStats from "@/app/_components/TeamStats";
import Articles from "@/app/_components/Articles";
import TeamHeader from "@/app/_components/TeamHeader";
import ContainerBox from "@/app/_components/ContainerBox";
import TeamSchedule from "@/app/_components/TeamSchedule";
import TeamUserSelection from "@/app/_components/TeamUserSelection";
import Loading from "@/app/_components/Loading";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function TeamPage({ params }: { params: { teamId: string } }) {
  const [userSelection, setUserSelection] = useState("schedule");
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  const { data, isLoading } = useSwr(
    `https://nextjs-sportly.vercel.app/api/nfl/teamData/${params.teamId}`,
    fetcher
  );

  if (isLoading) return <Loading />;
  else
    return (
      <>
        {isDesktopScreen ? (
          <>
            <TeamHeader teamData={data.teamData} league="nfl" />
            <ContainerBox isDesktopScreen={isDesktopScreen}>
              <Box className="flex-basis-1/4">
                <TeamStats stats={data.teamStats} />
              </Box>

              <Box className="flex-basis-1/2">
                <TeamSchedule teamSchedule={data.teamSchedule} league="nfl" />
              </Box>
              <Articles
                title={`${data.teamData.team.name} News`}
                teamNews={data.teamNews}
                limit={8}
              />
            </ContainerBox>
          </>
        ) : (
          <>
            <TeamHeader teamData={data.teamData} league="nfl" />
            <TeamUserSelection
              userSelection={userSelection}
              setUserSelection={setUserSelection}
            />
            <ContainerBox isDesktopScreen={isDesktopScreen}>
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
                  limit={8}
                />
              )}
            </ContainerBox>
          </>
        )}
      </>
    );
}
