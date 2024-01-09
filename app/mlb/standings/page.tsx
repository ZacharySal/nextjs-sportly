import View from "../../_components/MLB/views/Standings";

async function getStandingsData() {
  const scoreData = await fetch(`https://cdn.espn.com/core/mlb/scoreboard?xhr=1`);

  if (!scoreData.ok) {
    throw new Error("Failed to fetch NBA score data");
  }

  const scoreDataResponse = await scoreData.json();

  const standingsData = await fetch("https://cdn.espn.com/core/mlb/standings?xhr=1", {});

  if (!standingsData.ok) {
    throw new Error("Failed to fetch NFL standings data");
  }

  const standingsDataResponse = await standingsData.json();

  return {
    scoreData: scoreDataResponse,
    standingsData: standingsDataResponse,
  };
}

export default async function Page() {
  const data = await getStandingsData();

  return <View data={data} />;
}
