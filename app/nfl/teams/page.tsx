import { getLeagueNewsData } from "@/lib/utils";
import View from "../../../components/NFL/views/Teams";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NFL Scores 2023-24 Teams - Sportly",
};

export default async function Page() {
  const data = await getLeagueNewsData("nfl");

  return <View data={data} />;
}
