import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import { v4 as uuidv4 } from "uuid";

export default function LeagueStandings({ standingsData }: { standingsData: any }) {
  const setTeamImageSrc = (teamName: string) => {
    try {
      const src = require(`public/${"nfl"}/${teamName.replace(" ", "").toLowerCase()}.png`);
      return src;
    } catch {
      return `/default.png`;
    }
  };
  /* START HERE*/
  return (
    <Box className="py-2 bg-white rounded-xl flex justify-center w-full overflow-hidden">
      <Box className="w-full flex flex-col gap-2">
        {standingsData.standings.groups.map((conference: any) => (
          <>
            <Typography className="px-2 font-sm font-bold opacity-80 capitalize">{conference.name}</Typography>
            <Box className="flex flex-row items-start">
              <tbody className="standings-first-col">
                {conference.groups.map((division: any) => (
                  <React.Fragment key={uuidv4()}>
                    <th className="name-col-header text-xs font-[500] z-10 uppercase" align="center">
                      {division.name}
                    </th>
                    {division.standings.entries.map((team: any) => (
                      <tr key={uuidv4()}>
                        <td className="text-xs name-col z-10" align="center">
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
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
              <Box className="w-full max-w-full bg-white overflow-x-scroll z-[0]">
                <div className="standings-table w-full max-w-full bg-white overflow-x-scroll relative">
                  {conference.groups.map((division: any) => (
                    <React.Fragment key={uuidv4()}>
                      <thead>
                        <tr>
                          <th className="text-xs font-[500]" align="center">
                            W
                          </th>
                          <th className="text-xs font-[500]" align="center">
                            L
                          </th>
                          <th className="text-xs font-[500]" align="center">
                            T
                          </th>
                          <th className="text-xs font-[500]" align="center">
                            PCT
                          </th>
                          <th className="text-xs font-[500]" align="center">
                            HOME
                          </th>
                          <th className="text-xs font-[500]" align="center">
                            AWAY
                          </th>
                          <th className="text-xs font-[500]" align="center">
                            DIV
                          </th>
                          <th className="text-xs font-[500]" align="center">
                            CONF
                          </th>
                          <th className="text-xs font-[500]" align="center">
                            PF
                          </th>
                          <th className="text-xs font-[500]" align="center">
                            PA
                          </th>
                          <th className="text-xs font-[500]" align="center">
                            DIFF
                          </th>
                          <th className="text-xs font-[500]" align="center">
                            STREAK
                          </th>
                        </tr>
                      </thead>

                      {division.standings.entries.map((team: any) => (
                        <tbody key={uuidv4()}>
                          <tr>
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
                        </tbody>
                      ))}
                    </React.Fragment>
                  ))}
                </div>
              </Box>
            </Box>
          </>
        ))}
      </Box>
    </Box>
  );
}
