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
              <td className="w-[80%]  p-1 text-xs" colSpan={2} align="left">
                <div className="flex flex-row justify-start gap-2">
                  <Image
                    src={play.team.logo}
                    width={100}
                    height={100}
                    alt="team logo"
                    className="w-6 object-contain"
                  />
                  <div className="wrap flex flex-col flex-wrap items-start justify-start gap-0">
                    <p className="text-[12px]">
                      {play.type.abbreviation} {play.clock.displayValue}
                    </p>
                    <p className="max-w-full break-normal text-[11px]">
                      {play.text}
                    </p>
                  </div>
                </div>
              </td>
              <td className="table-cell w-6 text-xs" align="right">
                {play.awayScore}
              </td>
              <td className="table-cell w-6 text-xs" align="right">
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
    <div className="flex w-full flex-col items-center justify-center rounded-xl bg-white p-3">
      <p className=" mb-2 w-full text-left text-sm font-semibold opacity-80">
        Scoring Summary
      </p>
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
