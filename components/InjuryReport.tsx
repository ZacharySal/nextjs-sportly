import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { nameExceptions } from "../lib/constants";
import React from "react";

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
    <div className="w-full bg-white p-3 flex flex-col gap-3 rounded-xl">
      <p className="font-semibold text-[14px] border-b border-dotted pb-3 border-b-[rgba(0,0,0,0.6)]">
        Injury Report
      </p>
      {data.gameData.injuries.map((team: any) => (
        <React.Fragment key={uuidv4()}>
          {team.injuries.length > 0 && (
            <div key={uuidv4()} className="flex flex-col gap-1">
              <div className="flex flex-row gap-1 items-center">
                <Image
                  width={team.team.logos[0].width}
                  height={team.team.logos[0].height}
                  priority={true}
                  src={team.team.logos[0].href}
                  className="w-7 object-contain"
                  alt="team logo"
                />
                <p className="opacity-80 font-[600] text-sm">{team.team.displayName}</p>
              </div>
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
            </div>
          )}
        </React.Fragment>
      ))}
      <Link
        href={""}
        className="text-center w-full h-full text-xs text-[#06c] py-1 cursor-pointer font-semibold anchor-link"
      >
        Full Injury Report
      </Link>
    </div>
  );
}
