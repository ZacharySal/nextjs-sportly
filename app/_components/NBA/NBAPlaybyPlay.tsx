import { Box, Typography } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import Image from "next/image";

const setTeamImageSrc = (teamName: string) => {
  try {
    const src = require(`public/nba/${teamName
      .replace(" ", "")
      .toLowerCase()}.png`);
    return src;
  } catch {
    return `/default.png`;
  }
};

export default function NBAPlaybyPlay({ data }: { data: any }) {
  const [selectedQuarter, setSelectedQuarter] = useState(1);
  const homeTeamName = data.homeTeam.team.name;
  const homeTeamId = data.homeTeam.team.id;
  const awayTeamName = data.awayTeam.team.name;

  const selectedPlays = data.gameData.plays.filter(
    (play: any) => play.period.number === selectedQuarter
  );

  const getTeamName = (teamId: string) =>
    teamId === homeTeamId ? homeTeamName : awayTeamName;
  return (
    <Box className="w-full bg-white rounded-xl p-3">
      <Box className="flex w-full justify-around items-center h-8 my-3 text-center testing sub-selector">
        <Box
          onClick={() => setSelectedQuarter(1)}
          className={`${
            selectedQuarter === 1 && "selection-active"
          } nav-selection flex-grow sub-selection`}
        >
          1st Quarter
        </Box>
        <Box
          onClick={() => setSelectedQuarter(2)}
          className={`${
            selectedQuarter === 2 && "selection-active"
          } nav-selection flex-grow sub-selection`}
        >
          2nd Quarter
        </Box>
        <Box
          onClick={() => setSelectedQuarter(3)}
          className={`${
            selectedQuarter === 3 && "selection-active"
          } nav-selection flex-grow sub-selection`}
        >
          3rd Quarter
        </Box>
        <Box
          onClick={() => setSelectedQuarter(4)}
          className={`${
            selectedQuarter === 4 && "selection-active"
          } nav-selection flex-grow sub-selection`}
        >
          4th Quarter
        </Box>
      </Box>
      <table className="w-full text-left playbyplay-table">
        <thead className="justify-left items-left border-t border-b border-[rgba(0,0,0,0.1)]">
          <tr>
            {" "}
            <th className="text-xs text-left px-0 opacity-70">TIME</th>
            <th className="text-xs text-left pl-4 opacity-70" colSpan={2}>
              PLAY
            </th>
            <th className="text-xs text-center px-2 opacity-70">
              {data.awayTeam.team.abbreviation}
            </th>
            <th className="text-xs text-center opacity-70">
              {data.homeTeam.team.abbreviation}
            </th>
          </tr>
        </thead>
        <tbody>
          {selectedPlays.map((play: any) => (
            <tr
              key={uuidv4()}
              className="border-t border-b border-[rgba(0,0,0,0.1)]"
            >
              <td className="text-xs text-left opacity-60 pl-1">
                {play.clock.displayValue}
              </td>

              <td className="text-xs text-left p-2 pl-4" colSpan={2}>
                {typeof play.team !== "undefined" ? (
                  <Box className="flex flex-row items-center justify-start gap-1">
                    <Image
                      width={100}
                      height={100}
                      alt="team"
                      className="w-6 object-contain"
                      src={setTeamImageSrc(getTeamName(play.team.id))}
                    />

                    <Typography
                      sx={{ fontWeight: play.scoringPlay ? "600" : "400" }}
                      className="text-xs text-left opacity-70"
                    >
                      {play.text}
                    </Typography>
                  </Box>
                ) : (
                  <Typography className="text-xs text-left opacity-70">
                    {play.text}
                  </Typography>
                )}
              </td>
              <td className="text-xs text-center">{play.awayScore}</td>
              <td className="text-xs text-center">{play.homeScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
}
