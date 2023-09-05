import TeamStats from "@/app/_components/TeamStats";
import Articles from "@/app/_components/Articles";
import ContainerBox from "@/app/_components/ContainerBox";
import TeamSchedule from "@/app/_components/TeamSchedule";
import Header from "@/app/_components/TeamHeader";
import { mlbDivisonTeams } from "@/app/_lib/constants";

async function getTeamData(teamId: string) {
  const response = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/teams/${teamId}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch team data");
  }

  return response.json();
}

async function getTeamSchedule(teamId: string) {
  const response = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/teams/${teamId}/schedule`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch team schedule");
  }

  return response.json();
}

async function getTeamRoster(teamId: string) {
  const response = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/teams/${teamId}/roster`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch team roser");
  }

  return response.json();
}

async function getTeamStats(teamId: string) {
  const response = await fetch(
    `https://sports.core.api.espn.com/v2/sports/baseball/leagues/mlb/seasons/2023/types/2/teams/${teamId}/statistics`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch team stats");
  }

  return response.json();
}

async function getTeamNews(teamId: string) {
  const response = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/news?team=${teamId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch team news");
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
  const teamStats = await getTeamStats(params.teamId);
  const teamNews = await getTeamNews(params.teamId);

  const altColor = teamData.team.alternateColor;
  const mainColor = teamData.team.color;

  const displayStats: Record<string, any> = {
    Runs: teamStats.splits.categories[0].stats[11],
    "Batting Avg": teamStats.splits.categories[0].stats[37],
    "On Base %": teamStats.splits.categories[0].stats[41],
    "Slugging %": teamStats.splits.categories[0].stats[39],
    "Strike Outs": teamStats.splits.categories[1].stats[4],
    "Quality Starts": teamStats.splits.categories[1].stats[40],
    WHIP: teamStats.splits.categories[1].stats[53],
    OBA: teamStats.splits.categories[1].stats[61],
  };

  return (
    <>
      <Header teamData={teamData} league="mlb" />
      <ContainerBox altColor={altColor} mainColor={mainColor}>
        <TeamStats stats={displayStats} />
        <TeamSchedule teamSchedule={teamSchedule} league="mlb" />
        <Articles
          title={`${teamData.team.name} News`}
          teamNews={teamNews}
          articleLimit={8}
        />
      </ContainerBox>
    </>
  );
}
