import { Metadata } from "next";
import View from "./_components/NBA/views/Home";
import { getLeagueScoreData } from "./_lib/utils";

export const metadata: Metadata = {
  title: "NBA Scores 2023-24 Season - Sportly",
};

export default async function Page() {
  const data = await getLeagueScoreData("nba");
  return <View data={data} />;
}
