import Image from "next/image";
import Link from "next/link";
import React from "react";
import { v4 as uuidv4 } from "uuid";

export default function LeagueStandings({
  data,
  league,
}: {
  data: any;
  league: string;
}) {
  return (
    <div className="w-full rounded-xl bg-white p-3">
      <p className="text-xl font-bold opacity-80 md:text-2xl">
        {league.toUpperCase()} 2023 Standings
      </p>
      <div className="flex w-full justify-center overflow-hidden">
        <div className="flex w-full flex-col gap-2">
          {data.groups.map((conference: any) => (
            <div className="w-full" key={uuidv4()}>
              <p className="font-sm my-2 font-semibold capitalize opacity-80">
                {conference.name}
              </p>
              <div className="flex min-w-full flex-row items-start">
                <table className="border-collapse">
                  <thead className="table-fixed-left-thead table-header">
                    <React.Fragment key={uuidv4()}>
                      <tr className="table-header border-r">
                        <th className="uppercase" align="left">
                          Teams
                        </th>
                      </tr>
                      {conference.standings.entries.map((team: any) => (
                        <tr key={uuidv4()} className="team-info-cell">
                          <td className="name-col z-10 text-xs" align="center">
                            <Link href={`/${league}/team/${team.team.id}/home`}>
                              <div className="flex w-full items-center justify-start gap-2 pl-1">
                                <Image
                                  src={team.team.logos[0].href}
                                  width={team.team.logos[0].width}
                                  height={team.team.logos[0].height}
                                  priority={true}
                                  alt="home team logo"
                                  className="w-6 object-contain"
                                />
                                <p className="text-xs text-[#3e82d6]">
                                  {team.team.abbreviation}
                                </p>
                              </div>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  </thead>
                </table>
                <div className="w-full overflow-x-auto">
                  <table className="misc-table table">
                    <thead>
                      <tr className="table-header">
                        {conference.standings.entries[0].stats.map(
                          (statType: any) => (
                            <th
                              key={uuidv4()}
                              className="whitespace-nowrap"
                              align="center"
                            >
                              {statType.shortDisplayName}
                            </th>
                          ),
                        )}
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
                                opacity:
                                  stat.abbreviation === "DIFF" ? "1" : "0.6",
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
