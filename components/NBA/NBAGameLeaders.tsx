import { useState } from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";

export default function NBAGameLeaders({ data }: { data: any }) {
  const [selectedStat, setSelectedStat] = useState("points");

  const homePointsLeader = data?.gameData?.leaders?.[0]?.leaders?.[0]?.leaders?.[0];
  const homeAssistsLeader = data?.gameData?.leaders?.[0]?.leaders?.[1]?.leaders?.[0];
  const homeReboundsLeader = data?.gameData?.leaders?.[0]?.leaders?.[2]?.leaders?.[0];
  const awayPointsLeader = data?.gameData?.leaders?.[1]?.leaders?.[0]?.leaders?.[0];
  const awayAssistsLeader = data?.gameData?.leaders?.[1]?.leaders?.[1]?.leaders?.[0];
  const awayReboundsLeader = data?.gameData?.leaders?.[1]?.leaders?.[2]?.leaders?.[0];

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
    <div className="w-full bg-white rounded-xl p-3 pb-1">
      <p className="font-semibold text-[14px] pb-2 border-b border-b-[rgba(0,0,0,0.2)] border-dotted">
        {data.isGameStarted ? "Game Leaders" : "Season Leaders"}
      </p>
      <div className="flex w-full justify-around items-center rounded-2xl h-8 mt-2 bg-white text-center testing sub-selector">
        <div
          onClick={() => setSelectedStat("points")}
          className={`${
            selectedStat === "points" && "selection-active"
          } nav-selection flex-grow sub-selection`}
        >
          Points
        </div>
        <div
          onClick={() => setSelectedStat("assists")}
          className={`${
            selectedStat === "assists" && "selection-active"
          } nav-selection flex-grow sub-selection`}
        >
          Assists
        </div>
        <div
          onClick={() => setSelectedStat("rebounds")}
          className={`${
            selectedStat === "rebounds" && "selection-active"
          } nav-selection flex-grow sub-selection`}
        >
          Rebounds
        </div>
      </div>
      <hr />
      <div className="w-full flex flex-col py-3 px-0 gap-3 items-center">
        {getLeaderCategory().map((leader: any, i: number) => {
          if (typeof leader?.athlete === "undefined") return null;
          return (
            <div
              key={uuidv4()}
              className="flex flex-row gap-2 pb-3 w-full items-center border-b border-[rgba(0,0,0,0.2)] border-dotted"
            >
              <Image
                width={100}
                height={100}
                src={leader?.athlete.headshot.href}
                priority={true}
                alt={"player picture"}
                className="w-10 h-10 md:w-[40px] md:h-[40px] border rounded-full object-cover"
              />
              <div className="flex flex-col px-1 w-full justify-start gap-1">
                <p className="text-[11px]">
                  {`${leader?.athlete.fullName},`}
                  <span className="opacity-60">{` ${leader?.athlete.position.abbreviation} - ${
                    i === 0 ? data.awayTeam.team.abbreviation : data.homeTeam.team.abbreviation
                  }`}</span>
                </p>
                <div className="flex flex-row w-full justify-between pr-3">
                  {leader?.statistics?.map((stat: any, i: number) => (
                    <div key={uuidv4()} className="flex flex-col text-center">
                      <p className="text-sm font-semibold opacity-80">{stat.displayValue}</p>
                      <p className="text-xs opacity-60 mt-[-3px]">{stat.shortDisplayName}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
        <Link
          href={data.isGameStarted ? "boxscore" : ""}
          className="text-center w-full h-full text-xs text-[#06c] py-1 cursor-pointer font-semibold anchor-link"
        >
          Full Box Score
        </Link>
      </div>
    </div>
  );
}
