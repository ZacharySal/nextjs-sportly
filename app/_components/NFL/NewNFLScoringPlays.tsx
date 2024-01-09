import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

export default function NFLScoringPlays({ data }: { data: any }) {
  function scoringPlays(allScoringPlays: any, quarter: string) {
    return (
      <table className="misc-table table min-w-full">
        <thead className="table-header">
          <tr className="table-header">
            <th align="left" className="table-header pl-2" colSpan={2}>
              {quarter}
            </th>
            <th className="w-6" align="right">
              {data.awayTeam.team.abbreviation}
            </th>
            <th className="w-6 pr-2" align="right">
              {data.homeTeam.team.abbreviation}
            </th>
          </tr>
        </thead>
        <tbody>
          {allScoringPlays.map((play: any) => (
            <tr key={uuidv4()} className="w-full">
              <td className="text-xs  w-[80%] p-1" colSpan={2} align="left">
                <div className="flex flex-row gap-2 justify-start">
                  <Image
                    src={play.team.logo}
                    width={100}
                    height={100}
                    alt="team logo"
                    className="w-6 object-contain"
                  />
                  <div className="flex flex-col justify-start wrap items-start gap-0 flex-wrap">
                    <p className="text-[12px]">
                      {play.type.abbreviation} {play.clock.displayValue}
                    </p>
                    <p className="text-[11px] max-w-full break-normal">{play.text}</p>
                  </div>
                </div>
              </td>
              <td className="text-xs table-cell w-6" align="right">
                {play.awayScore}
              </td>
              <td className="text-xs table-cell w-6" align="right">
                {play.homeScore}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  function quarterHeader(text: string) {
    //   <div className="w-full flex flex-row justify-between items-center mb-2">
    //     <p className="opacity-70 text-xs">{text}</p>
    //   </div>
  }

  return (
    <div className="w-full bg-white rounded-xl flex flex-col justify-center items-center p-3">
      <p className=" w-full text-left text-sm opacity-80 font-semibold mb-2">Scoring Summary</p>
      {data.firstQuarterScoringPlays.length > 0 &&
        scoringPlays(data.firstQuarterScoringPlays, "1st Quarter")}
      {data.secondQuarterScoringPlays.length > 0 &&
        scoringPlays(data.secondQuarterScoringPlays, "2nd Quarter")}
      {data.thirdQuarterScoringPlays.length > 0 &&
        scoringPlays(data.thirdQuarterScoringPlays, "3rd Quarter")}
      {data.fourthQuarterScoringPlays.length > 0 &&
        scoringPlays(data.fourthQuarterScoringPlays, "4th Quarter")}
    </div>
  );
}
