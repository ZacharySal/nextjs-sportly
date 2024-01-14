import Image from "next/image";
import { v4 } from "uuid";

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

function BasketballCourtSVG() {
  return (
    <svg
      fill="#000000"
      height="200px"
      width="200px"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 512 512"
      xmlSpace="preserve"
    >
      <g>
        <g>
          <path
            d="M0,79.175v353.65h512V79.175H0z M263.918,190.513c32.659,3.926,58.062,31.787,58.062,65.487
			c0,33.7-25.403,61.561-58.062,65.487V190.513z M15.835,148.085C71.817,152.154,116.124,198.998,116.124,256
			S71.817,359.847,15.835,363.915V148.085z M248.082,321.487c-32.659-3.926-58.062-31.787-58.062-65.487
			c0-33.7,25.403-61.561,58.062-65.487V321.487z M248.082,174.575c-41.411,3.996-73.897,38.984-73.897,81.425
			s32.486,77.428,73.897,81.425v79.565H15.835v-37.208c64.72-4.098,116.124-58.045,116.124-123.782S80.555,136.317,15.835,132.218
			V95.01h232.247V174.575z M496.165,363.916c-55.982-4.069-100.289-50.913-100.289-107.915c0-57.002,44.307-103.848,100.289-107.916
			V363.916z M496.165,132.218c-64.72,4.098-116.124,58.045-116.124,123.782s51.404,119.683,116.124,123.782v37.208H263.918v-79.565
			c41.411-3.996,73.897-38.984,73.897-81.425s-32.486-77.428-73.897-81.425V95.01h232.247V132.218z"
          />
        </g>
      </g>
    </svg>
  );
}
