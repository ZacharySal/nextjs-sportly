import View from "@/app/_components/MLB/views/game/PlaybyPlay";

export default async function Page({ params }: { params: { gameId: string } }) {
  const data = await fetch(`https://nextjs-sportly.vercel.app/api/mlb/gameData/${params.gameId}`, {
    cache: "no-cache",
  }).then((res) => res.json());

  return <View data={data} />;
}
