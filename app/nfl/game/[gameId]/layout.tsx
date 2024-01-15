"use client";

import GameHeader from "@/components/GameHeader";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Layout({
  children,
  params,
}: {
  params: { gameId: string };
  children: React.ReactNode;
}) {
  const { data, isLoading } = useSWR(
    `https://nextjs-sportly.vercel.app/api/nfl/gameData/${params.gameId}`,
    fetcher,
    {
      refreshInterval: 5000,
    }
  );

  if (!isLoading)
    return (
      <>
        <GameHeader data={data} league="nfl" />
        {children}
      </>
    );
}
