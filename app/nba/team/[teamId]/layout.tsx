"use client";

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
    `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/${params.teamId}`,
    fetcher
  );

  if (!isLoading)
    return (
      <>
        <TeamHeader data={data} league="nba" />
        {children}
      </>
    );
}
