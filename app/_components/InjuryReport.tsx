import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { nameExceptions } from "../_lib/constants";

const setTeamImageSrc = (fullName: string, league: string) => {
  console.log(`public/${league}/${fullName.replace(" ", "").toLowerCase()}.png`);

  let parts = fullName.split(" ");
  let teamName = parts.pop();

  if (typeof teamName === "undefined") {
    teamName = "";
  }

  if (nameExceptions.includes(fullName)) {
    parts = fullName.split(" ");
    parts.shift();
    teamName = parts.join(" ");
  }

  try {
    const src = require(`public/${league}/${teamName.replace(" ", "").toLowerCase()}.png`);
    return src;
  } catch {
    return `/default.png`;
  }
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

export default function InjuryReport({ data, league }: { data: any; league: string }) {
  return (
    <Box className="w-full bg-white p-3 flex flex-col gap-5 rounded-xl">
      <Typography className="font-semibold opacity-70 text-sm">Injury Report</Typography>
      {data.gameData.injuries.map((team: any) => (
        <Box className="flex flex-col gap-2">
          <Box className="flex flex-row items-center">
            {/* <Image
              width={100}
              height={100}
              priority={true}
              src={setTeamImageSrc(team.team.displayName, league)}
              className="w-10 object-contain"
              alt="team logo"
            /> */}
            <Typography className="opacity-80 font-[600] text-sm">
              {team.team.displayName}
            </Typography>
          </Box>
          <table className="stat-table">
            <thead>
              <tr className="text-[11px] opacity-70 ">
                <th className="pl-1" colSpan={2} align="left">
                  NAME, POS
                </th>
                <th align="right">STATUS</th>
                <th className="pr-1" align="right">
                  DATE
                </th>
              </tr>
            </thead>
            <tbody>
              {team.injuries.map((player: any) => (
                <tr className="text-xs opacity-60">
                  <td className="pl-1 injury-name" align="left" colSpan={2}>
                    {`${player.athlete.displayName} - ${player.athlete.position.abbreviation}`}
                  </td>
                  <td align="right">{player.status}</td>
                  <td className="pr-1 injury-date" align="right">
                    {formatDate(player.date)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      ))}
      <Link
        href={""}
        className="text-center w-full h-full text-xs text-[#06c] py-1 cursor-pointer font-semibold anchor-link"
      >
        Full Injury Report
      </Link>
    </Box>
  );
}
