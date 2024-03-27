import { getTeamData, getTeamNews, getTeamRoster } from "@/lib/utils";
import View from "../../../../../components/NFL/views/team/Roster";

export const revalidate = 600;

export async function generateMetadata({
  params,
}: {
  params: { teamId: string };
}) {
  const teamData = await getTeamData("nfl", params.teamId);

  return {
    title: `${teamData.team.location} ${teamData.team.name} 2023-24 Roster - Sportly`,
  };
}

export default async function Page({ params }: { params: { teamId: string } }) {
  const teamNews = await getTeamNews("nfl", params.teamId);
  const teamRoster = await getTeamRoster("nfl", params.teamId);
  const teamData = await getTeamData("nfl", params.teamId);

  return (
    <View
      data={{
        teamNews,
        teamRoster,
        teamData,
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
