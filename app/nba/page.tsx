import { Metadata } from "next";
import View from "../_components/NBA/views/Home";

export const metadata: Metadata = {
  title: "NBA Scores 2023-24 Season - Sportly",
};

export default async function Page() {
  return <View />;
}
