import Image from "next/image";
import Link from "next/link";

export default function LeagueUserSelection({
  userSelection,
  league,
}: {
  userSelection: string;
  league: string;
}) {
  const selectionClass = (selection: string) =>
    selection === userSelection
      ? "selection-active nav-selection"
      : "nav-selection";

  return (
    <div className="sticky top-[2.75rem] z-20 w-full bg-white shadow-lg">
      <div className="testing flex h-10 w-full max-w-full items-center justify-start gap-3 overflow-x-auto overflow-y-hidden px-2 md:h-11 md:pl-10 2xl:w-1/2 2xl:justify-center">
        <div className="leage-logo relative flex flex-shrink-0 flex-row items-center gap-2">
          <Image
            src={`/${league}/${league}-logo.png`}
            width={500}
            height={500}
            alt="league logo"
            className="w-8 object-cover"
          />
          <p className="user-selection-logo pr-3 text-sm font-semibold">
            {league.toUpperCase()}
          </p>
        </div>
        <Link className={selectionClass("scoreboard")} href={`/${league}`}>
          Scoreboard
        </Link>
        <Link className={selectionClass("teams")} href={`/${league}/teams`}>
          Teams
        </Link>
        <Link
          className={selectionClass("standings")}
          href={`/${league}/standings`}
        >
          Standings
        </Link>
        <Link
          className={`${selectionClass("news")} md:hidden`}
          href={`/${league}/news`}
        >
          News
        </Link>
      </div>
    </div>
  );
}
