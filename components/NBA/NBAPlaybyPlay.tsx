import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import Image from "next/image";

const setTeamImageSrc = (teamName: string) => {
  try {
    const src = require(`/public/nba/${teamName.replace(" ", "").toLowerCase()}.png`);
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

  const getTeamName = (teamId: string) => (teamId === homeTeamId ? homeTeamName : awayTeamName);
  return (
    <div className="w-full bg-white rounded-xl p-3 max-w-full overflow-hidden">
      <div className="flex w-full justify-around items-center h-8 mb-3 text-center testing sub-selector">
        <div
          onClick={() => setSelectedQuarter(1)}
          className={`${
            selectedQuarter === 1 && "selection-active"
          } nav-selection flex-grow sub-selection font-bold`}
        >
          1st
        </div>
        <div
          onClick={() => setSelectedQuarter(2)}
          className={`${
            selectedQuarter === 2 && "selection-active"
          } nav-selection flex-grow sub-selection font-bold`}
        >
          2nd
        </div>
        <div
          onClick={() => setSelectedQuarter(3)}
          className={`${
            selectedQuarter === 3 && "selection-active"
          } nav-selection flex-grow sub-selection font-bold`}
        >
          3rd
        </div>
        <div
          onClick={() => setSelectedQuarter(4)}
          className={`${
            selectedQuarter === 4 && "selection-active"
          } nav-selection flex-grow sub-selection font-bold`}
        >
          4th
        </div>
      </div>
      <table className="max-w-full text-left table stat-table">
        <thead className="justify-left items-left border-t border-b border-[rgba(0,0,0,0.1)]">
          <tr className="table-header">
            <th className="text-xs text-left px-0 w-[4rem]">TIME</th>
            <th className="text-xs text-left">PLAY</th>
            <th className="text-xs text-center">{data.awayTeam.team.abbreviation}</th>
            <th className="text-xs text-center">{data.homeTeam.team.abbreviation}</th>
          </tr>
        </thead>
        <tbody>
          {selectedPlays.map((play: any) => (
            <tr key={uuidv4()} className="w-full border-t border-b border-[rgba(0,0,0,0.1)]">
              <td className="text-xs text-left pl-1 table-cell opacity-80 pr-5">
                {play.clock.displayValue}
              </td>
              <td className="text-xs text-left p-1 pl-0 w-full" align="left">
                {typeof play.team !== "undefined" ? (
                  <div className="w-full flex flex-row items-center justify-start gap-1">
                    <Image
                      width={100}
                      height={100}
                      alt="team"
                      className="w-6 object-contain"
                      src={setTeamImageSrc(getTeamName(play.team.id))}
                    />

                    <p
                      style={{
                        fontWeight: play.scoringPlay ? "600" : "400",
                        whiteSpace: "normal",
                        color: play.scoringPlay ? "black" : "#6c6d6f",
                        opacity: "0.8",
                      }}
                      className="text-xs text-left max-w-full"
                    >
                      {play.text}
                    </p>
                  </div>
                ) : (
                  <p className="text-xs text-left max-w-full opacity-80 whitespace-break-spaces">
                    {play.text}
                  </p>
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
    </div>
  );
}
