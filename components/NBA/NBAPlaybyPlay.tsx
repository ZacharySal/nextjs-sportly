import Image from "next/image";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const setTeamImageSrc = (teamName: string) => {
  try {
    const src = require(
      `/public/nba/${teamName.replace(" ", "").toLowerCase()}.png`,
    );
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
    (play: any) => play.period.number === selectedQuarter,
  );

  const getTeamName = (teamId: string) =>
    teamId === homeTeamId ? homeTeamName : awayTeamName;
  return (
    <div className="w-full max-w-full overflow-hidden rounded-xl bg-white p-3">
      <div className="testing sub-selector mb-3 flex h-8 w-full items-center justify-around text-center">
        <div
          onClick={() => setSelectedQuarter(1)}
          className={`${
            selectedQuarter === 1 && "selection-active"
          } nav-selection sub-selection flex-grow font-bold`}
        >
          1st
        </div>
        {(data.gameInfo.status.period >= 2 ||
          data.gameInfo.status.type.state === "post") && (
          <div
            onClick={() => setSelectedQuarter(2)}
            className={`${
              selectedQuarter === 2 && "selection-active"
            } nav-selection sub-selection flex-grow font-bold`}
          >
            2nd
          </div>
        )}

        {(data.gameInfo.status.period >= 3 ||
          data.gameInfo.status.type.state === "post") && (
          <div
            onClick={() => setSelectedQuarter(3)}
            className={`${
              selectedQuarter === 3 && "selection-active"
            } nav-selection sub-selection flex-grow font-bold`}
          >
            3rd
          </div>
        )}
        {(data.gameInfo.status.period >= 4 ||
          data.gameInfo.status.type.state === "post") && (
          <div
            onClick={() => setSelectedQuarter(4)}
            className={`${
              selectedQuarter === 4 && "selection-active"
            } nav-selection sub-selection flex-grow font-bold`}
          >
            4th
          </div>
        )}
      </div>
      <table className="stat-table table max-w-full text-left">
        <thead className="justify-left items-left border-b border-t border-[rgba(0,0,0,0.1)]">
          <tr className="table-header">
            <th className="w-[4rem] px-0 text-left text-xs">TIME</th>
            <th className="text-left text-xs">PLAY</th>
            <th className="text-center text-xs">
              {data.awayTeam.team.abbreviation}
            </th>
            <th className="text-center text-xs">
              {data.homeTeam.team.abbreviation}
            </th>
          </tr>
        </thead>
        <tbody>
          {selectedPlays.map((play: any) => (
            <tr
              key={uuidv4()}
              className="w-full border-b border-t border-[rgba(0,0,0,0.1)]"
            >
              <td className="table-cell pl-1 pr-5 text-left text-xs opacity-80">
                {play.clock.displayValue}
              </td>
              <td
                className="w-full items-center p-2 pl-0 text-left text-xs"
                align="left"
              >
                {typeof play.team !== "undefined" ? (
                  <div className="flex w-full flex-row items-center justify-start gap-3">
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
                      className="max-w-full text-left text-xs"
                    >
                      {play.text}
                    </p>
                  </div>
                ) : (
                  <p className="max-w-full whitespace-break-spaces text-left text-xs opacity-80">
                    {play.text}
                  </p>
                )}
              </td>
              <td
                style={{
                  fontWeight:
                    play.scoringPlay && play.team.id !== homeTeamId
                      ? "700"
                      : "400",
                }}
                className="table-cell p-1 text-center text-xs"
              >
                {play.awayScore}
              </td>
              <td
                style={{
                  fontWeight:
                    play.scoringPlay && play.team.id == homeTeamId
                      ? "700"
                      : "400",
                }}
                className="table-cell p-1 text-center text-xs"
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
