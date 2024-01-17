"use client";

import Image from "next/image";
import { useState } from "react";
import { v4 } from "uuid";
import usePreferredColor from "../hooks/usePreferredColor";
import { getFilteredTeamShots } from "@/lib/utils";

type FilterOptions = {
  selectedQuarter: string;
  showMissedShots: boolean;
  showMadeShots: boolean;
  selectedPlayer: string;
};

const initialFilterOptions: FilterOptions = {
  selectedQuarter: "All Quarters",
  showMissedShots: true,
  showMadeShots: true,
  selectedPlayer: "All Players",
};

export default function ShotChart({ data }: { data: any }) {
  const [showFilters, setShowFilters] = useState(false);
  const [homeTeamFilterOptions, setHomeTeamFilterOptions] = useState(initialFilterOptions);
  const [awayTeamFilterOptions, setAwayTeamFilterOptions] = useState(initialFilterOptions);

  const { homeTeamColor, awayTeamColor } = usePreferredColor(data);

  const homeTeamShots = getFilteredTeamShots(
    data.gameData.plays,
    homeTeamFilterOptions,
    data.homeTeam.team.id
  );
  const awayTeamShots = getFilteredTeamShots(
    data.gameData.plays,
    awayTeamFilterOptions,
    data.awayTeam.team.id
  );

  return (
    <div className="flex flex-col p-3 min-w-full rounded-md bg-white relative">
      <h2 className="text-[14px] font-semibold border-b border-[rgba(0,0,0,0.2]) border-dotted pb-2 mb-2">
        Shot Chart
      </h2>

      <div className="relative w-full h-full flex justify-center items-center">
        <img src="/svgs/court.svg" className="max-w-full max-h-full object-contain relative" />
        <Image
          src={data.homeTeam.team.logos[0].href}
          alt=""
          width={data.homeTeam.team.logos[0].width}
          height={data.homeTeam.team.logos[0].height}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/6"
        />
        <div className="w-full h-full absolute left-0 top-0 border-black">
          <div className="absolute w-1/2 translate-x-full h-full rotate-[90deg]">
            {homeTeamShots.map((play: any) => (
              <div key={v4()}>
                {play.scoringPlay ? (
                  <>
                    <div
                      style={{
                        left: `calc(${play.coordinate.x * 2.05}% - 10px)`,
                        top: `calc(${play.coordinate.y * 2}% + 30px)`,
                        backgroundColor: "#" + homeTeamColor,
                      }}
                      className="md:w-[15px] w-[14px] h-[14px] md:h-[15px] rounded-full rotate-90 border-2 left-0 border-white absolute"
                    ></div>
                  </>
                ) : (
                  <div
                    style={{
                      left: `calc(${play.coordinate.x * 2.05}% - 10px)`,
                      top: `calc(${play.coordinate.y * 2}% + 30px)`,
                      backgroundColor: "white",
                      border: `3px solid #${homeTeamColor}`,
                      boxShadow: "0px 0px 0px 2px white",
                    }}
                    className="md:w-[12px] w-[11px] h-[11px] md:h-[12px] rounded-full rotate-90 left-0 absolute"
                  ></div>
                )}
              </div>
            ))}
          </div>
          <div className="absolute w-1/2 h-full border-red-400 rotate-[270deg]">
            {awayTeamShots.map((play: any) => (
              <div key={v4()}>
                {play.scoringPlay ? (
                  <>
                    <div
                      style={{
                        left: `calc(${play.coordinate.x * 2.05}% - 10px)`,
                        top: `calc(${play.coordinate.y * 2}% + 22px)`,
                        backgroundColor: "#" + awayTeamColor,
                      }}
                      className="md:w-[15px] w-[14px] h-[14px] md:h-[15px] rounded-full rotate-90 border-2 left-0 border-white absolute"
                    ></div>
                  </>
                ) : (
                  <div
                    style={{
                      left: `calc(${play.coordinate.x * 2.05}% - 10px)`,
                      top: `calc(${play.coordinate.y * 2}% + 22px)`,
                      backgroundColor: "white",
                      border: `3px solid #${awayTeamColor}`,
                      boxShadow: "0px 0px 0px 2px white",
                    }}
                    className="md:w-[12px] w-[11px] h-[11px] md:h-[12px] rounded-full rotate-90 left-0 absolute"
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full my-2 mt-5">
        {showFilters && (
          <div className="w-full flex flex-col mb-5">
            <select
              className="bg-gray-100 p-2 rounded-md px-2 text-sm uppercase mb-1"
              value={homeTeamFilterOptions.selectedQuarter}
              onChange={(e) => (
                setAwayTeamFilterOptions((curr) => ({ ...curr, selectedQuarter: e.target.value })),
                setHomeTeamFilterOptions((curr) => ({ ...curr, selectedQuarter: e.target.value }))
              )}
            >
              {["All Quarters", "1st Quarter", "2nd Quarter", "3rd Quarter", "4th Quarter"].map(
                (text: string) => (
                  <option key={v4()} id={`${text}`} value={`${text}`}>
                    {`${text}`}
                  </option>
                )
              )}
            </select>

            <div className="flex gap-1 items-center mt-3 mb-2">
              <Image
                src={data.awayTeam.team.logos[0].href}
                alt=""
                width={data.awayTeam.team.logos[0].width}
                height={data.awayTeam.team.logos[0].height}
                className="w-5 object-contain"
              />
              <p className="font-[500] uppercase text-[14px]">{data.awayTeam.team.name}</p>
            </div>

            <select
              className="bg-gray-100 p-2 rounded-md px-2 text-sm uppercase mb-1"
              value={awayTeamFilterOptions.selectedPlayer}
              onChange={(e) =>
                setAwayTeamFilterOptions((curr) => ({ ...curr, selectedPlayer: e.target.value }))
              }
            >
              <option value="All Players" id="All Players">
                All Players
              </option>
              {data.gameData.boxscore.players[0].statistics[0].athletes.map((athlete: any) => {
                if (!athlete.athlete.didNotPlay)
                  return (
                    <option key={v4()} id={athlete.athlete.displayName} value={athlete.athlete.id}>
                      {athlete.athlete.displayName}
                    </option>
                  );
              })}
            </select>

            <div className="flex gap-1 pl-6 items-center">
              <input
                checked={awayTeamFilterOptions.showMadeShots}
                onChange={() =>
                  setAwayTeamFilterOptions((curr) => ({
                    ...curr,
                    showMadeShots: !curr.showMadeShots,
                  }))
                }
                type="checkbox"
                name="awayMade"
                id="awayMade"
                className="bg-red-400"
              />
              <div
                style={{
                  backgroundColor: "#" + awayTeamColor,
                }}
                className="md:w-[15px] w-[14px] h-[14px] md:h-[15px] rounded-full rotate-90 border-2 border-white"
              ></div>
              <label htmlFor="awayMade" className="mr-5 text-[14px]">
                Made
              </label>
              <input
                checked={awayTeamFilterOptions.showMissedShots}
                onChange={() =>
                  setAwayTeamFilterOptions((curr) => ({
                    ...curr,
                    showMissedShots: !curr.showMissedShots,
                  }))
                }
                type="checkbox"
                name="awayMissed"
                id="awayMissed"
              />
              <div
                style={{
                  backgroundColor: "white",
                  border: `3px solid #${awayTeamColor}`,
                  boxShadow: "0px 0px 0px 2px white",
                }}
                className="md:w-[12px] w-[11px] h-[11px] md:h-[12px] rounded-full"
              ></div>
              <label htmlFor="awayMissed" className="text-[14px]">
                Missed
              </label>
            </div>

            <div className="flex gap-1 items-center mt-4 mb-2">
              <Image
                src={data.homeTeam.team.logos[0].href}
                alt=""
                width={data.homeTeam.team.logos[0].width}
                height={data.homeTeam.team.logos[0].height}
                className="w-5 object-contain"
              />
              <p className="font-[500] text-[14px] uppercase">{data.homeTeam.team.name}</p>
            </div>

            <select
              className="bg-gray-100 p-2 rounded-md px-2 text-sm uppercase"
              value={homeTeamFilterOptions.selectedPlayer}
              onChange={(e) =>
                setHomeTeamFilterOptions((curr) => ({ ...curr, selectedPlayer: e.target.value }))
              }
            >
              <option value="All Players" id="All Players">
                All Players
              </option>
              {data.gameData.boxscore.players[1].statistics[0].athletes.map((athlete: any) => {
                if (!athlete.athlete.didNotPlay)
                  return (
                    <option key={v4()} id={athlete.athlete.displayName} value={athlete.athlete.id}>
                      {athlete.athlete.displayName}
                    </option>
                  );
              })}
            </select>

            <div className="flex gap-1 pl-6 items-center my-1">
              <input
                checked={homeTeamFilterOptions.showMadeShots}
                onChange={() =>
                  setHomeTeamFilterOptions((curr) => ({
                    ...curr,
                    showMadeShots: !curr.showMadeShots,
                  }))
                }
                type="checkbox"
                name="homeMade"
                id="homeMade"
                className="bg-red-400"
              />
              <div
                style={{
                  backgroundColor: "#" + homeTeamColor,
                }}
                className="md:w-[15px] w-[14px] h-[14px] md:h-[15px] rounded-full rotate-90 border-2 border-white"
              ></div>
              <label htmlFor="awayMade" className="mr-5 text-[14px]">
                Made
              </label>
              <input
                checked={homeTeamFilterOptions.showMissedShots}
                onChange={() =>
                  setHomeTeamFilterOptions((curr) => ({
                    ...curr,
                    showMissedShots: !curr.showMissedShots,
                  }))
                }
                type="checkbox"
                name="homeMissed"
                id="homeMissed"
                className="bg-red-400"
              />
              <div
                style={{
                  backgroundColor: "white",
                  border: `3px solid #${homeTeamColor}`,
                  boxShadow: "0px 0px 0px 2px white",
                }}
                className="md:w-[12px] w-[11px] h-[11px] md:h-[12px] rounded-full"
              ></div>
              <label htmlFor="awayMissed" className="text-[14px]">
                Missed
              </label>
            </div>
          </div>
        )}
        <div
          style={{ transition: "height 1s ease" }}
          className="flex gap-3 text-[#06c] cursor-pointer w-full justify-center items-center"
        >
          <img
            style={{
              transform: showFilters ? "rotate(270deg)" : "rotate(90deg)",
            }}
            src="/icons/arrow.svg"
            alt=""
            className="w-[9px] stroke-[#06c]"
          />
          <p
            onClick={() => setShowFilters((curr) => !curr)}
            className="text-center text-[13px]  font-semibold"
          >
            {showFilters ? "Hide" : "Show"} Filters
          </p>
        </div>
      </div>
    </div>
  );
}
