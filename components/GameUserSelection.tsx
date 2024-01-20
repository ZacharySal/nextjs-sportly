import Image from "next/image";
import Link from "next/link";

export default function GameUserSelection({
  userSelection,
  data,
}: {
  userSelection: string;
  data: any;
}) {
  const selectionClass = (selection: string) =>
    selection === userSelection
      ? "selection-active nav-selection"
      : "nav-selection";

  return (
    <div className="w-full bg-white shadow-lg">
      <div className="testing flex h-10 w-full max-w-full items-center justify-start gap-5 overflow-x-auto overflow-y-hidden pl-2 md:h-11 md:pl-10 2xl:w-1/2 2xl:justify-center">
        <Link className={selectionClass("gamecast")} href={`home`}>
          Gamecast
        </Link>
        {data.isGameStarted && (
          <>
            <Link className={selectionClass("playbyplay")} href={`playbyplay`}>
              Play-by-Play
            </Link>
            <Link className={selectionClass("boxscore")} href={`boxscore`}>
              Boxscore
            </Link>
          </>
        )}
        <Link className={`${selectionClass("news")} md:hidden`} href={`news`}>
          News
        </Link>
      </div>
    </div>
  );
}
