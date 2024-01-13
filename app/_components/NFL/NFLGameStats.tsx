import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";

export default function NFLGameStats({ data, league }: { data: any; league: string }) {
  const [selectedTeam, setSelectedTeam] = useState(1);
  console.log(data);
  const awayTeamName = data.gameData.boxscore.teams[0].team.shortDisplayName;
  const homeTeamName = data.gameData.boxscore.teams[1].team.shortDisplayName;

  const tableHeader = (statType: any, teamOption: number) => {
    if (league == "nfl") {
      return statType.text;
    } else if (league === "mlb") {
      return teamOption === 0
        ? awayTeamName + " " + statType.type
        : homeTeamName + " " + statType.type;
    } else if (league === "nba") {
      return teamOption === 0
        ? awayTeamName + " " + "Statistics"
        : homeTeamName + " " + "Statistics";
    }
  };

  const teamBoxScore = (teamOption: number) => (
    <>
      {data?.gameData?.boxscore?.players?.[teamOption].statistics.map((statType: any) => (
        <div key={uuidv4()} className="bg-white rounded-xl w-full h-auto mb-3">
          <div className="flex items-center justify-start gap-2 mb-2">
            <Image
              width={data.gameInfo.competitors[teamOption === 0 ? 1 : 0].team.logos[0].width}
              height={data.gameInfo.competitors[teamOption === 0 ? 1 : 0].team.logos[0].height}
              alt="team"
              className="w-6 object-contain"
              src={data.gameInfo.competitors[teamOption === 0 ? 1 : 0].team.logos[0].href}
            />
            <div className="w-full flex flex-row items-center justify-between">
              <p className="text-[13px] font-[600] tracking-wide opacity-80 capitalize">
                {tableHeader(statType, teamOption)}
              </p>
            </div>
          </div>
          <div className="w-full">
            <div className="min-w-full flex flex-row items-start">
              <table className="border-collapse">
                <thead className="table-fixed-left-thead table-header">
                  <tr>
                    <th className="uppercase pl-2" align="left">
                      Name
                    </th>
                  </tr>
                  {statType.athletes.map((athlete: any) => (
                    <tr key={uuidv4()} className="">
                      <td className="athlete-name pl-2" align="left">
                        {athlete.athlete.displayName[0] + ". " + athlete.athlete.lastName}{" "}
                        <span className="text-[9px] text-[#6c6d6f] mb-5"></span>
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
              <div className="w-full overflow-x-auto">
                <table className="table stat-table">
                  <thead>
                    <tr className="table-header">
                      {statType.labels.map((label: string) => (
                        <th key={uuidv4()} className="" align="center">
                          {label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {statType.athletes.map((athlete: any) => (
                      <tr key={uuidv4()}>
                        {athlete.stats.map((stat: any) => (
                          <td key={uuidv4()} className="table-cell" align="center">
                            {stat}
                          </td>
                        ))}
                      </tr>
                    ))}
                    <tr>
                      {statType.totals.map((displayValue: any) => (
                        <td key={uuidv4()} className="table-header" align="center">
                          {displayValue}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );

  return (
    <div className="bg-white rounded-xl w-full px-2">
      <div className="flex w-full justify-around gap-3 my-5 rounded-2xl p-2 bg-[#edeef09c] text-center">
        <div
          onClick={() => setSelectedTeam(0)}
          className={`${
            selectedTeam === 0 && "button-active"
          } flex-grow h-full text-xs cursor-pointer font-semibold`}
        >
          {awayTeamName}
        </div>
        <div
          onClick={() => setSelectedTeam(1)}
          className={`${
            selectedTeam === 1 && "button-active"
          } flex-grow h-full text-xs cursor-pointer font-semibold`}
        >
          {homeTeamName}
        </div>
      </div>
      {teamBoxScore(selectedTeam)}
    </div>
  );
}
