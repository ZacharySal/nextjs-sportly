import View from "@/app/_components/NBA/views/game/Home";

export default async function Page({ params }: { params: { gameId: string } }) {
  return <View gameId={params.gameId} />;
}

export async function generateMetadata({ params }: { params: { gameId: string } }) {
  const gameData = await fetch(`http://localhost:3000/api/nba/gameData/${params.gameId}`).then(
    (res) => res.json()
  );

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
