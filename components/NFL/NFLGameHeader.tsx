"use client";

import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";
import Link from "next/link";
import { v4 } from "uuid";

export default function NFLGameHeader({
  league,
  data,
}: {
  league: string;
  data: any;
}) {
  const isDesktopScreen = useMediaQuery("(min-width:800px)");
  const homeTeam = data.gameData.header.competitions[0].competitors[0];
  const awayTeam = data.gameData.header.competitions[0].competitors[1];
  const gameInfo = data.gameData.header.competitions[0];
  const isGameStarted = data.gameInfo.status.type.state !== "pre";
  const gameDate = new Date(gameInfo.date);

  return (
    <>
      {isDesktopScreen ? (
        <div className="sticky top-[2.75rem] z-40 flex w-full justify-center border-b border-[rgba(0,0,0,0.2)] bg-white">
          <div className="relative flex h-24 w-full flex-row items-center justify-center gap-6 xl:gap-10 2xl:w-2/5">
            <div className="flex flex-row items-center justify-center gap-2 lg:gap-3">
              <div className="flex flex-col text-black">
                <div
                  style={{ backgroundColor: "#" + awayTeam.team.color }}
                  className="game-header-logo-wrapper game-header-logo-wrapper--left left-0 mr-10 xl:left-[80px] 2xl:left-[-150px]"
                >
                  <Image
                    src={awayTeam.team.logos[3].href}
                    width={awayTeam.team.logos[3].width}
                    height={awayTeam.team.logos[3].height}
                    alt="away team logo"
                    className="game-header-logo--left w-44 object-cover"
                  />
                </div>

                <Link
                  className="whitespace-nowrap"
                  href={`/${league}/team/${awayTeam.team.id}/home`}
                >
                  {/* xl screen has full name, and full record*/}
                  <div className="flex flex-col text-right text-black">
                    <p className="hidden font-bold xl:block">
                      {awayTeam.team.location + " " + awayTeam.team.name}
                    </p>
                    <p className="hidden font-bold lg:block xl:hidden">
                      {awayTeam.team.name}
                    </p>
                    <p className="block font-semibold lg:hidden">
                      {awayTeam.team.abbreviation}
                    </p>
                    <p className="hidden text-[11px] opacity-60 lg:block">
                      {`${awayTeam?.record?.[0]?.displayValue}, ${awayTeam?.record?.[1]?.displayValue} AWAY`}
                    </p>
                    <p className="block text-[11px] opacity-60 lg:hidden">
                      {`${awayTeam?.record?.[0]?.displayValue}`}
                    </p>
                  </div>
                </Link>
              </div>

              <Link
                className="w-full "
                href={`/${league}/team/${awayTeam.team.id}/home`}
              >
                <Image
                  src={awayTeam.team.logos[0].href}
                  width={awayTeam.team.logos[0].width}
                  height={awayTeam.team.logos[0].height}
                  alt="away team logo"
                  className="w-10 object-cover lg:w-14"
                />
              </Link>

              <div className="flex flex-col items-center justify-center">
                <p
                  style={{
                    fontWeight: "700",
                    opacity:
                      Number(awayTeam.score) < Number(homeTeam.score) &&
                      data.gameInfo.status.type.state == "post"
                        ? "0.5"
                        : "1",
                  }}
                  className="w-full text-center text-3xl text-black"
                >
                  {awayTeam.score}
                </p>
                {data.gameInfo.status.type.state == "in" && (
                  <div className="flex flex-col gap-[2px]">
                    <div className="flex h-[15px] w-[100px] items-center justify-center gap-[2px]">
                      {new Array(data?.awayTeam?.timeoutsRemaining ?? 0)
                        .fill("1")
                        .map((num: string, i: number) => (
                          <div
                            key={v4()}
                            className="h-[6px] w-[6px] rounded-full bg-yellow-400"
                          ></div>
                        ))}
                      {new Array(7 - data?.awayTeam?.timeoutsRemaining ?? 0)
                        .fill("1")
                        .map((num: string, i: number) => (
                          <div
                            key={v4()}
                            className="h-[6px] w-[6px] rounded-full bg-gray-200"
                          ></div>
                        ))}
                    </div>
                    <p
                      style={{
                        opacity:
                          data?.awayTeam?.fouls.bonusState != "NONE"
                            ? "0.6"
                            : "0.2",
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
              <div className="flex flex-col items-center justify-center gap-2 py-2">
                <p
                  style={{
                    color:
                      gameInfo.status.type.state == "in" ? "#d00" : "black",
                  }}
                  className="text-[12px] font-semibold"
                >
                  {gameInfo.status.type.shortDetail}
                </p>
                {/* put boxscore here*/}
                <div className="grid w-[200px] grid-cols-[40px_1fr_1fr_1fr_1fr_1fr] gap-x-2 border-b">
                  <p className="col-start-2 text-center text-[11px] font-[500]">
                    1
                  </p>
                  <p className="col-start-3 text-center text-[11px] font-[500]">
                    2
                  </p>
                  <p className="col-start-4 text-center text-[11px] font-[500]">
                    3
                  </p>
                  <p className="col-start-5 text-center text-[11px] font-[500]">
                    4
                  </p>
                  <p className="col-start-6 text-center text-[11px] font-[500]">
                    T
                  </p>
                </div>
                <div className="grid w-[200px] grid-cols-[40px_1fr_1fr_1fr_1fr_1fr] gap-x-2">
                  <p className="col-start-1 text-left text-[11px] opacity-80">
                    {data.awayTeam.team.abbreviation}
                  </p>
                  {new Array(4).fill("1").map((num: string, i: number) => (
                    <p
                      key={v4()}
                      className="text-center text-[11px] opacity-60"
                    >
                      {data?.awayTeam?.linescores?.[i]?.displayValue ?? "-"}
                    </p>
                  ))}
                  <p className="text-center text-[11px] font-[500]">
                    {data?.awayTeam?.score ?? "0"}
                  </p>
                  <p className="col-start-1 text-left text-[11px] opacity-80">
                    {data.homeTeam.team.abbreviation}
                  </p>
                  {new Array(4).fill("1").map((num: string, i: number) => (
                    <p
                      key={v4()}
                      className="text-center text-[11px] opacity-60"
                    >
                      {data?.homeTeam?.linescores?.[i]?.displayValue ?? "-"}
                    </p>
                  ))}
                  <p className="text-center text-[11px] font-[500]">
                    {data?.homeTeam?.score ?? "0"}
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <div className="col-start-2 flex flex-col items-center justify-center text-black">
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

            <div className="flex flex-row items-center justify-center gap-1 lg:gap-3">
              <div className="flex flex-col items-center justify-center">
                <p
                  style={{
                    fontWeight: "700",
                    opacity:
                      Number(homeTeam.score) < Number(awayTeam.score) &&
                      data.gameInfo.status.type.state == "post"
                        ? "0.5"
                        : "1",
                  }}
                  className="w-full text-center text-3xl text-black"
                >
                  {homeTeam.score}
                </p>
                {data.gameInfo.status.type.state == "in" && (
                  <div className="flex flex-col gap-[2px]">
                    <div className="flex h-[15px] w-[100px] items-center justify-center gap-[2px]">
                      {new Array(data?.homeTeam?.timeoutsRemaining ?? 0)
                        .fill("1")
                        .map(() => (
                          <div
                            key={v4()}
                            className="h-[6px] w-[6px] rounded-full bg-yellow-400"
                          ></div>
                        ))}
                      {new Array(7 - data.homeTeam?.timeoutsRemaining ?? 0)
                        .fill("1")
                        .map(() => (
                          <div
                            key={v4()}
                            className="h-[6px] w-[6px] rounded-full bg-gray-200"
                          ></div>
                        ))}
                    </div>
                    <p
                      style={{
                        opacity:
                          data?.homeTeam?.fouls?.bonusState != "NONE"
                            ? "0.6"
                            : "0.2",
                      }}
                      className="text-center text-[11px] font-[500]"
                    >
                      BONUS
                    </p>
                  </div>
                )}
              </div>

              <Link
                className="w-full "
                href={`/${league}/team/${homeTeam.team.id}/home`}
              >
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
                <div className="flex flex-col text-left text-black">
                  <p className="hidden font-bold xl:block">
                    {homeTeam.team.location + " " + homeTeam.team.name}
                  </p>
                  <p className="hidden font-bold lg:block xl:hidden">
                    {homeTeam.team.name}
                  </p>
                  <p className="block font-semibold lg:hidden">
                    {homeTeam.team.abbreviation}
                  </p>
                  <p className="hidden text-[11px] opacity-60 lg:block">
                    {`${homeTeam?.record?.[0]?.displayValue}, ${homeTeam?.record?.[1]?.displayValue} AWAY`}
                  </p>
                  <p className="block text-[11px] opacity-60 lg:hidden">
                    {`${homeTeam?.record?.[0]?.displayValue}`}
                  </p>
                </div>
              </Link>

              <div
                style={{ backgroundColor: "#" + homeTeam.team.color }}
                className="game-header-logo-wrapper game-header-logo-wrapper--right right-0 ml-10 xl:right-[80px]  2xl:right-[-150px]"
              >
                <Image
                  src={homeTeam.team.logos[3].href}
                  width={homeTeam.team.logos[3].width}
                  height={homeTeam.team.logos[3].height}
                  alt="away team logo"
                  className="game-header-logo--right w-44 object-cover"
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
                className="sticky top-[2.75rem] z-40 grid h-[55px] w-full grid-rows-1 place-items-center justify-center gap-x-6 border-b border-[rgba(0,0,0,0.2)] px-3 py-8 text-center text-black shadow-sm"
              >
                {/*Away Team Logo, abv, and record*/}
                <Link
                  className="col-start-1 w-full"
                  href={`/${league}/team/${awayTeam.team.id}/home`}
                >
                  <div className="flex flex-row items-center justify-center gap-2">
                    <div className="flex flex-col">
                      <p className="text-sm font-semibold opacity-80">
                        {awayTeam.team.abbreviation}
                      </p>
                      <p className="whitespace-nowrap text-xs opacity-80">
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

                <div className="col-start-2 flex flex-col items-center justify-center text-black">
                  <p className="text-xs opacity-70">
                    {gameInfo.broadcasts[0]?.media?.shortName || ""}
                  </p>
                  <p className="text-xs opacity-80">
                    {gameDate.getMonth() + 1}/{gameDate.getDate()}
                  </p>
                  <p className="text-xs font-[500] opacity-80">
                    {gameDate.toLocaleTimeString("en-us", {
                      timeStyle: "short",
                    })}
                  </p>
                </div>

                {/*Home Team Logo, abv, and record*/}
                <Link
                  className="col-start-3 w-full "
                  href={`/${league}/team/${homeTeam.team.id}/home`}
                >
                  <div className="flex flex-row items-center justify-center gap-2">
                    <Image
                      src={homeTeam.team.logos[0].href}
                      width={homeTeam.team.logos[0].width}
                      height={homeTeam.team.logos[0].height}
                      alt="home team logo"
                      className="w-8 object-contain"
                    />
                    <div className="flex flex-col">
                      <p className="text-sm font-semibold opacity-80">
                        {homeTeam.team.abbreviation}
                      </p>
                      <p className="whitespace-nowrap text-xs opacity-80">
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
                className="sticky top-[2.75rem] z-40 grid h-[55px] w-full grid-cols-5 grid-rows-1 place-items-center border-b border-[rgba(0,0,0,0.2)] px-3 py-8 text-center text-black shadow-sm"
              >
                {/*Home Team Logo, abv, and record*/}
                <Link
                  className="col-start-1 w-full"
                  href={`/${league}/team/${awayTeam.team.id}/home`}
                >
                  <div className="flex flex-col-reverse items-center justify-end gap-1 xs:flex-row">
                    <div className="flex flex-col">
                      <p className="text-[10px] font-semibold opacity-70">
                        {awayTeam.team.abbreviation}
                      </p>
                      <p className="whitespace-nowrap text-[10px] opacity-70">
                        {typeof awayTeam.record !== "undefined" &&
                          awayTeam.record?.[0]?.displayValue}
                      </p>
                    </div>
                    <Image
                      src={awayTeam.team.logos[0].href}
                      width={awayTeam.team.logos[0].width}
                      height={awayTeam.team.logos[0].height}
                      alt="away team logo"
                      className="w-6 object-contain xs:w-8"
                    />
                  </div>
                </Link>

                <div className="col-start-2 row-span-2 flex flex-col items-center justify-center">
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
                    } relative mb-[-0.30rem] text-2xl`}
                  >
                    {awayTeam.score}
                  </p>
                  {data.gameInfo.status.type.state == "in" && (
                    <div className="flex flex-col">
                      <div className="flex h-[15px] w-[100px] items-center justify-center gap-[2px]">
                        {new Array(data?.awayTeam?.timeoutsRemaining ?? 0)
                          .fill("1")
                          .map((num: string, i: number) => (
                            <div
                              key={v4()}
                              className="h-[4px] w-[4px] rounded-full bg-yellow-400"
                            ></div>
                          ))}
                        {new Array(7 - data?.awayTeam?.timeoutsRemaining ?? 0)
                          .fill("1")
                          .map((num: string, i: number) => (
                            <div
                              key={v4()}
                              className="h-[4px] w-[4px] rounded-full bg-gray-200"
                            ></div>
                          ))}
                      </div>
                      <p
                        style={{
                          opacity:
                            data?.awayTeam?.fouls.bonusState != "NONE"
                              ? "0.6"
                              : "0.2",
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
                    color:
                      gameInfo.status.type.shortDetail == "Final"
                        ? "black"
                        : "#d50a0a",
                  }}
                  className="col-start-3 whitespace-nowrap pt-[5px] text-[12px] font-[500]"
                >
                  {gameInfo.status.type.shortDetail}
                </p>

                <div className="col-start-4 row-span-2 flex flex-col items-center justify-center">
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
                    } relative mb-[-0.30rem] text-2xl`}
                  >
                    {homeTeam.score}
                  </p>
                  {data.gameInfo.status.type.state == "in" && (
                    <div className="flex flex-col">
                      <div className="flex h-[15px] w-[100px] items-center justify-center gap-[2px]">
                        {new Array(data?.homeTeam?.timeoutsRemaining ?? 0)
                          .fill("1")
                          .map((num: string, i: number) => (
                            <div
                              key={v4()}
                              className="h-[4px] w-[4px] rounded-full bg-yellow-400"
                            ></div>
                          ))}
                        {new Array(7 - data?.homeTeam?.timeoutsRemaining ?? 0)
                          .fill("1")
                          .map((num: string, i: number) => (
                            <div
                              key={v4()}
                              className="h-[4px] w-[4px] rounded-full bg-gray-200"
                            ></div>
                          ))}
                      </div>
                      <p
                        style={{
                          opacity:
                            data?.homeTeam?.fouls.bonusState != "NONE"
                              ? "0.6"
                              : "0.2",
                        }}
                        className="text-center text-[11px] font-[500]"
                      >
                        BONUS
                      </p>
                    </div>
                  )}
                </div>

                <Link
                  className="w-full "
                  href={`/${league}/team/${homeTeam.team.id}/home`}
                >
                  <div className="col-start-5 flex flex-col items-center gap-1 text-black xs:flex-row">
                    <Image
                      src={homeTeam.team.logos[0].href}
                      width={homeTeam.team.logos[0].width}
                      height={homeTeam.team.logos[0].height}
                      alt="home team logo"
                      className="w-6 object-contain xs:w-8"
                    />
                    <div className="flex flex-col text-[10px]">
                      <p className="font-semibold opacity-80">
                        {homeTeam.team.abbreviation}
                      </p>
                      <p className="whitespace-nowrap  opacity-80">
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
