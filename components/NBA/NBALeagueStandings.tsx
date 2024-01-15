import Image from "next/image";
import Link from "next/link";
import React from "react";
import { v4 as uuidv4 } from "uuid";

export default function LeagueStandings({ data, league }: { data: any; league: string }) {
  return (
    <div className="p-3 bg-white rounded-xl w-full">
      <p className="text-xl md:text-2xl font-bold opacity-80">
        {league.toUpperCase()} 2023 Standings
      </p>
      <div className="flex justify-center w-full overflow-hidden">
        <div className="w-full flex flex-col gap-2">
          {data.groups.map((conference: any) => (
            <div className="w-full" key={uuidv4()}>
              <p className="font-sm font-semibold opacity-80 capitalize my-2">{conference.name}</p>
              <div className="min-w-full flex flex-row items-start">
                <table className="border-collapse">
                  <thead className="table-fixed-left-thead table-header">
                    <React.Fragment key={uuidv4()}>
                      <tr className="table-header">
                        <th className="uppercase" align="left">
                          Teams
                        </th>
                      </tr>
                      {conference.standings.entries.map((team: any) => (
                        <tr key={uuidv4()} className="team-info-cell">
                          <td className="text-xs name-col z-10" align="center">
                            <Link href={`/${league}/team/${team.team.id}/home`}>
                              <div className="flex items-center justify-start pl-1 gap-2 w-full">
                                <Image
                                  src={team.team.logos[0].href}
                                  width={team.team.logos[0].width}
                                  height={team.team.logos[0].height}
                                  priority={true}
                                  alt="home team logo"
                                  className="w-6 object-contain"
                                />
                                <p className="text-xs text-[#3e82d6]">{team.team.abbreviation}</p>
                              </div>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  </thead>
                </table>
                <div className="w-full overflow-x-auto">
                  <table className="table misc-table">
                    <thead>
                      <tr className="table-header">
                        {conference.standings.entries[0].stats.map((statType: any) => (
                          <th key={uuidv4()} align="center">
                            {statType.shortDisplayName}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {conference.standings.entries.map((team: any) => (
                        <tr key={uuidv4()}>
                          {team.stats.map((stat: any) => (
                            <td
                              key={uuidv4()}
                              style={{
                                color:
                                  stat.abbreviation === "DIFF"
                                    ? Number(stat.displayValue > 0)
                                      ? "#094"
                                      : "#d00"
                                    : "black",
                                opacity: stat.abbreviation === "DIFF" ? "1" : "0.6",
                              }}
                              className="table-cell"
                              align="center"
                            >
                              {stat.displayValue}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
