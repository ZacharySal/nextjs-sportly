import View from "@/components/MLB/views/team/Home";
import { getMLBTeamStats, getTeamNews, getTeamSchedule, getTeamData } from "@/lib/utils";

export async function generateMetadata({ params }: { params: { teamId: string } }) {
  const teamData = await getTeamData("mlb", params.teamId);

  return {
    title: `${teamData.team.location} ${teamData.team.name} Scores, News, Stats - Sportly`,
  };
}

export default async function Page({ params }: { params: { teamId: string } }) {
  const teamNews = await getTeamNews("mlb", params.teamId);
  const teamSchedule = await getTeamSchedule("mlb", params.teamId);
  const teamStats = await getMLBTeamStats(params.teamId);
  const teamData = await getTeamData("mlb", params.teamId);

  return (
    <View
      data={{
        teamData,
        teamSchedule,
        teamStats: teamStats.displayStats,
        fullTeamStats: teamStats.fullStats,
        teamNews,
      }}
    />
  );
}
