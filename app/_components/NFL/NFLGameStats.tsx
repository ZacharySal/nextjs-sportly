import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function NFLGameStats({ data, league }: { data: any; league: string }) {
  const [selectedTeam, setSelectedTeam] = useState(1);
  const awayTeamName = data.gameData.boxscore.teams[0].team.shortDisplayName;
  const homeTeamName = data.gameData.boxscore.teams[1].team.shortDisplayName;

  const tableHeader = (statType: any, teamOption: number) => {
    if (league == "nfl") {
      return statType.text;
    } else if (league === "mlb") {
      return teamOption === 0 ? awayTeamName + " " + statType.type : homeTeamName + " " + statType.type;
    } else if (league === "nba") {
      return teamOption === 0 ? awayTeamName + " " + "Statistics" : homeTeamName + " " + "Statistics";
    }
  };

  console.log(data.gameData.boxscore);

  const teamBoxScore = (teamOption: number) => (
    <>
      {data.gameData.boxscore.players[teamOption].statistics.map((statType: any) => (
        <Box key={uuidv4()} className="bg-white rounded-xl p-2 w-full mb-3">
          <Box className="flex items-center justify-start gap-1 mb-2">
            <img
              className="w-7 object-contain"
              src={`/${league}/${data.gameData.boxscore.teams[teamOption].team.shortDisplayName
                .replaceAll(" ", "")
                .toLowerCase()}.png`}
            ></img>
            <Typography className="text-sm font-bold opacity-70 capitalize">
              {tableHeader(statType, teamOption)}
            </Typography>
          </Box>
          <Box className="max-w-full w-full overflow-x-scroll">
            {/* JacksonVille Passing */}
            <table className="stat-table rounded-xl bg-white">
              <thead>
                <tr>
                  <th className=" text-xs font-semibold" align="left">
                    Name
                  </th>
                  {statType.labels.map((label: string) => (
                    <th key={uuidv4()} className=" text-xs font-semibold" align="center">
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {statType.athletes.map((athlete: any) => (
                  <tr key={uuidv4()}>
                    <td className="text-xs pl-1" align="left">
                      {athlete.athlete.displayName || ""}
                    </td>
                    {athlete.stats.map((stat: any) => (
                      <td key={uuidv4()} className="text-xs" align="center">
                        {stat}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td className="text-xs pl-1 font-semibold" align="left">
                    TEAM
                  </td>
                  {statType.totals.map((displayValue: any) => (
                    <td key={uuidv4()} className="text-xs font-semibold" align="center">
                      {displayValue}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
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
          className={`${selectedTeam === 0 && "button-active"} flex-grow h-full text-xs font-semibold`}
        >
          {awayTeamName}
        </Box>
        <Box
          onClick={() => setSelectedTeam(1)}
          className={`${selectedTeam === 1 && "button-active"} flex-grow h-full text-xs font-semibold`}
        >
          {homeTeamName}
        </Box>
      </Box>
      {teamBoxScore(selectedTeam)}
    </Box>
  );
}
