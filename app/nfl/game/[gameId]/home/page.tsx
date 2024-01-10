import View from "../../../../_components/NFL/views/game/Home";
import { getNFLGameData } from "@/app/_lib/utils";

export async function generateMetadata({ params }: { params: { gameId: string } }) {
  const gameData = await getNFLGameData(params.gameId);

  return {
    title: `${gameData.awayTeam.team.name} vs ${gameData.homeTeam.team.name} (${new Date(
      gameData.gameInfo.date
    ).toLocaleDateString("us-en", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })}) - Sportly`,
  };
}

export default async function Page({ params }: { params: { gameId: string } }) {
  const data = await getNFLGameData(params.gameId);

  return <View data={data} />;
}
