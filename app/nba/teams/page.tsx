import View from "@/app/_components/NBA/views/Teams";

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

export default async function Page({ params }: { params: { teamId: string } }) {
  const data = await getScoreData();

  return <View data={data} />;
}
