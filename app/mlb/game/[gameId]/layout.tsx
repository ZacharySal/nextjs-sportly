import GameHeader from "@/app/_components/GameHeader";
import { getMLBGameData } from "@/app/_lib/utils";

export default async function Layout({
  children,
  params,
}: {
  params: { gameId: string };
  children: React.ReactNode;
}) {
  const data = await getMLBGameData(params.gameId);
  return (
    <>
      <GameHeader data={data} league="nfl" />
      {children}
    </>
  );
}
