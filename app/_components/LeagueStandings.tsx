import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { v4 as uuidv4 } from "uuid";

function getMLBDivisionName(divisionName: any) {
  return divisionName.substring(15, divisionName.length);
}
export default function LeagueStandings({ data, league }: { data: any; league: string }) {
  if (league === "nba") {
    console.log(data);
  }
  if (typeof data.standings.standings.groups[0].groups === "undefined") {
    return (
      <Typography className="mx-auto my-5">
        No {league.toUpperCase()} standings available
      </Typography>
    );
  } else {
    return (
      <Box className="p-3 bg-white rounded-xl w-full">
        <Typography className="text-xl md:text-2xl font-bold opacity-80">
          {league.toUpperCase()} 2023 Standings
        </Typography>
        <Box className="flex justify-center w-full overflow-hidden">
          <Box className="w-full flex flex-col gap-2">
            {data.standings.standings.groups.map((conference: any) => (
              <Box className="w-full" key={uuidv4()}>
                <Typography className="font-sm font-semibold opacity-80 capitalize my-2">
                  {conference.name}
                </Typography>
                <Box className="min-w-full flex flex-row items-start">
                  <table className="border-collapse">
                    <thead className="table-fixed-left-thead table-header">
                      {conference.groups.map((division: any) => (
                        <React.Fragment key={uuidv4()}>
                          <tr className="table-header">
                            <th className="uppercase" align="left">
                              {league === "nfl" ? division.name : getMLBDivisionName(division.name)}
                            </th>
                          </tr>
                          {division.standings.entries.map((team: any) => (
                            <tr key={uuidv4()} className="team-info-cell">
                              <td className="text-xs name-col z-10" align="center">
                                <Link href={`/${league}/team/${team.team.id}/home`}>
                                  <Box className="flex items-center justify-start pl-1 gap-2 w-full">
                                    <Image
                                      src={team.team.logos[0].href}
                                      width={team.team.logos[0].width}
                                      height={team.team.logos[0].height}
                                      priority={true}
                                      alt="home team logo"
                                      className="w-6 object-contain"
                                    />
                                    <Typography className="text-xs text-[#3e82d6]">
                                      {team.team.abbreviation}
                                    </Typography>
                                  </Box>
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </React.Fragment>
                      ))}
                    </thead>
                  </table>
                  <Box className="w-full overflow-x-auto">
                    <table className="table standings-table">
                      {conference.groups.map((division: any) => (
                        <React.Fragment key={uuidv4()}>
                          <thead>
                            <tr className="table-header">
                              {division.standings.entries[0].stats.map((statType: any) => (
                                <th key={uuidv4()} align="center">
                                  {statType.shortDisplayName}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {division.standings.entries.map((team: any) => (
                              <tr key={uuidv4()} className="standings-table-row">
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
                        </React.Fragment>
                      ))}
                    </table>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    );
  }
}
