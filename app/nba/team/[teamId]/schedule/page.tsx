import View from "@/app/_components/NBA/views/team/Schedule";

export default async function Page({ params }: { params: { teamId: string } }) {
  const data = await fetch(`https://nextjs-sportly.vercel.app/api/nba/teamData/${params.teamId}`, {
    cache: "no-cache",
  }).then((res) => res.json());

  return <View data={data} />;
}
