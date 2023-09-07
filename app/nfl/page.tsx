"use client";

import { Box, useMediaQuery, Typography } from "@mui/material";
import { useState } from "react";
import Articles from "../_components/Articles";
import ContainerBox from "../_components/ContainerBox";
import Scoreboard from "../_components/Scoreboard";
import LeagueHeader from "../_components/LeagueHeader";
import AllTeams from "../_components/AllTeams";
import { nflDivisonTeams } from "../_lib/constants";
import useSwr from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const [userSelection, setUserSelection] = useState("scoreboard");

  const { data, isLoading } = useSwr(
    "https://nextjs-sportly.vercel.app/api/nfl/leagueData",
    fetcher
  );

  const isDesktopScreen = useMediaQuery("(min-width:1000px)");
  const isSelected = (selection: string) => selection === userSelection;

  if (!isLoading) {
    return (
      <main>
        {isDesktopScreen ? (
          <>
            <LeagueHeader backgroundColor="013369" league="nfl" />
            <ContainerBox
              altColor="013369"
              mainColor="D50A0A"
              isDesktopScreen={isDesktopScreen}
            >
              <AllTeams allTeams={nflDivisonTeams} league="nfl" />

              <Scoreboard seasonWeeks={data.seasonWeeks} league="nfl" />

              <Articles
                title={`NFL News`}
                teamNews={data.newsData}
                articleLimit={10}
              />
            </ContainerBox>
          </>
        ) : (
          <>
            <LeagueHeader backgroundColor="013369" league="nfl" />
            <Box className="block md:hidden w-full h-10 flex justify-start items-center gap-3 bg-white pl-5">
              <Typography
                onClick={() => setUserSelection("scoreboard")}
                sx={{ fontWeight: isSelected("scoreboard") ? "700" : "400" }}
                className="opacity-70 text-sm"
              >
                Scoreboard
              </Typography>
              <Typography
                onClick={() => setUserSelection("teams")}
                sx={{ fontWeight: isSelected("teams") ? "700" : "400" }}
                className="opacity-70 text-sm"
              >
                Teams
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
              altColor="013369"
              mainColor="D50A0A"
              isDesktopScreen={isDesktopScreen}
            >
              {userSelection === "teams" && (
                <AllTeams allTeams={nflDivisonTeams} league="nfl" />
              )}
              {userSelection === "scoreboard" && (
                <Scoreboard seasonWeeks={data.seasonWeeks} league="nfl" />
              )}
              {userSelection === "news" && (
                <Articles
                  title={`NFL News`}
                  teamNews={data.newsData}
                  articleLimit={10}
                />
              )}
            </ContainerBox>
          </>
        )}
      </main>
    );
  }
}
