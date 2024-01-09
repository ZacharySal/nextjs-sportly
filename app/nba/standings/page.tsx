import View from "@/app/_components/NBA/views/Standings";

async function getStandingsData() {
  const scoreData = await fetch(`https://cdn.espn.com/core/nba/scoreboard?xhr=1`);

  if (!scoreData.ok) {
    throw new Error("Failed to fetch NBA score data");
  }

  const scoreDataResponse = await scoreData.json();

  const standingsData = await fetch("https://cdn.espn.com/core/nba/standings?xhr=1", {
    cache: "no-cache",
  });

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
