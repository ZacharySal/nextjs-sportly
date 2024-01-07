import View from "../../../../_components/NFL/views/game/Home";

export default async function Page({ params }: { params: { gameId: string } }) {
  const data = await fetch(`https://nextjs-sportly.vercel.app/api/nfl/gameData/${params.gameId}`, {
    cache: "no-cache",
  }).then((res) => res.json());

  return <View data={data} />;
}
