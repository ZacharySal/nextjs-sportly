import View from "@/app/_components/MLB/views/team/Home";

export default async function Page({ params }: { params: { teamId: string } }) {
  const data = await fetch(`https://nextjs-sportly.vercel.app/api/mlb/teamData/${params.teamId}`, {
    cache: "no-cache",
  }).then((res) => res.json());

  return <View data={data} />;
}
