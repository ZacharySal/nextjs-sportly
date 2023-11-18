import { Box, Typography } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import Image from "next/image";

const setTeamImageSrc = (teamName: string) => {
  try {
    const src = require(`public/nba/${teamName.replace(" ", "").toLowerCase()}.png`);
    return src;
  } catch {
    return `/default.png`;
  }
};

export default function NBAPlaybyPlay({ data }: { data: any }) {
  console.log(data);
  const [selectedQuarter, setSelectedQuarter] = useState(1);
  const homeTeamName = data.homeTeam.team.name;
  const homeTeamId = data.homeTeam.team.id;
  const awayTeamName = data.awayTeam.team.name;

  const selectedPlays = data.gameData.plays.filter(
    (play: any) => play.period.number === selectedQuarter
  );

  const getTeamName = (teamId: string) => (teamId === homeTeamId ? homeTeamName : awayTeamName);
  return (
    <Box className="w-full bg-white rounded-xl p-3 max-w-full overflow-hidden">
      <Box className="flex w-full justify-around items-center h-8 mb-3 text-center testing sub-selector">
        <Box
          onClick={() => setSelectedQuarter(1)}
          className={`${
            selectedQuarter === 1 && "selection-active"
          } nav-selection flex-grow sub-selection font-bold`}
        >
          1st
        </Box>
        <Box
          onClick={() => setSelectedQuarter(2)}
          className={`${
            selectedQuarter === 2 && "selection-active"
          } nav-selection flex-grow sub-selection font-bold`}
        >
          2nd
        </Box>
        <Box
          onClick={() => setSelectedQuarter(3)}
          className={`${
            selectedQuarter === 3 && "selection-active"
          } nav-selection flex-grow sub-selection font-bold`}
        >
          3rd
        </Box>
        <Box
          onClick={() => setSelectedQuarter(4)}
          className={`${
            selectedQuarter === 4 && "selection-active"
          } nav-selection flex-grow sub-selection font-bold`}
        >
          4th
        </Box>
      </Box>
      <table className="w-full text-left table stat-table">
        <thead className="justify-left items-left border-t border-b border-[rgba(0,0,0,0.1)]">
          <tr className="table-header">
            <th className="text-xs text-left px-0 w-[4rem]">TIME</th>
            <th className="text-xs text-left w-[10rem]" colSpan={2}>
              PLAY
            </th>
            <th className="text-xs text-center">{data.awayTeam.team.abbreviation}</th>
            <th className="text-xs text-center">{data.homeTeam.team.abbreviation}</th>
          </tr>
        </thead>
        <tbody>
          {selectedPlays.map((play: any) => (
            <tr key={uuidv4()} className="border-t border-b border-[rgba(0,0,0,0.1)]">
              <td className="text-xs text-left pl-1 table-cell">{play.clock.displayValue}</td>
              <td className="text-xs text-left p-2 pl-0" align="left" colSpan={2}>
                {typeof play.team !== "undefined" ? (
                  <Box className="w-full flex flex-row items-center justify-start gap-1">
                    <Image
                      width={100}
                      height={100}
                      alt="team"
                      className="w-6 object-contain"
                      src={setTeamImageSrc(getTeamName(play.team.id))}
                    />

                    <Typography
                      sx={{
                        fontWeight: play.scoringPlay ? "600" : "400",
                        whiteSpace: "normal",
                        color: play.scoringPlay ? "black" : "#6c6d6f",
                      }}
                      className="text-xs text-left w-full"
                    >
                      {play.text}
                    </Typography>
                  </Box>
                ) : (
                  <Typography className="text-xs text-left w-full">{play.text}</Typography>
                )}
              </td>
              <td
                style={{
                  fontWeight: play.scoringPlay && play.team.id !== homeTeamId ? "700" : "400",
                }}
                className="text-xs table-cell text-center p-1"
              >
                {play.awayScore}
              </td>
              <td
                style={{
                  fontWeight: play.scoringPlay && play.team.id == homeTeamId ? "700" : "400",
                }}
                className="text-xs table-cell text-center p-1"
              >
                {play.homeScore}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
}
