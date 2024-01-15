import { getLeagueNewsData } from "@/lib/utils";
import View from "../../../components/NFL/views/News";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recent NFL News - Sportly",
};

export default async function Page() {
  const data = await getLeagueNewsData("nfl");

  return <View data={data} />;
}
