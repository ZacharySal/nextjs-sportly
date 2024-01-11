import View from "@/app/_components/NBA/views/game/News";
import { getNBAGameData } from "@/app/_lib/utils";

export const revalidate = 10;
export async function generateMetadata({ params }: { params: { gameId: string } }) {
  const gameData = await getNBAGameData(params.gameId);

  return {
    title: `${gameData.awayTeam.team.name} vs ${gameData.homeTeam.team.name} (${new Date(
      gameData.gameInfo.date
    ).toLocaleDateString("us-en", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })}) News - Sportly`,
  };
}

export default async function Page({ params }: { params: { gameId: string } }) {
  const data = await getNBAGameData(params.gameId);
  return <View data={data} />;
}
