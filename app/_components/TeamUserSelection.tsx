import Link from "next/link";

export default function TeamUserSelection({ userSelection }: { userSelection: string }) {
  const selectionClass = (selection: string) =>
    selection === userSelection ? "selection-active nav-selection" : "nav-selection";
  return (
    <div className="w-full bg-white">
      <div className="testing w-full 2xl:w-1/2 max-w-full overflow-x-auto overflow-y-hidden h-10 md:h-11 flex justify-start 2xl:justify-center items-center gap-5 pl-2 md:pl-10">
        <Link className={selectionClass("home")} href={`home`}>
          Home
        </Link>
        <Link className={selectionClass("stats")} href={`stats`}>
          Statistics
        </Link>
        <Link className={selectionClass("roster")} href={`roster`}>
          Roster
        </Link>
        <Link className={selectionClass("schedule")} href={`schedule`}>
          Schedule
        </Link>
      </div>
    </div>
  );
}
