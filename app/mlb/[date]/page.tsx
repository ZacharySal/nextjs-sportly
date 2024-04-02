import View from "../../../components/MLB/views/Home";

async function getScoreData() {
  const scoreData = await fetch(
    `https://cdn.espn.com/core/mlb/scoreboard?xhr=1`,
    {
      next: { revalidate: 30 },
    },
  );

  if (!scoreData.ok) {
    throw new Error("Failed to fetch NBA score data");
  }

  const scoreDataResponse = await scoreData.json();

  return {
    scoreData: scoreDataResponse,
  };
}

export default async function Page({ params }: { params: { date: string } }) {
  const data = await getScoreData();
  return <View data={data} date={params.date} />;
}
