"use client";

import { FormControlLabel, Switch } from "@mui/material";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";

export default function NBAGameStats({
  data,
  isDesktopScreen,
}: {
  data: any;
  isDesktopScreen: boolean;
}) {
  const [selectedTeam, setSelectedTeam] = useState(1);
  const [showAllStats, setShowAllStats] = useState(
    isDesktopScreen ? true : false,
  );
  const awayTeamName = data.gameData.boxscore.teams[0].team.shortDisplayName;
  const homeTeamName = data.gameData.boxscore.teams[1].team.shortDisplayName;

  const tableHeader = (statType: any, teamOption: number) => {
    return teamOption === 0
      ? data.gameData.boxscore.teams[0].team.displayName
      : data.gameData.boxscore.teams[1].team.displayName;
  };

  const compactStats = {
    display: ["min", "fg", "3pt", "reb", "ast", "pf", "pts"],
    stats: [0, 1, 2, 6, 7, 11, 13],
    team: [0, 1, 2, 6, 7, 11, 13],
  };

  const teamBoxScore = (teamOption: number) => (
    <>
      {data.gameData.boxscore.players[teamOption].statistics.map(
        (statType: any) => (
          <div
            key={uuidv4()}
            className="mb-3 h-auto w-full rounded-xl bg-white"
          >
            <div className="mb-2 flex items-center justify-start gap-2">
              <Image
                width={
                  data.gameInfo.competitors[teamOption === 0 ? 1 : 0].team
                    .logos[0].width
                }
                height={
                  data.gameInfo.competitors[teamOption === 0 ? 1 : 0].team
                    .logos[0].height
                }
                alt="team"
                className="w-6 object-contain"
                src={
                  data.gameInfo.competitors[teamOption === 0 ? 1 : 0].team
                    .logos[0].href
                }
              />
              <div className="flex w-full flex-row items-center justify-between">
                <p className="text-[16px] font-[500] capitalize">
                  {tableHeader(statType, teamOption)}
                </p>
                {!isDesktopScreen && (
                  <FormControlLabel
                    control={
                      <Switch
                        checked={showAllStats}
                        onClick={() => setShowAllStats((show) => !show)}
                        size="small"
                      />
                    }
                    label={
                      <p className="text-xs font-[500] uppercase opacity-70">
                        All stats
                      </p>
                    }
                  />
                )}
              </div>
            </div>
            <div className="w-full">
              <div className="flex min-w-full flex-row items-start">
                <table className="border-collapse">
                  <thead className="table-fixed-left-thead table-header">
                    <tr>
                      <th className="pl-2 uppercase" align="left">
                        Name
                      </th>
                    </tr>
                    {statType.athletes.map((athlete: any) => (
                      <tr key={uuidv4()} className="">
                        <td className="athlete-name pl-2" align="left">
                          {athlete.athlete.shortName}{" "}
                          <span className="mb-5 text-[9px] text-[#6c6d6f]">
                            {athlete.athlete.position.abbreviation}
                          </span>
                        </td>
                      </tr>
                    ))}
                    <tr className="">
                      <td
                        className="name-col pl-1 text-xs font-semibold"
                        align="left"
                      >
                        TEAM
                      </td>
                    </tr>
                  </thead>
                </table>
                <div className="w-full overflow-x-auto">
                  <table className="stat-table table">
                    <thead>
                      <tr className="table-header">
                        {showAllStats &&
                          statType.labels.map((label: string) => (
                            <th key={uuidv4()} className="" align="center">
                              {label}
                            </th>
                          ))}
                        {!showAllStats &&
                          compactStats.display.map((label: string) => (
                            <th
                              key={uuidv4()}
                              className="uppercase"
                              align="center"
                            >
                              {label}
                            </th>
                          ))}
                      </tr>
                    </thead>
                    <tbody>
                      {statType.athletes.map((athlete: any) => (
                        <tr key={uuidv4()}>
                          {athlete.stats.length === 0 ? (
                            <td
                              className="table-cell text-xs"
                              align="center"
                              colSpan={20}
                            >
                              {`DNP - ${athlete.reason}`}
                            </td>
                          ) : showAllStats ? (
                            athlete.stats.map((stat: any) => (
                              <td
                                key={uuidv4()}
                                className="table-cell"
                                align="center"
                              >
                                {stat}
                              </td>
                            ))
                          ) : (
                            compactStats.stats.map((statIndex: number) => (
                              <td
                                key={uuidv4()}
                                className="table-cell"
                                align="center"
                              >
                                {athlete.stats[statIndex]}
                              </td>
                            ))
                          )}
                        </tr>
                      ))}
                      <tr>
                        {showAllStats &&
                          statType.totals.map((displayValue: any) => (
                            <td
                              key={uuidv4()}
                              className="table-header"
                              align="center"
                            >
                              {displayValue}
                            </td>
                          ))}
                        {!showAllStats &&
                          compactStats.stats.map((statTotalIndex: any) => (
                            <td
                              key={uuidv4()}
                              className="table-header"
                              align="center"
                            >
                              {statType.totals[statTotalIndex]}
                            </td>
                          ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ),
      )}
    </>
  );

  return (
    <>
      {isDesktopScreen ? (
        <div className="w-full rounded-xl bg-white px-3 py-5">
          {teamBoxScore(0)}
          {teamBoxScore(1)}
        </div>
      ) : (
        <div className="w-full rounded-xl bg-white px-2">
          <div className="my-5 flex w-full justify-around gap-3 rounded-2xl bg-[#edeef09c] p-2 text-center">
            <div
              onClick={() => setSelectedTeam(0)}
              className={`${
                selectedTeam === 0 && "button-active"
              } h-full flex-grow cursor-pointer text-xs font-semibold`}
            >
              {awayTeamName}
            </div>
            <div
              onClick={() => setSelectedTeam(1)}
              className={`${
                selectedTeam === 1 && "button-active"
              } h-full flex-grow cursor-pointer text-xs font-semibold`}
            >
              {homeTeamName}
            </div>
          </div>
          {teamBoxScore(selectedTeam)}
        </div>
      )}
    </>
  );
}
