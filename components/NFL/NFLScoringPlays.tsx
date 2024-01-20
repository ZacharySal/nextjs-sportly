import { NFLGameData } from "@/types";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

export default function NFLScoringPlays({ data }: { data: NFLGameData }) {
  function scoringPlays(allScoringPlays: any) {
    const plays = allScoringPlays.map((play: any) => {
      return (
        <div
          key={uuidv4()}
          className="mb-2 flex w-full flex-row items-center justify-between gap-2"
        >
          <div className="flex flex-row items-center gap-2">
            <Image
              src={play.team.logo}
              width={100}
              height={100}
              alt="team logo"
              className="w-6 object-contain md:w-8"
            />
            <div className="flex flex-col">
              <div className="text-sm font-semibold">
                {play.type.text}
                <span className="pl-1 text-xs opacity-70">
                  {play.clock.displayValue}
                </span>
              </div>
              <div className="text-sm opacity-70">{play.text}</div>
            </div>
          </div>
          <div className="flex flex-row gap-6 pr-2">
            <p className="w-4 text-center text-[12px]">{play.homeScore}</p>
            <p className="w-4 text-center text-[12px]">{play.awayScore}</p>
          </div>
        </div>
      );
    });
    return plays;
  }

  function quarterHeader(text: string) {
    return (
      <div className="mb-2 flex w-full flex-row items-center justify-between">
        <p className="text-xs opacity-70">{text}</p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center justify-center rounded-xl bg-white p-3">
      <p className=" mb-2 w-full border-b border-dotted border-[rgba(0,0,0,0.2)] pb-2 text-left text-[14px] font-semibold">
        Scoring Summary
      </p>
      {data.scoringPlays.firstQuarterScoringPlays.length > 0 && (
        <>
          {quarterHeader("1ST QUARTER")}
          {scoringPlays(data.scoringPlays.firstQuarterScoringPlays)}
          <hr className="color-[#edeef0] my-[0.5rem] w-full" />
        </>
      )}
      {data.scoringPlays.secondQuarterScoringPlays.length > 0 && (
        <>
          {quarterHeader("2ND QUARTER")}
          {scoringPlays(data.scoringPlays.secondQuarterScoringPlays)}
          <hr className="color-[#edeef0] my-[0.5rem] w-full" />
        </>
      )}
      {data.scoringPlays.thirdQuarterScoringPlays.length > 0 && (
        <>
          {quarterHeader("3RD QUARTER")}
          {scoringPlays(data.scoringPlays.thirdQuarterScoringPlays)}
          <hr className="color-[#edeef0] my-[0.5rem] w-full" />
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
