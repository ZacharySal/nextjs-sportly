"use client";

import GameHeader from "@/app/_components/GameHeader";
import useSwr from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function RootLayout({
  children,
  params,
}: {
  params: { gameId: string };
  children: React.ReactNode;
}) {
  let { data, isLoading } = useSwr(
    `https://site.api.espn.com/apis/site/v2/sports/football/nfl/summary?event=${params.gameId}`,
    fetcher
  );
  if (!isLoading)
    return (
      <>
        <GameHeader data={data} league="nfl" />
        {children}
      </>
    );
}
