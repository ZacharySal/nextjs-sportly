import Link from "next/link";

export default function TeamUserSelection({
  userSelection,
}: {
  userSelection: string;
}) {
  const selectionClass = (selection: string) =>
    selection === userSelection
      ? "selection-active nav-selection"
      : "nav-selection";
  return (
    <div className="w-full bg-white shadow-lg">
      <div className="testing flex h-10 w-full max-w-full items-center justify-start gap-5 overflow-x-auto overflow-y-hidden pl-2 md:h-11 md:pl-10 2xl:w-1/2 2xl:justify-center">
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
