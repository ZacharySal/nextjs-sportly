"use client";

import NBAGameHeader from "@/components/NBA/NBAGameHeader";
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
    `https://nextjs-sportly.vercel.app/api/nba/gameData/${params.gameId}`,
    fetcher,
    {
      refreshInterval: 5000,
    },
  );
  if (!isLoading)
    return (
      <>
        <NBAGameHeader data={data} league="nba" />
        {children}
      </>
    );
}
