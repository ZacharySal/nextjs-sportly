"use client";

import TeamStats from "@/app/_components/TeamStats";
import Articles from "@/app/_components/Articles";
import ContainerBox from "@/app/_components/ContainerBox";
import TeamSchedule from "@/app/_components/TeamSchedule";
import TeamUserSelection from "@/app/_components/TeamUserSelection";
import StadiumInfo from "@/app/_components/StadiumInfo";
import TeamHeader from "@/app/_components/TeamHeader";
import useSwr from "swr";
import { useMediaQuery, Typography, Box } from "@mui/material";
import { useState } from "react";
import Loading from "@/app/_components/Loading";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function TeamPage({ params }: { params: { teamId: string } }) {
  const [userSelection, setUserSelection] = useState("schedule");

  const { data, isLoading } = useSwr(`https://nextjs-sportly.vercel.app/api/mlb/teamData/${params.teamId}`, fetcher);

  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  if (isLoading) return <Loading />;
  else {
    return isDesktopScreen ? (
      <>
        <TeamHeader teamData={data.teamData} league="mlb" />
        <ContainerBox
          altColor={data.teamData.team.alternateColor}
          mainColor={data.teamData.team.color}
          isDesktopScreen={isDesktopScreen}
        >
          <TeamStats stats={data.teamStats} />

          <TeamSchedule teamSchedule={data.teamSchedule} league="mlb" />
          <Articles title={`${data.teamData.team.name} News`} teamNews={data.teamNews} limit={8} />
        </ContainerBox>
      </>
    ) : (
      <>
        <TeamHeader teamData={data.teamData} league="mlb" />
        <TeamUserSelection userSelection={userSelection} setUserSelection={setUserSelection} />
        <ContainerBox
          altColor={data.teamData.team.alternateColor}
          mainColor={data.teamData.team.color}
          isDesktopScreen={isDesktopScreen}
        >
          {userSelection === "stats" && <TeamStats stats={data.teamStats} />}
          {userSelection === "schedule" && <TeamSchedule teamSchedule={data.teamSchedule} league="mlb" />}
          {userSelection === "news" && (
            <Articles title={`${data.teamData.team.name} News`} teamNews={data.teamNews} limit={8} />
          )}
        </ContainerBox>
      </>
    );
  }
}
