import View from "@/components/NBA/views/team/Home";
import {
  getNBATeamStats,
  getTeamNews,
  getTeamSchedule,
  getTeamData,
} from "@/lib/utils";

export const revalidate = 600;

export async function generateMetadata({
  params,
}: {
  params: { teamId: string };
}) {
  const teamData = await getTeamData("nba", params.teamId);

  return {
    title: `${teamData.team.location} ${teamData.team.name} Scores, News, Stats - Sportly`,
  };
}

export default async function Page({ params }: { params: { teamId: string } }) {
  const teamNews = await getTeamNews("nba", params.teamId);
  const teamSchedule = await getTeamSchedule("nba", params.teamId);
  const teamStats = await getNBATeamStats(params.teamId);
  const teamData = await getTeamData("nba", params.teamId);

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

// export async function generateStaticParams() {
//   const teamIds = new Array(30);

//   for (let i = 1; i < 31; i++) {
//     teamIds[i] = i;
//   }

//   return teamIds.map((teamId: string) => ({
//     teamId: String(teamId),
//   }));
// }
