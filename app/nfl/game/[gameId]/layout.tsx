import GameHeader from "@/components/GameHeader";
import { getNFLGameData } from "@/lib/utils";

export default async function Layout({
  children,
  params,
}: {
  params: { gameId: string };
  children: React.ReactNode;
}) {
  const data = await fetch(
    `https://nextjs-sportly.vercel.app/api/nfl/gameData/${params.gameId}`
  ).then((res) => res.json());
  return (
    <>
      <GameHeader data={data} league="nfl" />
      {children}
    </>
  );
}
