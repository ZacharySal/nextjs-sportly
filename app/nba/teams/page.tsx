import View from "@/components/NBA/views/Teams";
import { getLeagueNewsData } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "2023-24 NBA Teams",
};

export default async function Page() {
  const data = await getLeagueNewsData("nba");
  return <View data={data} />;
}
