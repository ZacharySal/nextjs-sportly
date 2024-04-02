import { Metadata } from "next";
import View from "../../../components/NFL/views/Home";

export const metadata: Metadata = {
  title: "NFL Scores 2023-24 Season - Sportly",
};

export default async function Page({ params }: { params: { date: string } }) {
  return <View date={params.date} />;
}
