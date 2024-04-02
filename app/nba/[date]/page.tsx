import { Metadata } from "next";
import View from "../../../components/NBA/views/Home";

export const metadata: Metadata = {
  title: "NBA Scores 2023-24 Season - Sportly",
};

export default async function Page({ params }: { params: { date: string } }) {
  return <View date={params.date} />;
}
