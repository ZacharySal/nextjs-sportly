import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { v4 as uuidv4 } from "uuid";

function getMLBDivisionName(divisionName: any) {
  return divisionName.substring(15, divisionName.length);
}
export default function LeagueStandings({ standingsData, league }: { standingsData: any; league: string }) {
  const setTeamImageSrc = (teamName: string) => {
    try {
      const src = require(`public/${league}/${teamName.replace(" ", "").toLowerCase()}.png`);
      return src;
    } catch {
      return `/default.png`;
    }
  };
  /* START HERE*/
  if (typeof standingsData.standings.groups[0].groups === "undefined") {
    return <Typography className="mx-auto my-5">No {league.toUpperCase()} standings available</Typography>;
  } else {
    return (
      <Box className="p-2 bg-white rounded-xl flex justify-center w-full overflow-hidden">
        <Box className="w-full flex flex-col gap-2">
          {standingsData.standings.groups.map((conference: any) => (
            <React.Fragment key={uuidv4()}>
              <Typography className="px-2 font-sm font-bold opacity-80 capitalize">{conference.name}</Typography>
              <Box className="w-full flex flex-row items-start">
                <table className="border-collapse">
                  <thead className="standings-first-col">
                    {conference.groups.map((division: any) => (
                      <React.Fragment key={uuidv4()}>
                        <tr>
                          <th className="name-col-header text-xs font-[500] z-10 uppercase" align="center">
                            {league === "nfl" ? division.name : getMLBDivisionName(division.name)}
                          </th>
                        </tr>
                        {division.standings.entries.map((team: any) => (
                          <tr key={uuidv4()} className="team-info-cell">
                            <td className="text-xs name-col z-10" align="center">
                              <Link href={`/${league}/team/${team.team.id}`}>
                                <Box className="flex items-center justify-start pl-1 gap-2 w-full">
                                  <Image
                                    src={setTeamImageSrc(team.team.shortDisplayName)}
                                    width={100}
                                    height={100}
                                    priority={true}
                                    alt="home team logo"
                                    className="w-7 object-contain"
                                  />
                                  <Typography className="text-xs text-[#3e82d6]">{team.team.abbreviation}</Typography>
                                </Box>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </thead>
                </table>
                <Box className="overflow-x-auto">
                  <table className="standings-table max-w-full bg-white">
                    {conference.groups.map((division: any) => (
                      <React.Fragment key={uuidv4()}>
                        <thead>
                          <tr>
                            {division.standings.entries[0].stats.map((statType: any) => (
                              <th key={uuidv4()} className="text-xs font-[500]" align="center">
                                {statType.shortDisplayName}
                              </th>
                            ))}
                          </tr>
                        </thead>

                        {division.standings.entries.map((team: any) => (
                          <tr key={uuidv4()} className="team-stat-cell">
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
                                className="text-xs"
                                align="center"
                              >
                                {stat.displayValue}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </table>
                </Box>
              </Box>
            </React.Fragment>
          ))}
        </Box>
      </Box>
    );
  }
}
