import Image from "next/image";
import { v4 } from "uuid";
import NBA3DCourtSVG from "./NBA3DCourtSVG";
import usePreferredColor from "./hooks/usePreferredColor";
import { NBAPlay } from "@/types";

export default function RecentPlays({
  data,
  isDesktopScreen,
}: {
  data: any;
  isDesktopScreen: boolean;
}) {
  const plays: Array<NBAPlay> = data.gameData.plays;

  let shootingPlays = plays.filter((play) => play.shootingPlay);

  const homeTeamShootingPlays = shootingPlays.filter(
    (play) => play.team.id === data.homeTeam.team.id,
  );

  const awayTeamShootingPlays = shootingPlays.filter(
    (play) => play.team.id === data.awayTeam.team.id,
  );

  console.log(plays);
  console.log(awayTeamShootingPlays);

  const { homeTeamColor, awayTeamColor } = usePreferredColor(data);

  function getAthleteById(id: string) {
    let selectedAthlete: any = undefined;
    data.gameData.boxscore.players.map((team: any) => {
      team.statistics[0].athletes.map((athlete: any) => {
        if (athlete.athlete.id == id) {
          selectedAthlete = athlete.athlete;
          return;
        }
      });
    });
    return selectedAthlete;
  }

  function getTeamById(id: string) {
    if (!id) return undefined;
    else if (id === data.homeTeam.id) return data.homeTeam;
    else if (id === data.awayTeam.id) return data.awayTeam;
    return undefined;
  }

  function getWinProbabilityByPlayId(id: string) {
    if (!id) return undefined;

    const prob = data?.gameData?.winprobability?.find(
      (probability: any) => probability.playId == id,
    );

    if (prob?.homeWinPercentage > 0.5) {
      return {
        team: data.homeTeam,
        chance: prob?.homeWinPercentage,
      };
    } else
      return {
        team: data.awayTeam,
        chance: 1 - prob?.homeWinPercentage,
      };
  }
  return (
    <div className="w-full rounded-md bg-white p-3">
      <h1 className="border-b border-dotted border-b-[rgba(0,0,0,0.2)] pb-2 text-[14px] font-semibold">
        Recent Plays
      </h1>
      <div className="mt-1 flex-col">
        {plays
          .slice(plays.length - 4, plays.length)
          .reverse()
          .map((play: NBAPlay, index: number) => {
            const winProbability = getWinProbabilityByPlayId(play.id);
            const team = getTeamById(play?.team?.id);

            if (index === 0) {
              // if play is shooting or scoring play we show athletes name, otherwise team logo
              const athlete = getAthleteById(
                play.participants?.[0]?.athlete.id,
              );
              const displayedPicture = athlete
                ? athlete?.headshot?.href
                : team
                  ? team?.team?.logos?.[0]?.href
                  : null;

              return (
                <div key={v4()}>
                  <div className="grid grid-cols-[auto_4fr_2fr] grid-rows-2 gap-x-4 border-[rgba(0,0,0,0.2)] px-1 py-2 md:py-3">
                    <div className="row-span-full flex items-center justify-center">
                      {displayedPicture && (
                        <Image
                          priority={true}
                          src={displayedPicture}
                          alt="player or team logo"
                          width={50}
                          height={50}
                          className="h-[50px] w-[50px] rounded-full object-cover"
                        />
                      )}
                    </div>

                    <div
                      style={{
                        fontWeight: play.scoringPlay ? "600" : "400",
                        color: "#2B2C2D",
                      }}
                      className="row-span-full my-auto flex flex-col gap-1 text-left text-xs"
                    >
                      <div className="flex items-center gap-1">
                        {displayedPicture && (
                          <Image
                            priority={true}
                            src={team?.team?.logos?.[0]?.href ?? "/default.png"}
                            alt="player or team logo"
                            width={team?.team?.logos?.[0]?.width ?? 100}
                            height={team?.team?.logos?.[0]?.width ?? 100}
                            className="w-[20px] rounded-full object-contain"
                          />
                        )}

                        <p className="font-[300]">
                          {play.clock.displayValue} - {play.period.displayValue}
                        </p>
                      </div>

                      <p className="text-[12px]">{play.text}</p>
                    </div>

                    <div className="col-start-3 row-start-1 flex items-center justify-end gap-1">
                      <Image
                        priority={true}
                        src={winProbability?.team?.team?.logos[0].href}
                        alt="player or team logo"
                        width={winProbability?.team?.team?.logos[0].width}
                        height={winProbability?.team?.team?.logos[0].height}
                        className="w-[20px] rounded-full object-contain"
                      />
                      <p className="text-[12px]">
                        {Number(winProbability?.chance * 100).toFixed(1)}%
                      </p>
                    </div>

                    <p className="b-2 col-start-3 row-span-full row-start-2 flex items-end justify-end text-[12px] font-[400]">
                      {play.awayScore} - {play.homeScore}
                    </p>
                  </div>
                  {/* <div className="relative my-5 h-full w-full sm:my-0 sm:py-5">
                    <Image
                      priority={true}
                      src={
                        data.homeTeam?.team?.logos?.[0]?.href ?? "/default.png"
                      }
                      alt="team logo"
                      width={data.homeTeam?.team?.logos?.[0]?.width ?? 100}
                      height={data.homeTeam?.team?.logos?.[0]?.height ?? 100}
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform:
                          "translateY(-50%) translateX(-50%) rotateX(40deg)",
                      }}
                      className="max-w-[12%] object-contain"
                    />
                    <div>
                      <NBA3DCourtSVG goalColor={`#${homeTeamColor}`} />
                    </div>
                    <div className="absolute left-0 top-0 h-full w-full">
                      <div
                        style={{ transform: "scaleY(-1)" }}
                        className="absolute left-0 top-0 h-full w-1/2 sm:top-5 sm:h-[75%]"
                      >
                        {awayTeamShootingPlays.map((play: any) => (
                          <div
                            key={v4()}
                            style={{
                              left: `calc(${play.text.includes("free throw") ? 20 : play.coordinate.y * 1.9}% + ${isDesktopScreen ? "32px" : "28px"})`,
                              top: `calc(${play.text.includes("free throw") ? 53 : play.coordinate.x * 2}% - ${isDesktopScreen ? "7px" : "5px"})`,
                              transform: "perspective(50em)",
                              zIndex: -2,
                            }}
                            className="absolute w-full"
                          >
                            <svg>
                              <ellipse
                                cx="9"
                                cy="9"
                                rx={isDesktopScreen ? "6" : "5"}
                                ry={isDesktopScreen ? "6" : "5"}
                                id="shot-undefined"
                                transform="skewX(3) scale(1.5 0.6)"
                                fill={
                                  play.scoringPlay
                                    ? `#${awayTeamColor}`
                                    : "none"
                                }
                                stroke={`#${awayTeamColor}`}
                                style={{
                                  fillOpacity: 1,
                                  strokeWidth: 1,
                                }}
                              ></ellipse>
                            </svg>
                          </div>
                        ))}
                      </div>
                      <div className="absolute left-0 top-0 h-full w-full">
                        <div
                          style={{
                            transform: "scaleX(-1)",
                          }}
                          className="absolute left-1/2 top-0 h-full w-1/2 sm:top-5 sm:h-[75%]"
                        >
                          <div
                            style={{
                              left: `calc(${23}% + ${isDesktopScreen ? "45px" : "39px"})`,
                              top: `calc(${44}% - 3px)`,
                              transform: "perspective(50em)",
                              zIndex: 0,
                            }}
                            className="absolute w-full"
                          >
                            <svg style={{ zIndex: "0" }}>
                              <ellipse
                                cx="9"
                                cy="9"
                                rx={isDesktopScreen ? "6" : "5"}
                                ry={isDesktopScreen ? "6" : "5"}
                                transform="skewX(3) scale(1.5 .6)"
                                id="shot-undefined"
                                fill={"red"}
                                stroke={`#${homeTeamColor}`}
                                style={{ fillOpacity: 1, strokeWidth: 1 }}
                              ></ellipse>
                            </svg>
                          </div>
                          {homeTeamShootingPlays.map((play: any) => (
                            <div
                              style={{
                                left: `calc(${play.coordinate.y * 1.9}% + 25px)`,
                                top: `calc(${play.coordinate.x * 1.9}% - 3px)`,
                                transform: "perspective(50em)",
                                zIndex: 0,
                              }}
                              className="absolute w-full"
                            >
                              <svg style={{ zIndex: "0" }}>
                                <ellipse
                                  cx="9"
                                  cy="9"
                                  rx={isDesktopScreen ? "6" : "5"}
                                  ry={isDesktopScreen ? "6" : "5"}
                                  transform="skewX(3) scale(1.5 .6)"
                                  id="shot-undefined"
                                  fill={
                                    play.scoringPlay
                                      ? `#${homeTeamColor}`
                                      : `none`
                                  }
                                  stroke={`#${homeTeamColor}`}
                                  style={{ fillOpacity: 1, strokeWidth: 1 }}
                                ></ellipse>
                              </svg>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
              );
            } else {
              return (
                <div
                  key={v4()}
                  style={{
                    fontWeight: play.scoringPlay ? "600" : "400",
                    backgroundColor:
                      index % 2 !== 0 ? "hsl(0, 0%, 98%)" : "white",
                    color: "#2B2C2D",
                    borderTop: index === 1 ? "1px solid rgba(0,0,0,0.2)" : "",
                  }}
                  className="grid grid-cols-[25px_7fr_2fr] gap-x-4 border-b border-[rgba(0,0,0,0.2)] px-1 py-2 md:py-3"
                >
                  <p className="my-auto text-start text-[11px]">
                    {play.clock.displayValue}
                  </p>
                  <div className="flex gap-3">
                    {team && (
                      <Image
                        priority={true}
                        src={team?.team?.logos?.[0]?.href ?? "/default.png"}
                        alt="team logo"
                        width={team?.team?.logos?.[0]?.width ?? 100}
                        height={team?.team?.logos?.[0]?.height ?? 100}
                        className="w-5 object-contain"
                      />
                    )}

                    <p className="my-auto text-start text-[11px]">
                      {play.text}
                    </p>
                  </div>
                  <p className="my-auto text-end text-[11px] md:text-[13px]">
                    {play.awayScore} - {play.homeScore}
                  </p>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
}
