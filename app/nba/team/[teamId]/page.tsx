import TeamStats from "@/app/_components/TeamStats";
import Articles from "@/app/_components/Articles";
import ContainerBox from "@/app/_components/ContainerBox";
import TeamSchedule from "@/app/_components/TeamSchedule";
import Header from "@/app/_components/TeamHeader";

async function getTeamData(teamId: string) {
  const response = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/${teamId}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch team data");
  }

  return response.json();
}

async function getTeamSchedule(teamId: string) {
  const response = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/${teamId}/schedule`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch team schedule");
  }

  return response.json();
}

async function getTeamRoster(teamId: string) {
  const response = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/${teamId}/roster`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch team roser");
  }

  return response.json();
}

async function getTeamStats(teamId: string) {
  const response = await fetch(
    `https://sports.core.api.espn.com/v2/sports/basketball/leagues/nba/seasons/2023/types/2/teams/${teamId}/statistics`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch team stats");
  }

  return response.json();
}

async function getTeamNews(teamId: string) {
  const response = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/news?team=${teamId}`
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
    "Points Per Game": teamStats.splits.categories[2].stats[32],
    "Assists Per Game": teamStats.splits.categories[2].stats[34],
    "Rebounds Per Game": teamStats.splits.categories[1].stats[12],
    "Field Goal %": teamStats.splits.categories[2].stats[5],
    "3 Point %": teamStats.splits.categories[1].stats[13],
  };

  return (
    <>
      <Header teamData={teamData} league="nba" />
      <ContainerBox altColor={altColor} mainColor={mainColor}>
        <TeamStats stats={displayStats} />
        <TeamSchedule teamSchedule={teamSchedule} league="nba" />
        <Articles
          title={`${teamData.team.name} News`}
          teamNews={teamNews}
          articleLimit={8}
        />
      </ContainerBox>
    </>
  );
}
