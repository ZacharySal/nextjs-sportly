import View from "@/app/_components/NBA/views/Standings";
import { getLeagueStandingsData } from "@/app/_lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "2023-24 NBA Standings",
};

export default async function Page() {
  const data = await getLeagueStandingsData("nba");
  return <View data={data} />;
}
