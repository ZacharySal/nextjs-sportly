"use client";

import { useMediaQuery, Box, Typography } from "@mui/material";
import { useState } from "react";
import ContainerBox from "../_components/ContainerBox";
import Articles from "../_components/Articles";
import AllTeams from "../_components/AllTeams";
import Scoreboard from "../_components/Scoreboard";
import LeagueHeader from "../_components/LeagueHeader";
import { mlbDivisonTeams } from "../_lib/constants";
import useSwr from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const [userSelection, setUserSelection] = useState("scoreboard");

  const { data, isLoading } = useSwr(
    "http://" + process.env.VERCEL_URL + "/mlb/api/mlbData",
    fetcher
  );
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");
  const isSelected = (selection: string) => selection === userSelection;

  if (!isLoading) {
    return isDesktopScreen ? (
      <>
        <main>
          <LeagueHeader backgroundColor="002D72" league="mlb" />
          <ContainerBox
            altColor="002D72"
            mainColor="D50A0A"
            isDesktopScreen={isDesktopScreen}
          >
            <AllTeams allTeams={mlbDivisonTeams} league="mlb" />
            <Scoreboard seasonWeeks={data.days} league={"mlb"} />
            <Articles
              title={`MLB News`}
              teamNews={data.news}
              articleLimit={10}
            />
          </ContainerBox>
        </main>
      </>
    ) : (
      <>
        <main>
          <LeagueHeader backgroundColor="002D72" league="mlb" />
          <Box className="block md:hidden w-full h-10 flex justify-start items-center gap-3 bg-white pl-5">
            <Typography
              onClick={() => setUserSelection("teams")}
              sx={{ fontWeight: isSelected("teams") ? "700" : "400" }}
              className="opacity-70 text-sm"
            >
              Teams
            </Typography>
            <Typography
              onClick={() => setUserSelection("scoreboard")}
              sx={{ fontWeight: isSelected("scoreboard") ? "700" : "400" }}
              className="opacity-70 text-sm"
            >
              Scoreboard
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
            altColor="002D72"
            mainColor="D50A0A"
            isDesktopScreen={isDesktopScreen}
          >
            {userSelection === "teams" && (
              <AllTeams allTeams={mlbDivisonTeams} league="mlb" />
            )}
            {userSelection === "scoreboard" && (
              <Scoreboard seasonWeeks={data.days} league={"mlb"} />
            )}
            {userSelection === "news" && (
              <Articles
                title={`MLB News`}
                teamNews={data.news}
                articleLimit={10}
              />
            )}
          </ContainerBox>
        </main>
      </>
    );
  }
}
