import GameHeader from "@/components/GameHeader";
import { getMLBGameData } from "@/lib/utils";

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
