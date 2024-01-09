import View from "../_components/NBA/views/Home";

async function getScoreData() {
  const scoreData = await fetch(`https://cdn.espn.com/core/nba/scoreboard?xhr=1`, {
    next: { revalidate: 30 },
  });

  if (!scoreData.ok) {
    throw new Error("Failed to fetch NBA score data");
  }

  const scoreDataResponse = await scoreData.json();

  return {
    scoreData: scoreDataResponse,
  };
}

export default async function Page() {
  const data = await getScoreData();
  return <View data={data} />;
}
