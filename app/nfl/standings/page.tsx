import { getLeagueStandingsData } from "@/app/_lib/utils";
import View from "../../_components/NFL/views/Standings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NFL Standings 2023-24 Season - Sportly",
};

export default async function Page() {
  const data = await getLeagueStandingsData("nfl");

  return <View data={data} />;
}
