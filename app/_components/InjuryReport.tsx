import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { nameExceptions } from "../_lib/constants";

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

export default function InjuryReport({ data, league }: { data: any; league: string }) {
  if (
    data.gameData.injuries[0].injuries.length === 0 &&
    data.gameData.injuries[1].injuries.length === 0
  )
    return null;
  return (
    <Box className="w-full bg-white p-3 flex flex-col gap-5 rounded-xl">
      <Typography className="font-semibold opacity-70 text-sm">Injury Report</Typography>
      {data.gameData.injuries.map((team: any) => (
        <>
          {team.injuries.length > 0 && (
            <Box key={uuidv4()} className="flex flex-col gap-1">
              <Box className="flex flex-row gap-1 items-center">
                <Image
                  width={team.team.logos[0].width}
                  height={team.team.logos[0].height}
                  priority={true}
                  src={team.team.logos[0].href}
                  className="w-7 object-contain"
                  alt="team logo"
                />
                <Typography className="opacity-80 font-[600] text-sm">
                  {team.team.displayName}
                </Typography>
              </Box>
              <table className="table misc-table">
                <thead>
                  <tr className="text-[11px] table-header">
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
                    <tr key={uuidv4()} className="text-xs opacity-60">
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
          )}
        </>
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
