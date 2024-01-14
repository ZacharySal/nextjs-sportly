import GameHeader from "@/app/_components/GameHeader";
import { getNFLGameData } from "@/app/_lib/utils";

export default async function Layout({
  children,
  params,
}: {
  params: { gameId: string };
  children: React.ReactNode;
}) {
  const data = await fetch(`http://localhost:3000/api/nfl/gameData/${params.gameId}`).then((res) =>
    res.json()
  );
  return (
    <>
      <GameHeader data={data} league="nfl" />
      {children}
    </>
  );
}
