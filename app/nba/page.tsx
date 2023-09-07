"use client";

import { Box, Typography } from "@mui/material";
import Articles from "../_components/Articles";
import TeamSideCard from "../_components/TeamSideCard";
import ContainerBox from "../_components/ContainerBox";
import Scoreboard from "../_components/Scoreboard";
import LeagueHeader from "../_components/LeagueHeader";
import AllTeams from "../_components/AllTeams";
import { nbaDivisionTeams } from "../_lib/constants";
import useSwr from "swr";
import { useState } from "react";
import { useMediaQuery } from "@mui/material";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const [userSelection, setUserSelection] = useState("scoreboard");

  const { data, isLoading } = useSwr(
    "http://localhost:3000/api/nba/leagueData",
    fetcher
  );

  const isDesktopScreen = useMediaQuery("(min-width:1000px");
  const isSelected = (selection: string) => selection === userSelection;

  if (!isLoading) {
    return (
      <main>
        {isDesktopScreen ? (
          <>
            <LeagueHeader backgroundColor="013369" league="nba" />
            <ContainerBox
              altColor="013369"
              mainColor="D50A0A"
              isDesktopScreen={isDesktopScreen}
            >
              <AllTeams allTeams={nbaDivisionTeams} league="nba" />
              <Scoreboard seasonWeeks={data.nbaWeeks} league="nba" />
              <Articles
                title={`NBA News`}
                teamNews={data.news}
                articleLimit={10}
              />
            </ContainerBox>
          </>
        ) : (
          <>
            <LeagueHeader backgroundColor="013369" league="nba" />
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
                <AllTeams allTeams={nbaDivisionTeams} league="nba" />
              )}
              {userSelection === "scoreboard" && (
                <Scoreboard seasonWeeks={data.nbaWeeks} league="nba" />
              )}
              {userSelection === "news" && (
                <Articles
                  title={`NBA News`}
                  teamNews={data.news}
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
