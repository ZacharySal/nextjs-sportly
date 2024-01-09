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
    selection === userSelection ? "selection-active nav-selection" : "nav-selection";

  return (
    <div className="w-full bg-white sticky top-[2.75rem] z-20 drop-shadow-lg">
      <div className="testing w-full 2xl:w-1/2 max-w-full overflow-x-auto overflow-y-hidden h-10 md:h-11 flex justify-start 2xl:justify-center items-center gap-3 px-2 md:pl-10">
        <div className="relative flex-shrink-0 flex flex-row items-center gap-2 leage-logo">
          <Image
            src={`/${league}/${league}-logo.png`}
            width={500}
            height={500}
            alt="league logo"
            className="w-8 object-cover"
          />
          <p className="user-selection-logo pr-3 text-sm font-semibold">{league.toUpperCase()}</p>
        </div>
        <Link className={selectionClass("scoreboard")} href={`/${league}`}>
          Scoreboard
        </Link>
        <Link className={selectionClass("teams")} href={`/${league}/teams`}>
          Teams
        </Link>
        <Link className={selectionClass("standings")} href={`/${league}/standings`}>
          Standings
        </Link>
        <Link className={`${selectionClass("news")} md:hidden`} href={`/${league}/news`}>
          News
        </Link>
      </div>
    </div>
  );
}
