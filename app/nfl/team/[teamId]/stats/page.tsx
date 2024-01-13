import { getTeamData, getTeamNews, getNFLTeamStats } from "@/app/_lib/utils";
import View from "../../../../_components/NFL/views/team/Stats";

export const revalidate = 600;

export async function generateMetadata({ params }: { params: { teamId: string } }) {
  const teamData = await getTeamData("nfl", params.teamId);

  return {
    title: `${teamData.team.location} ${teamData.team.name} 2023-24 Stats - Sportly`,
  };
}

export default async function Page({ params }: { params: { teamId: string } }) {
  const teamNews = await getTeamNews("nfl", params.teamId);
  const teamStats = await getNFLTeamStats(params.teamId);
  const teamData = await getTeamData("nfl", params.teamId);

  return (
    <View
      data={{
        teamData,
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
