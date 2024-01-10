import useMediaQuery from "@mui/material/useMediaQuery";

import Image from "next/image";
import { mlbDivisonTeams, nbaDivisionTeams, nflDivisonTeams } from "../_lib/constants";
import Link from "next/link";

export default function GameHeader({ league, data }: { league: string; data: any }) {
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");
  const homeTeam = data.header.competitions[0].competitors[0];
  const awayTeam = data.header.competitions[0].competitors[1];
  const gameInfo = data.header.competitions[0];
  const isGameStarted =
    league === "nfl" ? (data.drives ? true : false) : data.plays?.length > 0 ? true : false;
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

  function isDefined(value: any) {
    return typeof value !== "undefined";
  }

  return (
    <>
      {isDesktopScreen ? (
        <div className="bg-white w-full flex justify-center border-b border-[rgba(0,0,0,0.2)] z-40 sticky top-[2.75rem]">
          <div className="w-full 2xl:w-2/5 h-28 flex-row flex justify-center items-center gap-10 relative">
            <div className="flex flex-row justify-center items-center gap-3">
              <div className="flex flex-col text-black">
                <div
                  style={{ backgroundColor: "#" + awayTeam.team.color }}
                  className="mr-10 game-header-logo-wrapper game-header-logo-wrapper--left md:left-0 xl:left-[150px] 2xl:left-[-150px]"
                >
                  <Image
                    src={awayTeam.team.logos[3].href}
                    width={awayTeam.team.logos[3].width}
                    height={awayTeam.team.logos[3].height}
                    alt="away team logo"
                    className="w-44 object-cover game-header-logo--left"
                  />
                </div>
                <Link className="w-full " href={`/${league}/team/${awayTeam.team.id}/home`}>
                  <p className="text font-bold whitespace-nowrap">
                    {awayTeam.team.location + " " + awayTeam.team.name}
                  </p>
                  <p className="text-xs opacity-70 text-right">
                    {findTeamDivison(awayTeam.team.displayName)},{" "}
                    {typeof awayTeam.record !== "undefined" && awayTeam.record[0].displayValue}
                  </p>
                </Link>
              </div>
              <Link className="w-full " href={`/${league}/team/${awayTeam.team.id}/home`}>
                <Image
                  src={awayTeam.team.logos[0].href}
                  width={awayTeam.team.logos[0].width}
                  height={awayTeam.team.logos[0].height}
                  alt="away team logo"
                  className="w-14 object-cover"
                />
              </Link>

              <p
                style={{
                  fontWeight: "700",
                  opacity: Number(awayTeam.score) > Number(homeTeam.score) ? "0.8" : "0.5",
                }}
                className="w-full text-black text-4xl ml-4"
              >
                {awayTeam.score}
              </p>
            </div>
            {isGameStarted ? (
              <p className="text-sm font-semibold">{gameInfo.status.type.shortDetail}</p>
            ) : (
              <div>
                <p className="text-black text-center text-2xl opacity-70 max-w-[20rem]">
                  <span className="font-bold opacity-100">Scheduled</span> <br />
                  {gameInfo.status.type.shortDetail}
                </p>
              </div>
            )}

            <div className="flex flex-row justify-center items-center gap-3">
              <p
                style={{
                  fontWeight: "700",
                  opacity: Number(homeTeam.score) > Number(awayTeam.score) ? "0.8" : "0.5",
                }}
                className="w-full text-black text-4xl mr-4"
              >
                {homeTeam.score}
              </p>
              <Link className="w-full " href={`/${league}/team/${homeTeam.team.id}/home`}>
                <Image
                  src={homeTeam.team.logos[0].href}
                  width={homeTeam.team.logos[0].width}
                  height={homeTeam.team.logos[0].height}
                  alt="home team logo"
                  className="w-14 object-cover"
                />
              </Link>
              <Link className="w-full " href={`/${league}/team/${homeTeam.team.id}/home`}>
                <div className="flex flex-col text-black opacity-80">
                  <p className="font-bold whitespace-nowrap">
                    {homeTeam.team.location + " " + homeTeam.team.name}
                  </p>
                  <p className="text-xs opacity-70 text-left">
                    {findTeamDivison(homeTeam.team.displayName)},{" "}
                    {typeof homeTeam.record !== "undefined" && homeTeam.record[0].displayValue}
                  </p>
                </div>
              </Link>
              <div
                style={{ backgroundColor: "#" + homeTeam.team.color }}
                className="ml-10 game-header-logo-wrapper game-header-logo-wrapper--right md:right-0 xl:right-[150px]  2xl:right-[-150px]"
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
                className="w-full h-20 border-b border-[rgba(0,0,0,0.2)] place-items-center justify-center gap-x-6 text-center text-black px-3 grid grid-rows-1 drop-shadow-sm sticky top-[2.5rem] z-40"
              >
                {/*Away Team Logo, abv, and record*/}
                <Link
                  className="w-full col-start-1"
                  href={`/${league}/team/${awayTeam.team.id}/home`}
                >
                  <div className="flex flex-row gap-1 justify-center items-center">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm opacity-80 font-semibold">
                        {awayTeam.team.abbreviation}
                      </p>
                      <p className="text-xs opacity-80 whitespace-nowrap">
                        {awayTeam.record[0]?.displayValue || "0-0"}
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
                  <p className="text-xs opacity-80">
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
                  <div className="flex flex-row gap-1 justify-center items-center">
                    <Image
                      src={homeTeam.team.logos[0].href}
                      width={homeTeam.team.logos[0].width}
                      height={homeTeam.team.logos[0].height}
                      alt="home team logo"
                      className="w-8 object-contain"
                    />
                    <div className="flex flex-col gap-1">
                      <p className="text-sm opacity-80 font-semibold">
                        {homeTeam.team.abbreviation}
                      </p>
                      <p className="text-xs opacity-80 whitespace-nowrap">
                        {homeTeam.record[0]?.displayValue || "0-0"}
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
                className="w-full h-20 px-3 py-10 border-b border-[rgba(0,0,0,0.2)] place-items-center text-center text-black grid grid-cols-5 grid-rows-1 drop-shadow-sm sticky top-[2.5rem] z-40"
              >
                {/*Home Team Logo, abv, and record*/}
                <Link
                  className="w-full col-start-1"
                  href={`/${league}/team/${awayTeam.team.id}/home`}
                >
                  <div className="flex flex-row gap-1 items-center justify-end">
                    <div className="flex flex-col">
                      <p className="text-xs opacity-70 font-semibold">
                        {awayTeam.team.abbreviation}
                      </p>
                      <p className="text-xs opacity-70 whitespace-nowrap">
                        {typeof awayTeam.record !== "undefined" && awayTeam.record[0].displayValue}
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
                    opacity: Number(awayTeam.score) > Number(homeTeam.score) ? "1" : "0.5",
                  }}
                  className={`${
                    Number(awayTeam.score) > Number(homeTeam.score)
                      ? "away-winning-score-header"
                      : ""
                  } pr-4 relative text-2xl col-start-2`}
                >
                  {awayTeam.score}
                </p>

                <p
                  style={{
                    color: gameInfo.status.type.shortDetail == "Final" ? "black" : "#d50a0a",
                  }}
                  className="opacity-90 whitespace-nowrap text-sm font-semibold col-start-3"
                >
                  {gameInfo.status.type.shortDetail}
                </p>

                <p
                  style={{
                    fontWeight: "700",
                    opacity: Number(homeTeam.score) > Number(awayTeam.score) ? "1" : "0.5",
                  }}
                  className={`${
                    Number(homeTeam.score) > Number(awayTeam.score)
                      ? "home-winning-score-header"
                      : ""
                  } relative pl-4 text-2xl col-start-4`}
                >
                  {homeTeam.score}
                </p>

                <Link className="w-full " href={`/${league}/team/${homeTeam.team.id}/home`}>
                  <div className="flex flex-row gap-1 items-center col-start-5 text-black">
                    <Image
                      src={homeTeam.team.logos[0].href}
                      width={homeTeam.team.logos[0].width}
                      height={homeTeam.team.logos[0].height}
                      alt="home team logo"
                      className="w-8 object-contain"
                    />
                    <div className="flex flex-col">
                      <p className="text-xs opacity-80 font-semibold">
                        {homeTeam.team.abbreviation}
                      </p>
                      <p className="text-xs opacity-80  whitespace-nowrap">
                        {typeof homeTeam.record !== "undefined" && homeTeam.record[0].displayValue}
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
