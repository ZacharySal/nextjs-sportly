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
    selection === userSelection ? "selection-active nav-selection" : "nav-selection";

  return (
    <div className="w-full bg-white drop-shadow-lg">
      <div className="testing w-full 2xl:w-1/2 max-w-full overflow-x-auto overflow-y-hidden h-10 md:h-11 flex justify-start 2xl:justify-center items-center gap-5 pl-2 md:pl-10">
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
