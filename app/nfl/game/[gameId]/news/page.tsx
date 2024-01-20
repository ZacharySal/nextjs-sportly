import View from "../../../../../components/NFL/views/game/News";

export async function generateMetadata({
  params,
}: {
  params: { gameId: string };
}) {
  const gameData = await fetch(
    `https://nextjs-sportly.vercel.app/api/nfl/gameData/${params.gameId}`,
  ).then((res) => res.json());

  return {
    title: `${gameData.awayTeam.team.name} vs ${gameData.homeTeam.team.name} (${new Date(
      gameData.gameInfo.date,
    ).toLocaleDateString("us-en", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })}) News - Sportly`,
  };
}

export default async function Page({ params }: { params: { gameId: string } }) {
  return <View gameId={params.gameId} />;
}
