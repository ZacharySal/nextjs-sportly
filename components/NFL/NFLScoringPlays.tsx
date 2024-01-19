import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

export default function NFLScoringPlays({ data }: { data: any }) {
  function scoringPlays(allScoringPlays: any) {
    const plays = allScoringPlays.map((play: any) => {
      return (
        <div
          key={uuidv4()}
          className="w-full flex flex-row justify-between gap-2 items-center mb-2"
        >
          <div className="flex flex-row items-center gap-2">
            <Image
              src={play.team.logo}
              width={100}
              height={100}
              alt="team logo"
              className="w-6 md:w-8 object-contain"
            />
            <div className="flex flex-col">
              <div className="text-sm font-semibold">
                {play.type.text}
                <span className="pl-1 text-xs opacity-70">{play.clock.displayValue}</span>
              </div>
              <div className="text-sm opacity-70">{play.text}</div>
            </div>
          </div>
          <div className="flex flex-row gap-6 pr-2">
            <p className="w-4 text-[12px] text-center">{play.homeScore}</p>
            <p className="w-4 text-[12px] text-center">{play.awayScore}</p>
          </div>
        </div>
      );
    });
    return plays;
  }

  function quarterHeader(text: string) {
    return (
      <div className="w-full flex flex-row justify-between items-center mb-2">
        <p className="opacity-70 text-xs">{text}</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-xl flex flex-col justify-center items-center p-3">
      <p className=" w-full text-left text-[14px] pb-2 mb-2 border-b border-[rgba(0,0,0,0.2)] border-dotted font-semibold">
        Scoring Summary
      </p>
      {data.scoringPlays.firstQuarterScoringPlays.length > 0 && (
        <>
          {quarterHeader("1ST QUARTER")}
          {scoringPlays(data.scoringPlays.firstQuarterScoringPlays)}
          <hr className="w-full color-[#edeef0] my-[0.5rem]" />
        </>
      )}
      {data.scoringPlays.secondQuarterScoringPlays.length > 0 && (
        <>
          {quarterHeader("2ND QUARTER")}
          {scoringPlays(data.scoringPlays.secondQuarterScoringPlays)}
          <hr className="w-full color-[#edeef0] my-[0.5rem]" />
        </>
      )}
      {data.scoringPlays.thirdQuarterScoringPlays.length > 0 && (
        <>
          {quarterHeader("3RD QUARTER")}
          {scoringPlays(data.scoringPlays.thirdQuarterScoringPlays)}
          <hr className="w-full color-[#edeef0] my-[0.5rem]" />
        </>
      )}
      {data.scoringPlays.fourthQuarterScoringPlays.length > 0 && (
        <>
          {quarterHeader("4TH QUARTER")}
          {scoringPlays(data.scoringPlays.fourthQuarterScoringPlays)}
        </>
      )}
    </div>
  );
}
