import View from "../../../../_components/NFL/views/team/Schedule";

export default async function Page({ params }: { params: { teamId: string } }) {
  const data = await fetch(`https://nextjs-sportly.vercel.app/api/nfl/teamData/${params.teamId}`, {
    cache: "no-cache",
  }).then((res) => res.json());

  return <View data={data} />;
}
