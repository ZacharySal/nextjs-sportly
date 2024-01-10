import { getLeagueNewsData } from "@/app/_lib/utils";
import View from "../../_components/NFL/views/News";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recent NFL News - Sportly",
};

export default async function Page() {
  const data = await getLeagueNewsData("nfl");

  return <View data={data} />;
}
