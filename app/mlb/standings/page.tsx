import View from "../../_components/MLB/views/Standings";

export default async function Page() {
  const data = await fetch("https://nextjs-sportly.vercel.app/api/mlb/leagueData", {
    cache: "no-cache",
  }).then((res) => res.json());

  return <View data={data} />;
}
