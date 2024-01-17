"use client";

import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";
import Link from "next/link";
import { v4 } from "uuid";

export default function NBAGameHeader({ league, data }: { league: string; data: any }) {
  const isDesktopScreen = useMediaQuery("(min-width:800px)");
  const homeTeam = data.gameData.header.competitions[0].competitors[0];
  const awayTeam = data.gameData.header.competitions[0].competitors[1];
  const gameInfo = data.gameData.header.competitions[0];
  const isGameStarted = data.gameInfo.status.type.state !== "pre";
  const gameDate = new Date(gameInfo.date);

  return (
    <>
      {isDesktopScreen ? (
        <div className="bg-white w-full flex justify-center border-b border-[rgba(0,0,0,0.2)] z-40 sticky top-[2.75rem]">
          <div className="w-full 2xl:w-2/5 h-24 flex-row flex justify-center items-center gap-6 xl:gap-10 relative">
            <div className="flex flex-row justify-center items-center gap-2 lg:gap-3">
              <div className="flex flex-col text-black">
                <div
                  style={{ backgroundColor: "#" + awayTeam.team.color }}
                  className="mr-10 game-header-logo-wrapper game-header-logo-wrapper--left left-0 xl:left-[80px] 2xl:left-[-150px]"
                >
                  <Image
                    src={awayTeam.team.logos[3].href}
                    width={awayTeam.team.logos[3].width}
                    height={awayTeam.team.logos[3].height}
                    alt="away team logo"
                    className="w-44 object-cover game-header-logo--left"
                  />
                </div>

                <Link
                  className="whitespace-nowrap"
                  href={`/${league}/team/${awayTeam.team.id}/home`}
                >
                  {/* xl screen has full name, and full record*/}
                  <div className="flex flex-col text-black text-right">
                    <p className="font-bold hidden xl:block">
                      {awayTeam.team.location + " " + awayTeam.team.name}
                    </p>
                    <p className="font-bold hidden lg:block xl:hidden">{awayTeam.team.name}</p>
                    <p className="font-semibold block lg:hidden">{awayTeam.team.abbreviation}</p>
                    <p className="text-[11px] opacity-60 hidden lg:block">
                      {`${awayTeam?.record?.[0]?.displayValue}, ${awayTeam?.record?.[1]?.displayValue} AWAY`}
                    </p>
                    <p className="text-[11px] opacity-60 block lg:hidden">
                      {`${awayTeam?.record?.[0]?.displayValue}`}
                    </p>
                  </div>
                </Link>
              </div>

              <Link className="w-full " href={`/${league}/team/${awayTeam.team.id}/home`}>
                <Image
                  src={awayTeam.team.logos[0].href}
                  width={awayTeam.team.logos[0].width}
                  height={awayTeam.team.logos[0].height}
                  alt="away team logo"
                  className="w-10 lg:w-14 object-cover"
                />
              </Link>

              <div className="flex flex-col justify-center items-center">
                <p
                  style={{
                    fontWeight: "700",
                    opacity:
                      Number(awayTeam.score) < Number(homeTeam.score) &&
                      data.gameInfo.status.type.state == "post"
                        ? "0.5"
                        : "1",
                  }}
                  className="w-full text-black text-3xl text-center"
                >
                  {awayTeam.score}
                </p>
                {data.gameInfo.status.type.state == "in" && (
                  <div className="flex flex-col gap-[2px]">
                    <div className="w-[100px] h-[15px] flex items-center justify-center gap-[2px]">
                      {new Array(data?.awayTeam?.timeoutsRemaining ?? 0)
                        .fill("1")
                        .map((num: string, i: number) => (
                          <div
                            key={v4()}
                            className="w-[6px] h-[6px] bg-yellow-400 rounded-full"
                          ></div>
                        ))}
                      {new Array(7 - data?.awayTeam?.timeoutsRemaining ?? 0)
                        .fill("1")
                        .map((num: string, i: number) => (
                          <div
                            key={v4()}
                            className="w-[6px] h-[6px] bg-gray-200 rounded-full"
                          ></div>
                        ))}
                    </div>
                    <p
                      style={{
                        opacity: data?.awayTeam?.fouls.bonusState != "NONE" ? "0.6" : "0.2",
                      }}
                      className="text-center text-[11px] font-[500]"
                    >
                      BONUS
                    </p>
                  </div>
                )}
              </div>
            </div>
            {isGameStarted ? (
              <div className="flex flex-col py-2 justify-center items-center gap-2">
                <p
                  style={{ color: gameInfo.status.type.state == "in" ? "#d00" : "black" }}
                  className="text-[12px] font-semibold"
                >
                  {gameInfo.status.type.shortDetail}
                </p>
                {/* put boxscore here*/}
                <div className="w-[200px] grid grid-cols-[40px_1fr_1fr_1fr_1fr_1fr] border-b gap-x-2">
                  <p className="col-start-2 text-[11px] text-center font-[500]">1</p>
                  <p className="col-start-3 text-[11px] text-center font-[500]">2</p>
                  <p className="col-start-4 text-[11px] text-center font-[500]">3</p>
                  <p className="col-start-5 text-[11px] text-center font-[500]">4</p>
                  <p className="col-start-6 text-[11px] text-center font-[500]">T</p>
                </div>
                <div className="w-[200px] grid grid-cols-[40px_1fr_1fr_1fr_1fr_1fr] gap-x-2">
                  <p className="text-[11px] text-left opacity-80 col-start-1">
                    {data.awayTeam.team.abbreviation}
                  </p>
                  {new Array(4).fill("1").map((num: string, i: number) => (
                    <p key={v4()} className="text-[11px] text-center opacity-60">
                      {data?.awayTeam?.linescores?.[i]?.displayValue ?? "-"}
                    </p>
                  ))}
                  <p className="text-[11px] text-center font-[500]">
                    {data?.awayTeam?.score ?? "0"}
                  </p>
                  <p className="text-[11px] text-left opacity-80 col-start-1">
                    {data.homeTeam.team.abbreviation}
                  </p>
                  {new Array(4).fill("1").map((num: string, i: number) => (
                    <p key={v4()} className="text-[11px] text-center opacity-60">
                      {data?.homeTeam?.linescores?.[i]?.displayValue ?? "-"}
                    </p>
                  ))}
                  <p className="text-[11px] text-center font-[500]">
                    {data?.homeTeam?.score ?? "0"}
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex flex-col justify-center items-center col-start-2 text-black">
                  <p className="text-sm opacity-70">
                    {gameInfo.broadcasts[0]?.media?.shortName || ""}
                  </p>
                  <p className="text-sm font-[500] opacity-80">
                    {gameDate.getMonth() + 1}/{gameDate.getDate()}
                  </p>
                  <p className="text-sm font-[500] opacity-80">
                    {gameDate.toLocaleTimeString("en-us", {
                      timeStyle: "short",
                    })}
                  </p>
                </div>
              </div>
            )}

            <div className="flex flex-row justify-center items-center gap-1 lg:gap-3">
              <div className="flex flex-col justify-center items-center">
                <p
                  style={{
                    fontWeight: "700",
                    opacity:
                      Number(homeTeam.score) < Number(awayTeam.score) &&
                      data.gameInfo.status.type.state == "post"
                        ? "0.5"
                        : "1",
                  }}
                  className="w-full text-black text-3xl text-center"
                >
                  {homeTeam.score}
                </p>
                {data.gameInfo.status.type.state == "in" && (
                  <div className="flex flex-col gap-[2px]">
                    <div className="w-[100px] h-[15px] flex items-center justify-center gap-[2px]">
                      {new Array(data?.homeTeam?.timeoutsRemaining ?? 0).fill("1").map(() => (
                        <div
                          key={v4()}
                          className="w-[6px] h-[6px] bg-yellow-400 rounded-full"
                        ></div>
                      ))}
                      {new Array(7 - data.homeTeam?.timeoutsRemaining ?? 0).fill("1").map(() => (
                        <div key={v4()} className="w-[6px] h-[6px] bg-gray-200 rounded-full"></div>
                      ))}
                    </div>
                    <p
                      style={{
                        opacity: data?.homeTeam?.fouls?.bonusState != "NONE" ? "0.6" : "0.2",
                      }}
                      className="text-center text-[11px] font-[500]"
                    >
                      BONUS
                    </p>
                  </div>
                )}
              </div>

              <Link className="w-full " href={`/${league}/team/${homeTeam.team.id}/home`}>
                <Image
                  src={homeTeam.team.logos[0].href}
                  width={homeTeam.team.logos[0].width}
                  height={homeTeam.team.logos[0].height}
                  alt="home team logo"
                  className="w-14 object-cover"
                />
              </Link>
              <Link
                className="w-full whitespace-nowrap"
                href={`/${league}/team/${homeTeam.team.id}/home`}
              >
                <div className="flex flex-col text-black text-left">
                  <p className="font-bold hidden xl:block">
                    {homeTeam.team.location + " " + homeTeam.team.name}
                  </p>
                  <p className="font-bold hidden lg:block xl:hidden">{homeTeam.team.name}</p>
                  <p className="font-semibold block lg:hidden">{homeTeam.team.abbreviation}</p>
                  <p className="text-[11px] opacity-60 hidden lg:block">
                    {`${homeTeam?.record?.[0]?.displayValue}, ${homeTeam?.record?.[1]?.displayValue} AWAY`}
                  </p>
                  <p className="text-[11px] opacity-60 block lg:hidden">
                    {`${homeTeam?.record?.[0]?.displayValue}`}
                  </p>
                </div>
              </Link>

              <div
                style={{ backgroundColor: "#" + homeTeam.team.color }}
                className="ml-10 game-header-logo-wrapper game-header-logo-wrapper--right right-0 xl:right-[80px]  2xl:right-[-150px]"
              >
                <Image
                  src={homeTeam.team.logos[3].href}
                  width={homeTeam.team.logos[3].width}
                  height={homeTeam.team.logos[3].height}
                  alt="away team logo"
                  className="w-44 object-cover game-header-logo--right"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {gameInfo.status.type.description === "Scheduled" ? (
            <>
              <div
                style={{
                  backgroundColor: "white",
                }}
                className="w-full h-[55px] py-8 border-b border-[rgba(0,0,0,0.2)] place-items-center justify-center gap-x-6 text-center text-black px-3 grid grid-rows-1 shadow-sm sticky top-[2.75rem] z-40"
              >
                {/*Away Team Logo, abv, and record*/}
                <Link
                  className="w-full col-start-1"
                  href={`/${league}/team/${awayTeam.team.id}/home`}
                >
                  <div className="flex flex-row gap-2 justify-center items-center">
                    <div className="flex flex-col">
                      <p className="text-sm opacity-80 font-semibold">
                        {awayTeam.team.abbreviation}
                      </p>
                      <p className="text-xs opacity-80 whitespace-nowrap">
                        {awayTeam.record?.[0]?.displayValue || "0-0"}
                      </p>
                    </div>
                    <Image
                      src={awayTeam.team.logos[0].href}
                      width={awayTeam.team.logos[0].width}
                      height={awayTeam.team.logos[0].height}
                      alt="away team logo"
                      className="w-8 object-contain"
                    />
                  </div>
                </Link>

                <div className="flex flex-col justify-center items-center col-start-2 text-black">
                  <p className="text-xs opacity-70">
                    {gameInfo.broadcasts[0]?.media?.shortName || ""}
                  </p>
                  <p className="text-xs opacity-80">
                    {gameDate.getMonth() + 1}/{gameDate.getDate()}
                  </p>
                  <p className="text-xs opacity-80 font-[500]">
                    {gameDate.toLocaleTimeString("en-us", {
                      timeStyle: "short",
                    })}
                  </p>
                </div>

                {/*Home Team Logo, abv, and record*/}
                <Link
                  className="w-full col-start-3 "
                  href={`/${league}/team/${homeTeam.team.id}/home`}
                >
                  <div className="flex flex-row gap-2 justify-center items-center">
                    <Image
                      src={homeTeam.team.logos[0].href}
                      width={homeTeam.team.logos[0].width}
                      height={homeTeam.team.logos[0].height}
                      alt="home team logo"
                      className="w-8 object-contain"
                    />
                    <div className="flex flex-col">
                      <p className="text-sm opacity-80 font-semibold">
                        {homeTeam.team.abbreviation}
                      </p>
                      <p className="text-xs opacity-80 whitespace-nowrap">
                        {homeTeam.record?.[0]?.displayValue || "0-0"}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div
                style={{
                  backgroundColor: "white",
                }}
                className="w-full h-[55px] px-3 py-8 border-b border-[rgba(0,0,0,0.2)] place-items-center text-center text-black grid grid-cols-5 grid-rows-1 shadow-sm sticky top-[2.75rem] z-40"
              >
                {/*Home Team Logo, abv, and record*/}
                <Link
                  className="w-full col-start-1"
                  href={`/${league}/team/${awayTeam.team.id}/home`}
                >
                  <div className="flex flex-col-reverse xs:flex-row gap-1 items-center justify-end">
                    <div className="flex flex-col">
                      <p className="text-[10px] opacity-70 font-semibold">
                        {awayTeam.team.abbreviation}
                      </p>
                      <p className="text-[10px] opacity-70 whitespace-nowrap">
                        {typeof awayTeam.record !== "undefined" &&
                          awayTeam.record?.[0]?.displayValue}
                      </p>
                    </div>
                    <Image
                      src={awayTeam.team.logos[0].href}
                      width={awayTeam.team.logos[0].width}
                      height={awayTeam.team.logos[0].height}
                      alt="away team logo"
                      className="w-6 xs:w-8 object-contain"
                    />
                  </div>
                </Link>

                <div className="flex flex-col items-center justify-center col-start-2 row-span-2">
                  <p
                    style={{
                      fontWeight: "700",
                      opacity:
                        Number(awayTeam.score) < Number(homeTeam.score) &&
                        data.gameInfo.status.type.state == "post"
                          ? "0.5"
                          : "1",
                      paddingRight:
                        Number(awayTeam.score) > Number(homeTeam.score) &&
                        data.gameInfo.status.type.state == "post"
                          ? "8px"
                          : "0px",
                    }}
                    className={`${
                      Number(awayTeam.score) > Number(homeTeam.score) &&
                      data.gameInfo.status.type.state == "post"
                        ? "away-winning-score-header"
                        : ""
                    } relative text-2xl mb-[-0.30rem]`}
                  >
                    {awayTeam.score}
                  </p>
                  {data.gameInfo.status.type.state == "in" && (
                    <div className="flex flex-col">
                      <div className="w-[100px] h-[15px] flex items-center justify-center gap-[2px]">
                        {new Array(data?.awayTeam?.timeoutsRemaining ?? 0)
                          .fill("1")
                          .map((num: string, i: number) => (
                            <div
                              key={v4()}
                              className="w-[4px] h-[4px] bg-yellow-400 rounded-full"
                            ></div>
                          ))}
                        {new Array(7 - data?.awayTeam?.timeoutsRemaining ?? 0)
                          .fill("1")
                          .map((num: string, i: number) => (
                            <div
                              key={v4()}
                              className="w-[4px] h-[4px] bg-gray-200 rounded-full"
                            ></div>
                          ))}
                      </div>
                      <p
                        style={{
                          opacity: data?.awayTeam?.fouls.bonusState != "NONE" ? "0.6" : "0.2",
                        }}
                        className="text-center text-[11px] font-[500]"
                      >
                        BONUS
                      </p>
                    </div>
                  )}
                </div>

                <p
                  style={{
                    color: gameInfo.status.type.shortDetail == "Final" ? "black" : "#d50a0a",
                  }}
                  className="whitespace-nowrap text-[12px] font-[500] col-start-3 pt-[5px]"
                >
                  {gameInfo.status.type.shortDetail}
                </p>

                <div className="flex flex-col items-center justify-center col-start-4 row-span-2">
                  <p
                    style={{
                      fontWeight: "700",
                      opacity:
                        Number(homeTeam.score) < Number(awayTeam.score) &&
                        data.gameInfo.status.type.state == "post"
                          ? "0.5"
                          : "1",
                      paddingLeft:
                        Number(homeTeam.score) > Number(awayTeam.score) &&
                        data.gameInfo.status.type.state == "post"
                          ? "8px"
                          : "0px",
                    }}
                    className={`${
                      Number(homeTeam.score) > Number(awayTeam.score) &&
                      data.gameInfo.status.type.state == "post"
                        ? "home-winning-score-header"
                        : ""
                    } relative text-2xl mb-[-0.30rem]`}
                  >
                    {homeTeam.score}
                  </p>
                  {data.gameInfo.status.type.state == "in" && (
                    <div className="flex flex-col">
                      <div className="w-[100px] h-[15px] flex items-center justify-center gap-[2px]">
                        {new Array(data?.homeTeam?.timeoutsRemaining ?? 0)
                          .fill("1")
                          .map((num: string, i: number) => (
                            <div
                              key={v4()}
                              className="w-[4px] h-[4px] bg-yellow-400 rounded-full"
                            ></div>
                          ))}
                        {new Array(7 - data?.homeTeam?.timeoutsRemaining ?? 0)
                          .fill("1")
                          .map((num: string, i: number) => (
                            <div
                              key={v4()}
                              className="w-[4px] h-[4px] bg-gray-200 rounded-full"
                            ></div>
                          ))}
                      </div>
                      <p
                        style={{
                          opacity: data?.homeTeam?.fouls.bonusState != "NONE" ? "0.6" : "0.2",
                        }}
                        className="text-center text-[11px] font-[500]"
                      >
                        BONUS
                      </p>
                    </div>
                  )}
                </div>

                <Link className="w-full " href={`/${league}/team/${homeTeam.team.id}/home`}>
                  <div className="flex flex-col xs:flex-row gap-1 items-center col-start-5 text-black">
                    <Image
                      src={homeTeam.team.logos[0].href}
                      width={homeTeam.team.logos[0].width}
                      height={homeTeam.team.logos[0].height}
                      alt="home team logo"
                      className="w-6 xs:w-8 object-contain"
                    />
                    <div className="flex flex-col text-[10px]">
                      <p className="opacity-80 font-semibold">{homeTeam.team.abbreviation}</p>
                      <p className="opacity-80  whitespace-nowrap">
                        {typeof homeTeam.record !== "undefined" &&
                          homeTeam.record?.[0]?.displayValue}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}