import { Metadata } from "next";
import View from "../_components/NFL/views/Home";
import { getLeagueScoreData } from "../_lib/utils";

export const revalidate = 15;

export const metadata: Metadata = {
  title: "NFL Scores 2023-24 Season - Sportly",
};

export default async function Page() {
  const data = await getLeagueScoreData("nfl");
  return <View data={data} />;
}
