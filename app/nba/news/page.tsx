import View from "@/app/_components/NBA/views/News";

export default async function Page({ params }: { params: { gameId: string } }) {
  const data = await fetch(`https://nextjs-sportly.vercel.app/api/nba/leagueData`, {
    cache: "no-cache",
  }).then((res) => res.json());

  return <View data={data} />;
}
