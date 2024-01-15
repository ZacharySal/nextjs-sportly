import View from "@/components/NBA/views/News";
import { getLeagueNewsData } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recent NBA News",
};

export default async function Page() {
  const data = await getLeagueNewsData("nba");
  return <View data={data} />;
}
