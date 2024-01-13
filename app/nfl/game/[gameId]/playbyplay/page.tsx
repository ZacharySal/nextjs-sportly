import { getLeagueScoreData, getNFLGameData } from "@/app/_lib/utils";
import View from "../../../../_components/NFL/views/game/PlaybyPlay";

export const revalidate = 15;

export async function generateMetadata({ params }: { params: { gameId: string } }) {
  const gameData = await getNFLGameData(params.gameId);

  return {
    title: `${gameData.awayTeam.team.name} vs ${gameData.homeTeam.team.name} (${new Date(
      gameData.gameInfo.date
    ).toLocaleDateString("us-en", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })}) Play by Play - Sportly`,
  };
}

export default async function Page({ params }: { params: { gameId: string } }) {
  const data = await getNFLGameData(params.gameId);
  return <View data={data} />;
}

// export async function generateStaticParams() {
//   const data = await getLeagueScoreData("nfl");

//   return data.scoreData.content.sbData.events.map((event: any) => ({
//     gameId: String(event.id),
//   }));
// }
