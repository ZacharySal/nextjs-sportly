import { Box, Typography, Divider } from "@mui/material";
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
}: {
  data: any;
  league: string;
}) {
  const teamName = data.teamData.team.displayName;

  const setTeamImageSrc = (teamName: string) => {
    try {
      const src = require(`public/${league}/${teamName
        .replace(" ", "")
        .toLowerCase()}.png`);
      return src;
    } catch {
      return `/default.png`;
    }
  };

  function formatName(event: any, teamName: string) {
    let newss = event.name.replace(teamName, "");
    let n = newss.replace(" at ", " @ ");
    let b =
      n.at(-1 - 1) === "@"
        ? "vs " + n.substring(0, n.indexOf("@"))
        : "@ " + n.split(" ").slice(-1);

    return b.includes("vs") ? (
      <Box className="w-[8rem] p-1 flex flex-row items-center gap-1">
        <Typography className="text-[11px] font-semibold opacity-70">
          {" "}
          vs{" "}
        </Typography>
        <Image
          width={100}
          height={100}
          priority={true}
          src={setTeamImageSrc(
            event.competitions[0].competitors[1].team.shortDisplayName
          )}
          className="w-8 object-contain"
          alt="team logo"
        />
        <Typography className="text-[11px] font-semibold opacity-70">
          {b
            .substring(0, b.lastIndexOf(" "))
            .split(" ")
            .splice(-1)[0]
            .replace("vs", "")}
        </Typography>
      </Box>
    ) : (
      <Box className="w-[8rem] p-1 flex flex-row items-center gap-1">
        <Typography className="text-[11px] font-semibold opacity-70">
          @
        </Typography>
        <Image
          width={100}
          height={100}
          priority={true}
          src={setTeamImageSrc(
            event.competitions[0].competitors[0].team.shortDisplayName
          )}
          className="w-8 object-contain"
          alt="team logo"
        />
        <Typography className="text-[11px] font-semibold opacity-70">
          {" "}
          {b.replace("@", "")}
        </Typography>
      </Box>
    );

    //   n = newss[-1] === "@" ? "home" :
  }

  return (
    <Box className="w-full bg-white pt-3 rounded-xl">
      <Typography className="px-3 py-1 mb-2 font-semibold text-base opacity-80">
        2023 Schedule
      </Typography>
      <Box className="grid grid-cols[2fr,auto,2fr] border-b border-t border-[rgba(0,0,0,0.1)] bg-[#f9f9fb] px-2 py-1">
        <Typography className="text-[10px] uppercase opacity-60 font-semibold">
          Regular Season
        </Typography>
      </Box>
      {data.teamSchedule.events.map((event: any, i: number) => (
        <Link href={`/${league}/game/${event.id}/home`} key={uuidv4()}>
          <Box className="grid grid-cols[2fr,auto,2fr] border-b border-[rgba(0,0,0,0.1)] bg-[#f9f9fb] px-2 py-1 team-schedule-card">
            {formatName(event, teamName)}
            {event.competitions[0].competitors[1]?.score?.value && (
              <Typography
                sx={{ color: teamWon(event, teamName) ? "#094" : "#d00" }}
                className="text-[11px] w-full text-end m-auto col-start-2 font-semibold"
              >
                {teamWon(event, teamName) ? "W" : "L"}
              </Typography>
            )}

            <Typography className="w-[4rem] text-end opacity-70 text-[11px] font-semibold m-auto col-start-3">
              {event.competitions[0].competitors[1]?.score?.value ? (
                <>
                  {event.competitions[0].competitors[1]?.score?.value || "0"} -{" "}
                  {event.competitions[0].competitors[0]?.score?.value || "0"}
                </>
              ) : (
                <>{formatDate(event.competitions[0].date)}</>
              )}
            </Typography>
          </Box>
        </Link>
      ))}
      <Typography className="text-center w-full h-full text-[13px] text-[#06c] cursor-pointer p-2 font-semibold">
        Full Schedule
      </Typography>
    </Box>
  );
}
