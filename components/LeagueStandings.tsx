import Image from "next/image";
import Link from "next/link";
import React from "react";
import { v4 as uuidv4 } from "uuid";

function getMLBDivisionName(divisionName: any) {
  return divisionName.substring(15, divisionName.length);
}
export default function LeagueStandings({
  data,
  league,
}: {
  data: any;
  league: string;
}) {
  if (typeof data.groups[0].groups === "undefined") {
    return (
      <p className="mx-auto my-5">
        No {league.toUpperCase()} standings available
      </p>
    );
  } else {
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
                      {conference.groups.map((division: any) => (
                        <React.Fragment key={uuidv4()}>
                          <tr className="table-header">
                            <th
                              className="min-w-[80px] border-r uppercase"
                              align="left"
                            >
                              {league === "nfl"
                                ? division.name
                                : getMLBDivisionName(division.name)}
                            </th>
                          </tr>
                          {division.standings.entries.map((team: any) => (
                            <tr key={uuidv4()} className="team-info-cell">
                              <td
                                className="name-col z-10 text-xs"
                                align="center"
                              >
                                <Link
                                  href={`/${league}/team/${team.team.id}/home`}
                                >
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
                      ))}
                    </thead>
                  </table>
                  <div className="w-full overflow-x-auto">
                    <table className="standings-table table">
                      {conference.groups.map((division: any) => (
                        <React.Fragment key={uuidv4()}>
                          <thead>
                            <tr className="table-header">
                              {division.standings.entries[0].stats.map(
                                (statType: any) => (
                                  <th key={uuidv4()} align="center">
                                    {statType.shortDisplayName}
                                  </th>
                                ),
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {division.standings.entries.map((team: any) => (
                              <tr
                                key={uuidv4()}
                                className="standings-table-row"
                              >
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
                                        stat.abbreviation === "DIFF"
                                          ? "1"
                                          : "0.6",
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
                        </React.Fragment>
                      ))}
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
}
