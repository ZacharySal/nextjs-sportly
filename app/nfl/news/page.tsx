import View from "../../_components/NFL/views/News";

async function getScoreData() {
  const scoreData = await fetch(`https://cdn.espn.com/core/nfl/scoreboard?xhr=1`);

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
