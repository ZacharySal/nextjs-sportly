import View from "../_components/NBA/views/Home";

export default async function Page() {
  const data = await fetch(`https://nextjs-sportly.vercel.app/api/nba/leagueData`, {
    cache: "no-cache",
  }).then((res) => res.json());

  return <View data={data} />;
}
