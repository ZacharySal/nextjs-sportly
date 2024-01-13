import Image from "next/image";

type Play = {
  id: string;
  awayScore: number;
  homeScore: number;
  clock: {
    displayValue: string;
  };
  coordinate: {
    x: 31;
    y: 9;
  };
  participants: Array<any>;
  period: {
    number: 2;
    displayValue: string;
  };
  scoreValue: number;
  scoringPlay: false;
  sequenceNumber: string;
  shootingPlay: boolean;
  team: {
    id: string;
  };
  text: string;
  type: {
    id: string;
    text: string;
  };
  wallclock: string;
};

export default function RecentPlays({ data }: { data: any }) {
  const plays = data.gameData.plays;

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

    const prob = data.gameData.winprobability.find((probability: any) => probability.playId == id);

    if (prob.homeWinPercentage > 0.5) {
      return {
        team: data.homeTeam,
        chance: prob.homeWinPercentage,
      };
    } else
      return {
        team: data.awayTeam,
        chance: 1 - prob.homeWinPercentage,
      };
  }
  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-semibold text-sm pb-2 border-b border-b-[rgba(0,0,0,0.2)] border-dotted">
        Recent Plays
      </h1>
      <div className="flex-col mt-1">
        {plays
          .slice(plays.length - 6, plays.length - 1)
          .reverse()
          .map((play: Play, index: number) => {
            const winProbability = getWinProbabilityByPlayId(play.id);
            const team = getTeamById(play?.team?.id);

            if (index === 0) {
              // if play is shooting or scoring play we show athletes name, otherwise team logo
              const athlete = getAthleteById(play.participants?.[0]?.athlete.id);
              const displayedPicture = athlete
                ? athlete.headshot.href
                : team
                ? team.team.logos[0].href
                : null;
              return (
                <div
                  key={play.id}
                  className="grid py-2 px-1 gap-x-3 grid-rows-2 grid-cols-[auto_4fr_2fr] border-b border-[rgba(0,0,0,0.2)]"
                >
                  <div className="row-span-full flex items-center justify-center">
                    {displayedPicture && (
                      <Image
                        src={displayedPicture}
                        alt="player or team logo"
                        width={50}
                        height={50}
                        className="w-[50px] h-[50px] object-cover rounded-full"
                      />
                    )}
                  </div>

                  <div
                    style={{ fontWeight: play.scoringPlay ? "600" : "400" }}
                    className="text-left text-xs my-auto row-span-full"
                  >
                    <p className="font-[300]">
                      {play.clock.displayValue} - {play.period.displayValue}
                    </p>
                    <p>{play.text}</p>
                  </div>

                  <div className="row-start-1 col-start-3 flex gap-1 justify-end items-center">
                    <Image
                      src={winProbability?.team?.team?.logos[0].href}
                      alt="player or team logo"
                      width={winProbability?.team?.team?.logos[0].width}
                      height={winProbability?.team?.team?.logos[0].height}
                      className="w-[20px] object-contain rounded-full"
                    />
                    <p className="text-[12px]">
                      {Number(winProbability?.chance * 100).toFixed(1)}%
                    </p>
                  </div>

                  <p className="text-[12px] row-span-full row-start-2 col-start-3 flex justify-end items-end font-[400]">
                    {play.awayScore} - {play.homeScore}
                  </p>
                </div>
              );
            } else {
              return (
                <div
                  key={play.id}
                  style={{
                    fontWeight: play.scoringPlay ? "600" : "400",
                    backgroundColor: index % 2 !== 0 ? "hsl(0, 0%, 98%)" : "white",
                  }}
                  className="grid grid-cols-[25px_7fr_2fr] gap-x-3 py-2 px-1 border-b  border-[rgba(0,0,0,0.2)]"
                >
                  <p className="text-[11px] text-start my-auto">{play.clock.displayValue}</p>
                  <div className="flex gap-2">
                    {team && (
                      <Image
                        src={team.team.logos[0].href}
                        alt="team logo"
                        width={team.team.logos[0].width}
                        height={team.team.logos[0].height}
                        className="w-5 object-contain"
                      />
                    )}

                    <p className="text-[11px] text-start my-auto">{play.text}</p>
                  </div>
                  <p className="text-[12px] text-end my-auto">
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
