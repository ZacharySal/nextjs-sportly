import { Box, FormControlLabel, Switch, Typography } from "@mui/material";
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
  const [showAllStats, setShowAllStats] = useState(isDesktopScreen ? true : false);
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
      {data.gameData.boxscore.players[teamOption].statistics.map((statType: any) => (
        <Box key={uuidv4()} className="bg-white rounded-xl w-full h-auto mb-3">
          <Box className="flex items-center justify-start gap-1 mb-2">
            <Image
              width={data.gameInfo.competitors[teamOption === 0 ? 1 : 0].team.logos[0].width}
              height={data.gameInfo.competitors[teamOption === 0 ? 1 : 0].team.logos[0].height}
              alt="team"
              className="w-7 object-contain"
              src={data.gameInfo.competitors[teamOption === 0 ? 1 : 0].team.logos[0].href}
            />
            <Box className="w-full flex flex-row items-center justify-between">
              <Typography className="text-[16px] font-[600] tracking-wide opacity-80 capitalize">
                {tableHeader(statType, teamOption)}
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={showAllStats}
                    onClick={() => setShowAllStats((show) => !show)}
                    size="small"
                  />
                }
                label={
                  <Typography className="text-xs font-[500] opacity-70 uppercase">
                    All stats
                  </Typography>
                }
              />
            </Box>
          </Box>
          <Box className="w-full">
            <Box className="min-w-full flex flex-row items-start">
              <table className="border-collapse">
                <thead className="table-fixed-left-thead table-header">
                  <tr>
                    <th className="uppercase" align="left">
                      Name
                    </th>
                  </tr>
                  {statType.athletes.map((athlete: any) => (
                    <tr key={uuidv4()} className="">
                      <td className="athlete-name" align="left">
                        {athlete.athlete.displayName}{" "}
                        <span className="text-[9px] text-[#6c6d6f] mb-5">
                          {athlete.athlete.position.abbreviation}
                        </span>
                      </td>
                    </tr>
                  ))}
                  <tr className="">
                    <td className="name-col text-xs pl-1 font-semibold" align="left">
                      TEAM
                    </td>
                  </tr>
                </thead>
              </table>
              <Box className="w-full overflow-x-auto">
                <table className="table stat-table">
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
                          <th key={uuidv4()} className="uppercase" align="center">
                            {label}
                          </th>
                        ))}
                    </tr>
                  </thead>
                  <tbody>
                    {statType.athletes.map((athlete: any) => (
                      <tr key={uuidv4()}>
                        {athlete.stats.length === 0 ? (
                          <td className="text-xs table-cell" align="left" colSpan={20}>
                            {`DNP - ${athlete.reason}`}
                          </td>
                        ) : showAllStats ? (
                          athlete.stats.map((stat: any) => (
                            <td key={uuidv4()} className="table-cell" align="center">
                              {stat}
                            </td>
                          ))
                        ) : (
                          compactStats.stats.map((statIndex: number) => (
                            <td key={uuidv4()} className="table-cell" align="center">
                              {athlete.stats[statIndex]}
                            </td>
                          ))
                        )}
                      </tr>
                    ))}
                    <tr>
                      {showAllStats &&
                        statType.totals.map((displayValue: any) => (
                          <td key={uuidv4()} className="table-header" align="center">
                            {displayValue}
                          </td>
                        ))}
                      {!showAllStats &&
                        compactStats.stats.map((statTotalIndex: any) => (
                          <td key={uuidv4()} className="table-header" align="center">
                            {statType.totals[statTotalIndex]}
                          </td>
                        ))}
                    </tr>
                  </tbody>
                </table>
              </Box>
            </Box>
          </Box>
        </Box>
      ))}
    </>
  );

  return (
    <Box className="bg-white rounded-xl w-full px-2">
      <Box className="flex w-full justify-around gap-3 my-5 rounded-2xl p-2 bg-[#edeef09c] text-center">
        <Box
          onClick={() => setSelectedTeam(0)}
          className={`${
            selectedTeam === 0 && "button-active"
          } flex-grow h-full text-xs cursor-pointer font-semibold`}
        >
          {awayTeamName}
        </Box>
        <Box
          onClick={() => setSelectedTeam(1)}
          className={`${
            selectedTeam === 1 && "button-active"
          } flex-grow h-full text-xs cursor-pointer font-semibold`}
        >
          {homeTeamName}
        </Box>
      </Box>
      {teamBoxScore(selectedTeam)}
    </Box>
  );
}
