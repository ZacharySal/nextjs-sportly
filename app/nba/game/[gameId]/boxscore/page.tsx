import View from "@/app/_components/NBA/views/game/Boxscore";

export default async function Page({ params }: { params: { gameId: string } }) {
  return <View gameId={params.gameId} />;
}

export async function generateMetadata({ params }: { params: { gameId: string } }) {
  const gameData = await fetch(
    `https://nextjs-sportly.vercel.app/api/nba/gameData/${params.gameId}`
  ).then((res) => res.json());

  return {
    title: `${gameData.awayTeam.team.name} vs ${gameData.homeTeam.team.name} (${new Date(
      gameData.gameInfo.date
    ).toLocaleDateString("us-en", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })}) Boxscore - Sportly`,
  };
}
