import View from "../../_components/MLB/views/Teams";

async function getScoreData() {
  const scoreData = await fetch(`https://cdn.espn.com/core/mlb/scoreboard?xhr=1`);

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

export async function generateStaticParams() {
  const teamIds = new Array(30);

  for (let i = 1; i < 31; i++) {
    teamIds[i] = i;
  }

  return teamIds.map((teamId: string) => ({
    teamId: String(teamId),
  }));
}
