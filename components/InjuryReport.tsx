import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { nameExceptions } from "../lib/constants";
import React from "react";
import { GameData } from "@/types";

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

export default function InjuryReport({ data }: { data: GameData }) {
  if (
    data.gameData.injuries[0].injuries.length === 0 &&
    data.gameData.injuries[1].injuries.length === 0
  )
    return null;
  return (
    <div className="flex w-full flex-col gap-3 rounded-xl bg-white p-3">
      <p className="border-b border-dotted border-b-[rgba(0,0,0,0.2)] pb-3 text-[14px] font-semibold">
        Injury Report
      </p>
      {data.gameData.injuries.map((team: any) => (
        <React.Fragment key={uuidv4()}>
          {team.injuries.length > 0 && (
            <div key={uuidv4()} className="flex flex-col gap-1">
              <div className="mb-1 flex flex-row items-center gap-1">
                <Image
                  width={team.team.logos[0].width}
                  height={team.team.logos[0].height}
                  priority={true}
                  src={team.team.logos[0].href}
                  className="w-6 object-contain"
                  alt="team logo"
                />
                <p className="text-sm font-[600] opacity-80">
                  {team.team.displayName}
                </p>
              </div>
              <table className="misc-table table">
                <thead>
                  <tr className="table-header text-[11px]">
                    <th className="pl-1 text-[11px]" colSpan={2} align="left">
                      NAME, POS
                    </th>
                    <th align="right" className="text-[11px]">
                      STATUS
                    </th>
                    <th className="pr-1 text-[11px]" align="right">
                      DATE
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {team.injuries.map((player: any) => (
                    <tr key={uuidv4()} className="text-[12px]">
                      <td className="injury-name pl-1" align="left" colSpan={2}>
                        <span className="font-[300] text-[#06c]">
                          {player.athlete.displayName}{" "}
                        </span>
                        <span className="text-[#6c6d6f]">
                          {player.athlete.position.abbreviation}
                        </span>
                      </td>
                      <td
                        align="right"
                        className="pr-1 uppercase text-[#6c6d6f]"
                      >
                        {player.status}
                      </td>
                      <td
                        className="injury-date pr-1 text-[#6c6d6f]"
                        align="right"
                      >
                        {formatDate(player.date)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {/* {team.injuries.length === 0 && (
            <div className="flex flex-col gap-3">
              <div className="flex flex-row gap-1 items-center">
                <Image
                  width={team.team.logos[0].width}
                  height={team.team.logos[0].height}
                  priority={true}
                  src={team.team.logos[0].href}
                  className="w-6 object-contain"
                  alt="team logo"
                />
                <p className="opacity-80 font-[600] text-sm">{team.team.displayName}</p>
              </div>
              <p className="text-sm opacity-60">No injured players</p>
            </div>
          )} */}
        </React.Fragment>
      ))}
      <Link
        href={""}
        className="anchor-link h-full w-full cursor-pointer py-1 text-center text-xs font-semibold text-[#06c]"
      >
        Full Injury Report
      </Link>
    </div>
  );
}
