"use client";

import GameHeader from "@/app/_components/GameHeader";
import TeamHeader from "@/app/_components/TeamHeader";
import useSwr from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function RootLayout({
  children,
  params,
}: {
  params: { teamId: string };
  children: React.ReactNode;
}) {
  let { data, isLoading } = useSwr(
    `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${params.teamId}`,
    fetcher,
    { refreshInterval: 5000 }
  );
  if (!isLoading)
    return (
      <>
        <TeamHeader data={data} league="nfl" />
        {children}
      </>
    );
}
