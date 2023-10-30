"use client";

import { Box, Typography } from "@mui/material";
import { useState } from "react";
import useSwr from "swr";
import TeamHeader from "@/app/_components/TeamHeader";
import TeamUserSelection from "@/app/_components/TeamUserSelection";
import Loading from "@/app/_components/Loading";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function TeamPage({ params }: { params: { teamId: string } }) {
  const [userSelection, setUserSelection] = useState("stats");

  const { data, isLoading } = useSwr(
    `https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2023/types/2/teams/${params.teamId}/statistics`,
    fetcher
  );

  if (isLoading) return <Loading />;
  else
    return (
      <>
        <TeamUserSelection userSelection={userSelection} />
        <p>{JSON.stringify(data)}</p>
      </>
    );
}
