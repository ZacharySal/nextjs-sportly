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

  const { data: teamData, isLoading: teamDataLoading } = useSwr(
    `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${params.teamId}`,
    fetcher
  );
  const { data: teamSchedule, isLoading: teamScheduleLoading } = useSwr(
    `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${params.teamId}/schedule`,
    fetcher
  );
  const { data: teamStats, isLoading: teamStatsLoading } = useSwr(
    `https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2023/types/1/teams/${params.teamId}/statistics`,
    fetcher
  );
  const { data: teamNews, isLoading: teamNewsLoading } = useSwr(
    `https://site.api.espn.com/apis/site/v2/sports/football/nfl/news?team=${params.teamId}`,
    fetcher
  );

  const isDesktopScreen = useMediaQuery("(min-width:1000px)");
  const isSelected = (selection: string) => selection === userSelection;

  const finishedLoading =
    teamDataLoading === false &&
    teamNewsLoading === false &&
    teamScheduleLoading === false &&
    teamStatsLoading === false;

  let displayStats;

  if (!teamStatsLoading) {
    displayStats = {
      "Passing YPG": teamStats.splits.categories[1].stats[9],
      "Rushing YPG": teamStats.splits.categories[2].stats[13],
      "Total PPG": teamStats.splits.categories[1].stats[30],
      "3rd Down %": teamStats.splits.categories[10].stats[14],
      "Turnover Diff": teamStats.splits.categories[10].stats[21],
    };
  }

  return (
    <>
      {isDesktopScreen ? (
        <>
          {finishedLoading &&
            (console.log(teamDataLoading),
            (
              <>
                <TeamHeader teamData={teamData} league="nfl" />
                <ContainerBox
                  altColor={teamData.team.alternateColor}
                  mainColor={teamData.team.color}
                  isDesktopScreen={isDesktopScreen}
                >
                  <TeamStats stats={displayStats} />
                  <TeamSchedule teamSchedule={teamSchedule} league="nfl" />
                  <Articles
                    title={`${teamData.team.name} News`}
                    teamNews={teamNews}
                    articleLimit={8}
                  />
                </ContainerBox>
              </>
            ))}
        </>
      ) : (
        <>
          {finishedLoading && (
            <>
              <TeamHeader teamData={teamData} league="nfl" />
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
                altColor={teamData.team.alternateColor}
                mainColor={teamData.team.color}
                isDesktopScreen={isDesktopScreen}
              >
                {userSelection === "stats" && (
                  <TeamStats stats={displayStats} />
                )}
                {userSelection === "schedule" && (
                  <TeamSchedule teamSchedule={teamSchedule} league="nfl" />
                )}
                {userSelection === "news" && (
                  <Articles
                    title={`${teamData.team.name} News`}
                    teamNews={teamNews}
                    articleLimit={8}
                  />
                )}
              </ContainerBox>
            </>
          )}
        </>
      )}
    </>
  );
}
