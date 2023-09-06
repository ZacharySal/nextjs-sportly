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
const newsKey =
  "https://site.api.espn.com/apis/site/v2/sports/football/nfl/news?limit=50";
const weeksKey = "https://cdn.espn.com/core/nfl/scoreboard?xhr=1&limit=50";

export default function Home() {
  const [userSelection, setUserSelection] = useState("scoreboard");

  const { data: news, isLoading: newsLoading } = useSwr(newsKey, fetcher);
  const { data: weeksData, isLoading: weeksDataLoading } = useSwr(
    weeksKey,
    fetcher
  );

  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  let seasonWeeks;

  const isSelected = (selection: string) => selection === userSelection;

  if (!weeksDataLoading) {
    let seasonInfo: any = [];
    let weeks: any;
    let finalWeeks: any = [];

    weeksData.content.sbData.leagues[0].calendar.map(
      (week: any) => (
        (weeks = week.entries.map((weekEntry: any) => ({
          weekEndDate: weekEntry.endDate,
          weekStartDate: weekEntry.startDate,
          weekLabel: weekEntry.alternateLabel,
          weekDisplayDateRange: weekEntry.detail,
          weekValue: weekEntry.value,
          seasonValue: week.value,
        }))),
        seasonInfo.push({
          seasonStartDate: week.startDate,
          seasonEndDate: week.endDate,
          seasonLabel: week.label,
          seasonWeeks: weeks,
        }),
        (weeks = []),
        finalWeeks.push(seasonInfo)
      )
    );

    seasonWeeks = finalWeeks[0];
  }

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
            {!weeksDataLoading && (
              <Scoreboard seasonWeeks={seasonWeeks} league="nfl" />
            )}
            {!newsLoading && (
              <Articles title={`NFL News`} teamNews={news} articleLimit={10} />
            )}
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
            {!weeksDataLoading && userSelection === "scoreboard" && (
              <Scoreboard seasonWeeks={seasonWeeks} league="nfl" />
            )}
            {!newsLoading && userSelection === "news" && (
              <Articles title={`NFL News`} teamNews={news} articleLimit={10} />
            )}
          </ContainerBox>
        </>
      )}
    </main>
  );
}
