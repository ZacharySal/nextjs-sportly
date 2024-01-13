import { v4 as uuidv4 } from "uuid";
import ScoreCard from "./ScoreCard";
import { channel } from "diagnostics_channel";
import Link from "next/link";
import Image from "next/image";

export default function SeasonSeries({ data, league }: { data: any; league: string }) {
  return (
    <div className="bg-white min-w-full p-3 rounded-md">
      <p className="font-semibold text-sm">{data.gameData.seasonseries[0].description}</p>
      <p className="opacity-60 font-semibold text-xs pb-2 border-b border-b-[rgba(0,0,0,0.2)] border-dashed">
        {data.gameData.seasonseries[0].summary.replaceAll("series", "")}
      </p>
      {data.gameData.seasonseries[0].events.map((event: any, i: number) => (
        <Link key={event.id} href={`/${league}/game/${event.id}/home`}>
          <div className="w-full grid grid-cols-[1fr_25%] gap-3 py-2">
            {/* 1ST COLUMN: GAME INFO */}
            <div className="w-full grid grid-cols-[1fr_auto] items-center grid-rows-[1fr_1fr] score-cell relative">
              {/* AWAY TEAM IMG AND NAME */}
              <div className="flex items-center gap-2">
                <Image
                  src={event.competitors[1].team.logo ?? "/default.png"}
                  width={500}
                  height={500}
                  priority={true}
                  alt="home team logo"
                  className="w-6 object-contain"
                />
                <p
                  style={{
                    opacity: event.competitors[1].winner || event.status === "pre" ? "1" : "0.6",
                  }}
                  className="text-sm font-semibold"
                >
                  {
                    event.competitors[1].team.displayName.split(" ")[
                      event.competitors[1].team.displayName.split(" ").length - 1
                    ]
                  }
                </p>
              </div>
              {/* AWAY TEAM SCORE */}
              <p
                style={{
                  opacity: event.competitors[1].winner || event.status === "pre" ? "1" : "0.6",
                }}
                className={`${
                  event.competitors[1].winner && "winning-score"
                } text-sm text-end font-semibold`}
              >
                {event.status !== "pre" && event.competitors[1].score}
              </p>

              {/* HOME TEAM IMG AND NAME */}
              <div className="flex items-center gap-2">
                <Image
                  src={event.competitors[0].team.logo ?? "/default.png"}
                  width={500}
                  height={500}
                  priority={true}
                  alt="home team logo"
                  className="w-6 object-contain"
                />
                <p
                  style={{
                    opacity: event.competitors[0].winner || event.status === "pre" ? "1" : "0.6",
                  }}
                  className="text-sm font-semibold tracking-wide"
                >
                  {
                    event.competitors[0].team.displayName.split(" ")[
                      event.competitors[0].team.displayName.split(" ").length - 1
                    ]
                  }
                </p>
              </div>
              {/* HOME TEAM SCORE */}
              <p
                style={{
                  opacity: event.competitors[0].winner || event.status === "pre" ? "1" : "0.6",
                }}
                className={`${
                  event.competitors[0].winner && "winning-score"
                } text-sm text-end font-semibold`}
              >
                {event.status !== "pre" && event.competitors[0].score}
              </p>
            </div>

            <div className="flex w-full justify-start items-center">
              <div className="flex flex-col">
                <p className="text-xs opacity-60 font-[500]">Game {i + 1}</p>
                {event.statusType.state !== "pre" ? (
                  <>
                    <p className="text-xs opacity-75 font-semibold">
                      {new Date(event.date).toLocaleDateString("en-us", {
                        day: "numeric",
                        month: "numeric",
                      })}
                    </p>
                    <p
                      style={{ color: event.status == "in" ? "#d50a0a" : "black" }}
                      className="flex w-full justify-start items-center text-xs font-semibold"
                    >
                      {event.status == "in" ? "LIVE" : event.statusType.shortDetail}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-xs opacity-90 font-semibold">
                      {new Date(event.date).toLocaleDateString("en-us", {
                        day: "numeric",
                        month: "numeric",
                      })}
                    </p>
                    <p className="text-xs opacity-90">{event?.broadcasts?.[0]?.media?.shortName}</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
