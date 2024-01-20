import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import Link from "next/link";

/* PLEASE DONT LOOK AT THIS FUNCTION */

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
  });
}

function teamWon(event: any, teamName: string) {
  return event.competitions[0].competitors[0].team.displayName === teamName
    ? event.competitions[0].competitors[0].score.value >
      event.competitions[0].competitors[1].score.value
      ? true
      : false
    : event.competitions[0].competitors[1].score.value >
        event.competitions[0].competitors[0].score.value
      ? true
      : false;
}

export default function DesktopTeamSchedule({
  data,
  league,
  isTeamView = false,
}: {
  data: any;
  league: string;
  isTeamView: boolean;
}) {
  const teamName = data.teamData.team.displayName;

  function formatName(event: any, teamName: string) {
    let newss = event.name.replace(teamName, "");
    let n = newss.replace(" at ", " @ ");
    let b =
      n.at(-1 - 1) === "@"
        ? "vs " + n.substring(0, n.indexOf("@"))
        : "@ " + n.split(" ").slice(-1);

    return b.includes("vs") ? (
      <div className="flex w-[8rem] flex-row items-center gap-1 p-1">
        <p className="text-[11px] font-semibold opacity-70"> vs </p>
        <Image
          width={event.competitions[0].competitors[1].team.logos[0].width}
          height={event.competitions[0].competitors[1].team.logos[0].height}
          priority={true}
          src={event.competitions[0].competitors[1].team.logos[0].href}
          className="w-7 object-contain"
          alt="team logo"
        />
        <p className="text-[11px] font-semibold opacity-70">
          {b
            .substring(0, b.lastIndexOf(" "))
            .split(" ")
            .splice(-1)[0]
            .replace("vs", "")}
        </p>
      </div>
    ) : (
      <div className="flex w-[8rem] flex-row items-center gap-1 p-1">
        <p className="text-[11px] font-semibold opacity-70">@</p>
        <Image
          width={event.competitions[0].competitors[0].team.logos[0].width}
          height={event.competitions[0].competitors[0].team.logos[0].height}
          priority={true}
          src={event.competitions[0].competitors[0].team.logos[0].href}
          className="w-7 object-contain"
          alt="team logo"
        />
        <p className="text-[11px] font-semibold opacity-70">
          {" "}
          {b.replace("@", "")}
        </p>
      </div>
    );

    //   n = newss[-1] === "@" ? "home" :
  }

  return (
    <div className="w-full rounded-xl bg-white">
      {isTeamView ? (
        <p className="mb-1 p-3 text-xl font-semibold opacity-90 md:text-2xl">
          {teamName} Schedule 2023
        </p>
      ) : (
        <p className="mb-2 px-3 py-1 pt-3 text-base font-semibold opacity-80">
          2023 Schedule
        </p>
      )}

      <div className="grid-cols[2fr,auto,2fr] grid border-b border-t border-[rgba(0,0,0,0.1)] bg-[#f9f9fb] px-2 py-1">
        <p className="text-[10px] font-semibold uppercase opacity-60">
          Regular Season
        </p>
      </div>
      {data.teamSchedule.events.map((event: any, i: number) => (
        <Link href={`/${league}/game/${event.id}/home`} key={uuidv4()}>
          <div className="grid-cols[2fr,auto,2fr] team-schedule-card grid border-b border-[rgba(0,0,0,0.1)] bg-[#f9f9fb] px-2 py-1">
            {formatName(event, teamName)}
            {event.competitions[0].competitors[1]?.score?.value && (
              <p
                style={{ color: teamWon(event, teamName) ? "#094" : "#d00" }}
                className="col-start-2 m-auto w-full text-end text-[11px] font-semibold"
              >
                {teamWon(event, teamName) ? "W" : "L"}
              </p>
            )}

            <p className="col-start-3 m-auto w-[4rem] text-end text-[11px] font-semibold opacity-70">
              {event.competitions[0].competitors[1]?.score?.value ? (
                <>
                  {event.competitions[0].competitors[1]?.score?.value || "0"} -{" "}
                  {event.competitions[0].competitors[0]?.score?.value || "0"}
                </>
              ) : (
                <>{formatDate(event.competitions[0].date)}</>
              )}
            </p>
          </div>
        </Link>
      ))}
      <p className="h-full w-full cursor-pointer p-2 text-center text-[13px] font-semibold text-[#06c]">
        Full Schedule
      </p>
    </div>
  );
}
