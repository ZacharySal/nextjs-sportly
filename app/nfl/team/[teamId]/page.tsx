import { Box } from "@mui/material";
import TeamStats from "@/app/_components/TeamStats";
import Articles from "@/app/_components/Articles";
import ScoreCard from "@/app/_components/ScoreCard";
import Header from "@/app/_components/TeamHeader";
import ContainerBox from "@/app/_components/ContainerBox";
import TeamSchedule from "@/app/_components/TeamSchedule";

async function getTeamData(teamId: string) {
  const response = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${teamId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch team data");
  }

  return response.json();
}

async function getTeamSchedule(teamId: string) {
  const response = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${teamId}/schedule`,
    { next: { revalidate: 30 } }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch team schedule");
  }

  return response.json();
}

async function getTeamRoster(teamId: string) {
  const response = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${teamId}/roster`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch team roser");
  }

  return response.json();
}

async function getTeamStats(teamId: string) {
  const response = await fetch(
    `https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2023/types/1/teams/${teamId}/statistics`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch team stats");
  }

  return response.json();
}

async function getTeamNews(teamId: string) {
  const response = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/football/nfl/news?team=${teamId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch team stats");
  }

  return response.json();
}

export default async function TeamPage({
  params,
}: {
  params: { teamId: string };
}) {
  const teamData = await getTeamData(params.teamId);
  const teamSchedule = await getTeamSchedule(params.teamId);
  const teamRoster = await getTeamRoster(params.teamId);
  const teamStats = await getTeamStats(params.teamId);
  const teamNews = await getTeamNews(params.teamId);

  const altColor = teamData.team.alternateColor;
  const mainColor = teamData.team.color;

  const displayStats = {
    "Passing YPG": teamStats.splits.categories[1].stats[9],
    "Rushing YPG": teamStats.splits.categories[2].stats[13],
    "Total PPG": teamStats.splits.categories[1].stats[30],
    "3rd Down %": teamStats.splits.categories[10].stats[14],
    "Turnover Diff": teamStats.splits.categories[10].stats[21],
  };

  return (
    <>
      <Header teamData={teamData} league="nfl" />

      <ContainerBox altColor={altColor} mainColor={mainColor}>
        <TeamStats stats={displayStats} />
        <TeamSchedule teamSchedule={teamSchedule} league="nfl" />
        <Articles
          title={`${teamData.team.name} News`}
          teamNews={teamNews}
          articleLimit={8}
        />
      </ContainerBox>
    </>
  );
}
