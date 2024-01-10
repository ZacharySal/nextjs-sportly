import View from "@/app/_components/NBA/views/News";
import { getLeagueNewsData } from "@/app/_lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recent NBA News",
};

export default async function Page() {
  const data = await getLeagueNewsData("nba");
  return <View data={data} />;
}
