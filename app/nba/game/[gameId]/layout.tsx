import GameHeader from "@/app/_components/GameHeader";
import { getNBAGameData } from "@/app/_lib/utils";

export default async function Layout({
  children,
  params,
}: {
  params: { gameId: string };
  children: React.ReactNode;
}) {
  const data = await getNBAGameData(params.gameId);
  return (
    <>
      <GameHeader data={data} league="nba" />
      {children}
    </>
  );
}
