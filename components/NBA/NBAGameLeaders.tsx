import { useState } from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";

export default function NBAGameLeaders({ data }: { data: any }) {
  const [selectedStat, setSelectedStat] = useState("points");

  const homePointsLeader =
    data?.gameData?.leaders?.[0]?.leaders?.[0]?.leaders?.[0];
  const homeAssistsLeader =
    data?.gameData?.leaders?.[0]?.leaders?.[1]?.leaders?.[0];
  const homeReboundsLeader =
    data?.gameData?.leaders?.[0]?.leaders?.[2]?.leaders?.[0];
  const awayPointsLeader =
    data?.gameData?.leaders?.[1]?.leaders?.[0]?.leaders?.[0];
  const awayAssistsLeader =
    data?.gameData?.leaders?.[1]?.leaders?.[1]?.leaders?.[0];
  const awayReboundsLeader =
    data?.gameData?.leaders?.[1]?.leaders?.[2]?.leaders?.[0];

  const pointsLeaders = [awayPointsLeader, homePointsLeader];
  const assistsLeaders = [awayAssistsLeader, homeAssistsLeader];
  const reboundsLeaders = [awayReboundsLeader, homeReboundsLeader];

  const getLeaderCategory = () => {
    if (selectedStat === "points") {
      return pointsLeaders;
    } else if (selectedStat === "assists") {
      return assistsLeaders;
    } else {
      return reboundsLeaders;
    }
  };

  if (data.gameData.leaders[0].leaders.length === 0) return null;
  return (
    <div className="w-full rounded-xl bg-white p-3 pb-1">
      <p className="border-b border-dotted border-b-[rgba(0,0,0,0.2)] pb-2 text-[14px] font-semibold">
        {data.isGameStarted ? "Game Leaders" : "Season Leaders"}
      </p>
      <div className="testing sub-selector mt-2 flex h-8 w-full items-center justify-around rounded-2xl bg-white text-center">
        <div
          onClick={() => setSelectedStat("points")}
          className={`${
            selectedStat === "points" && "selection-active"
          } nav-selection sub-selection flex-grow`}
        >
          Points
        </div>
        <div
          onClick={() => setSelectedStat("assists")}
          className={`${
            selectedStat === "assists" && "selection-active"
          } nav-selection sub-selection flex-grow`}
        >
          Assists
        </div>
        <div
          onClick={() => setSelectedStat("rebounds")}
          className={`${
            selectedStat === "rebounds" && "selection-active"
          } nav-selection sub-selection flex-grow`}
        >
          Rebounds
        </div>
      </div>
      <hr />
      <div className="flex w-full flex-col items-center gap-3 px-0 py-3">
        {getLeaderCategory().map((leader: any, i: number) => {
          if (typeof leader?.athlete === "undefined") return null;
          return (
            <div
              key={uuidv4()}
              className="flex w-full flex-row items-center gap-2 border-b border-dotted border-[rgba(0,0,0,0.2)] pb-3"
            >
              <Image
                width={100}
                height={100}
                src={leader?.athlete.headshot.href}
                priority={true}
                alt={"player picture"}
                className="h-10 w-10 rounded-full border object-cover md:h-[40px] md:w-[40px]"
              />
              <div className="flex w-full flex-col justify-start gap-1 px-1">
                <p className="text-[11px]">
                  {`${leader?.athlete.fullName},`}
                  <span className="opacity-60">{` ${leader?.athlete.position.abbreviation} - ${
                    i === 0
                      ? data.awayTeam.team.abbreviation
                      : data.homeTeam.team.abbreviation
                  }`}</span>
                </p>
                <div className="flex w-full flex-row justify-between pr-3">
                  {leader?.statistics?.map((stat: any, i: number) => (
                    <div key={uuidv4()} className="flex flex-col text-center">
                      <p className="text-sm font-semibold opacity-80">
                        {stat.displayValue}
                      </p>
                      <p className="mt-[-3px] text-xs opacity-60">
                        {stat.shortDisplayName}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
        <Link
          href={data.isGameStarted ? "boxscore" : ""}
          className="anchor-link h-full w-full cursor-pointer py-1 text-center text-xs font-semibold text-[#06c]"
        >
          Full Box Score
        </Link>
      </div>
    </div>
  );
}
