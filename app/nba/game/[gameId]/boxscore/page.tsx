import View from "@/app/_components/NBA/views/game/Boxscore";

export default async function Page({ params }: { params: { gameId: string } }) {
  const data = await fetch(`https://nextjs-sportly.vercel.app/api/nba/gameData/${params.gameId}`, {
    cache: "no-cache",
  }).then((res) => res.json());

  return <View data={data} />;
}
