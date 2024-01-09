import View from "@/app/_components/NBA/views/News";

async function getScoreData() {
  const scoreData = await fetch(`https://cdn.espn.com/core/nba/scoreboard?xhr=1`);

  if (!scoreData.ok) {
    throw new Error("Failed to fetch NBA score data");
  }

  const scoreDataResponse = await scoreData.json();

  return {
    scoreData: scoreDataResponse,
  };
}

export default async function Page({ params }: { params: { gameId: string } }) {
  const data = await getScoreData();

  return <View data={data} />;
}
