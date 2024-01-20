"use client";

import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";
import {
  mlbDivisonTeams,
  nbaDivisionTeams,
  nflDivisonTeams,
} from "@/lib/constants";
import Link from "next/link";

export default function GameHeader({
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

  function findTeamDivison(teamName: string) {
    let allTeams;
    if (league === "nfl") allTeams = nflDivisonTeams;
    else if (league === "nba") allTeams = nbaDivisionTeams;
    else if (league === "mlb") allTeams = mlbDivisonTeams;
    for (const conference in allTeams) {
      for (const team of allTeams[conference]) {
        if (team[0] == teamName) return conference;
      }
    }
  }
  return (
    <>
      {isDesktopScreen ? (
        <div className="sticky top-[2.75rem] z-40 flex w-full justify-center border-b border-[rgba(0,0,0,0.2)] bg-white">
          <div className="relative flex h-24 w-full flex-row items-center justify-center gap-10 2xl:w-2/5">
            <div className="flex flex-row items-center justify-center gap-3">
              <div className="flex flex-col text-black">
                <div
                  style={{ backgroundColor: "#" + awayTeam.team.color }}
                  className="game-header-logo-wrapper game-header-logo-wrapper--left mr-10 md:left-0 xl:left-[150px] 2xl:left-[-150px]"
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
                  className="w-full "
                  href={`/${league}/team/${awayTeam.team.id}/home`}
                >
                  <p className="text whitespace-nowrap font-bold">
                    {awayTeam.team.location + " " + awayTeam.team.name}
                  </p>
                  <p className="text-right text-xs opacity-70">
                    {findTeamDivison(awayTeam.team.displayName)},{" "}
                    {typeof awayTeam.record !== "undefined" &&
                      awayTeam.record?.[0]?.displayValue}
                  </p>
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
                  className="w-14 object-cover"
                />
              </Link>

              <div></div>
              <p
                key={awayTeam.score}
                style={{
                  fontWeight: "700",
                  opacity:
                    Number(awayTeam.score) < Number(homeTeam.score) &&
                    data.gameInfo.status.type.state == "post"
                      ? "0.5"
                      : "1",
                }}
                className="ml-4 w-full text-4xl text-black"
              >
                {awayTeam.score}
              </p>
            </div>
            {isGameStarted ? (
              <p
                style={{
                  color: gameInfo.status.type.state == "in" ? "#d00" : "black",
                }}
                className="text-sm font-semibold"
              >
                {gameInfo.status.type.shortDetail}
              </p>
            ) : (
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
            )}

            <div className="flex flex-row items-center justify-center gap-3">
              <p
                key={homeTeam.score}
                style={{
                  fontWeight: "700",
                  opacity:
                    Number(homeTeam.score) < Number(awayTeam.score) &&
                    data.gameInfo.status.type.state == "post"
                      ? "0.5"
                      : "1",
                }}
                className="mr-4 w-full text-4xl text-black"
              >
                {homeTeam.score}
              </p>
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
                className="w-full "
                href={`/${league}/team/${homeTeam.team.id}/home`}
              >
                <div className="flex flex-col text-black opacity-80">
                  <p className="whitespace-nowrap font-bold">
                    {homeTeam.team.location + " " + homeTeam.team.name}
                  </p>
                  <p className="text-left text-xs opacity-70">
                    {findTeamDivison(homeTeam.team.displayName)},{" "}
                    {typeof homeTeam.record !== "undefined" &&
                      homeTeam.record?.[0]?.displayValue}
                  </p>
                </div>
              </Link>
              <div
                style={{ backgroundColor: "#" + homeTeam.team.color }}
                className="game-header-logo-wrapper game-header-logo-wrapper--right ml-10 md:right-0 xl:right-[150px]  2xl:right-[-150px]"
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
                  <p className="text-xs opacity-80">
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
                      <p className="text-xs font-semibold opacity-70">
                        {awayTeam.team.abbreviation}
                      </p>
                      <p className="whitespace-nowrap text-xs opacity-70">
                        {typeof awayTeam.record !== "undefined" &&
                          awayTeam.record?.[0]?.displayValue}
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

                <p
                  style={{
                    fontWeight: "700",
                    opacity:
                      Number(awayTeam.score) < Number(homeTeam.score) &&
                      data.gameInfo.status.type.state == "post"
                        ? "0.5"
                        : "1",
                  }}
                  className={`${
                    Number(awayTeam.score) > Number(homeTeam.score) &&
                    data.gameInfo.status.type.state == "post"
                      ? "away-winning-score-header"
                      : ""
                  } relative col-start-2 pr-2 text-2xl`}
                >
                  {awayTeam.score}
                </p>

                <p
                  style={{
                    color:
                      gameInfo.status.type.shortDetail == "Final"
                        ? "black"
                        : "#d50a0a",
                  }}
                  className="col-start-3 whitespace-nowrap pt-[4px] text-sm font-semibold opacity-90"
                >
                  {gameInfo.status.type.shortDetail}
                </p>

                <p
                  style={{
                    fontWeight: "700",
                    opacity:
                      Number(homeTeam.score) < Number(awayTeam.score) &&
                      data.gameInfo.status.type.state == "post"
                        ? "0.5"
                        : "1",
                  }}
                  className={`${
                    Number(homeTeam.score) > Number(awayTeam.score) &&
                    data.gameInfo.status.type.state == "post"
                      ? "home-winning-score-header"
                      : ""
                  } relative col-start-4 pl-2 text-2xl`}
                >
                  {homeTeam.score}
                </p>

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
                      className="w-8 object-contain"
                    />
                    <div className="flex flex-col">
                      <p className="text-xs font-semibold opacity-80">
                        {homeTeam.team.abbreviation}
                      </p>
                      <p className="whitespace-nowrap text-xs  opacity-80">
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
