import { Metadata } from "next";
import NBAPage from "./nba/page";

export const metadata: Metadata = {
  title: "NBA Scores 2023-24 Season - Sportly",
};

export default async function Page() {
  return <NBAPage />;
}
