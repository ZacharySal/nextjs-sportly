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
  const [homeTeamFilterOptions, setHomeTeamFilterOptions] =
    useState(initialFilterOptions);
  const [awayTeamFilterOptions, setAwayTeamFilterOptions] =
    useState(initialFilterOptions);

  const { homeTeamColor, awayTeamColor } = usePreferredColor(data);

  const homeTeamShots = getFilteredTeamShots(
    data.gameData.plays,
    homeTeamFilterOptions,
    data.homeTeam.team.id,
  );
  const awayTeamShots = getFilteredTeamShots(
    data.gameData.plays,
    awayTeamFilterOptions,
    data.awayTeam.team.id,
  );

  return (
    <div className="relative flex min-w-full flex-col rounded-md bg-white p-3">
      <h2 className="border-[rgba(0,0,0,0.2]) mb-2 border-b border-dotted pb-2 text-[14px] font-semibold">
        Shot Chart
      </h2>

      <div className="relative flex h-full w-full items-center justify-center">
        <img
          src="/svgs/court.svg"
          className="relative max-h-full max-w-full object-contain"
        />
        <Image
          src={data.homeTeam.team.logos[0].href}
          alt=""
          width={data.homeTeam.team.logos[0].width}
          height={data.homeTeam.team.logos[0].height}
          className="absolute left-1/2 top-1/2 w-1/6 -translate-x-1/2 -translate-y-1/2"
        />
        <div className="absolute left-0 top-0 h-full w-full border-black">
          <div className="absolute h-full w-1/2 translate-x-full rotate-[90deg]">
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
                      className="absolute left-0 h-[14px] w-[14px] rotate-90 rounded-full border-2 border-white md:h-[15px] md:w-[15px]"
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
                    className="absolute left-0 h-[11px] w-[11px] rotate-90 rounded-full md:h-[12px] md:w-[12px]"
                  ></div>
                )}
              </div>
            ))}
          </div>
          <div className="absolute h-full w-1/2 rotate-[270deg] border-red-400">
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
                      className="absolute left-0 h-[14px] w-[14px] rotate-90 rounded-full border-2 border-white md:h-[15px] md:w-[15px]"
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
                    className="absolute left-0 h-[11px] w-[11px] rotate-90 rounded-full md:h-[12px] md:w-[12px]"
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="my-2 mt-5 w-full">
        {showFilters && (
          <div className="mb-5 flex w-full flex-col">
            <select
              className="mb-1 rounded-md bg-gray-100 p-2 px-2 text-sm uppercase"
              value={homeTeamFilterOptions.selectedQuarter}
              onChange={(e) => (
                setAwayTeamFilterOptions((curr) => ({
                  ...curr,
                  selectedQuarter: e.target.value,
                })),
                setHomeTeamFilterOptions((curr) => ({
                  ...curr,
                  selectedQuarter: e.target.value,
                }))
              )}
            >
              {[
                "All Quarters",
                "1st Quarter",
                "2nd Quarter",
                "3rd Quarter",
                "4th Quarter",
              ].map((text: string) => (
                <option key={v4()} id={`${text}`} value={`${text}`}>
                  {`${text}`}
                </option>
              ))}
            </select>

            <div className="mb-2 mt-3 flex items-center gap-1">
              <Image
                src={data.awayTeam.team.logos[0].href}
                alt=""
                width={data.awayTeam.team.logos[0].width}
                height={data.awayTeam.team.logos[0].height}
                className="w-5 object-contain"
              />
              <p className="text-[14px] font-[500] uppercase">
                {data.awayTeam.team.name}
              </p>
            </div>

            <select
              className="mb-1 rounded-md bg-gray-100 p-2 px-2 text-sm uppercase"
              value={awayTeamFilterOptions.selectedPlayer}
              onChange={(e) =>
                setAwayTeamFilterOptions((curr) => ({
                  ...curr,
                  selectedPlayer: e.target.value,
                }))
              }
            >
              <option value="All Players" id="All Players">
                All Players
              </option>
              {data.gameData.boxscore.players[0].statistics[0].athletes.map(
                (athlete: any) => {
                  if (!athlete.athlete.didNotPlay)
                    return (
                      <option
                        key={v4()}
                        id={athlete.athlete.displayName}
                        value={athlete.athlete.id}
                      >
                        {athlete.athlete.displayName}
                      </option>
                    );
                },
              )}
            </select>

            <div className="flex items-center gap-1 pl-6">
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
                className="h-[14px] w-[14px] rotate-90 rounded-full border-2 border-white md:h-[15px] md:w-[15px]"
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
                className="h-[11px] w-[11px] rounded-full md:h-[12px] md:w-[12px]"
              ></div>
              <label htmlFor="awayMissed" className="text-[14px]">
                Missed
              </label>
            </div>

            <div className="mb-2 mt-4 flex items-center gap-1">
              <Image
                src={data.homeTeam.team.logos[0].href}
                alt=""
                width={data.homeTeam.team.logos[0].width}
                height={data.homeTeam.team.logos[0].height}
                className="w-5 object-contain"
              />
              <p className="text-[14px] font-[500] uppercase">
                {data.homeTeam.team.name}
              </p>
            </div>

            <select
              className="rounded-md bg-gray-100 p-2 px-2 text-sm uppercase"
              value={homeTeamFilterOptions.selectedPlayer}
              onChange={(e) =>
                setHomeTeamFilterOptions((curr) => ({
                  ...curr,
                  selectedPlayer: e.target.value,
                }))
              }
            >
              <option value="All Players" id="All Players">
                All Players
              </option>
              {data.gameData.boxscore.players[1].statistics[0].athletes.map(
                (athlete: any) => {
                  if (!athlete.athlete.didNotPlay)
                    return (
                      <option
                        key={v4()}
                        id={athlete.athlete.displayName}
                        value={athlete.athlete.id}
                      >
                        {athlete.athlete.displayName}
                      </option>
                    );
                },
              )}
            </select>

            <div className="my-1 flex items-center gap-1 pl-6">
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
                className="h-[14px] w-[14px] rotate-90 rounded-full border-2 border-white md:h-[15px] md:w-[15px]"
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
                className="h-[11px] w-[11px] rounded-full md:h-[12px] md:w-[12px]"
              ></div>
              <label htmlFor="awayMissed" className="text-[14px]">
                Missed
              </label>
            </div>
          </div>
        )}
        <div
          style={{ transition: "height 1s ease" }}
          className="flex w-full cursor-pointer items-center justify-center gap-3 text-[#06c]"
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
