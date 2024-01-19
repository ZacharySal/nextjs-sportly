import Image from "next/image";
import usePreferredColor from "./hooks/usePreferredColor";
import { GameData } from "@/types";

export default function MatchupPredictor({ data, league }: { data: GameData; league: string }) {
  const awayTeamChance = Number(data?.gameData?.predictor?.awayTeam?.gameProjection).toFixed(1);
  const homeTeamChance = Number(100 - Number(awayTeamChance)).toFixed(1);

  const { homeTeamColor, awayTeamColor } = usePreferredColor(data);

  if (typeof data?.gameData?.predictor?.awayTeam?.gameProjection === "undefined") return null;
  if (typeof data.gameData.predictor === "undefined") return null;

  return (
    <div className="w-full bg-white rounded-xl p-3 flex flex-col gap-4">
      <p className="font-semibold text-[14px] border-b border-dotted pb-3 border-b-[rgba(0,0,0,0.2)]">
        Matchup Predictor
      </p>
      <div
        data-awayteamchance={awayTeamChance + "%"}
        data-hometeamchance={homeTeamChance + "%"}
        className="matchup-predictor relative w-full flex items-center justify-center"
      >
        <svg height="200" width="200" viewBox="0 0 200 200">
          <circle r="100" cx="100" cy="100" fill={`#${awayTeamColor}`} />
          <circle
            r="50"
            cx="100"
            cy="100"
            stroke={`#${homeTeamColor}`}
            strokeWidth="100"
            strokeDasharray={`calc(${homeTeamChance} * 314.16 / 100) 314.16`}
            transform="rotate(-90) translate(-200)"
          />
          <circle r="80" cx="100" cy="100" fill="white" />
        </svg>
        <div className="bg-white p-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex gap-5 matchup-predictor-teams-container">
            <Image
              width={data.awayTeam.team.logos[0].width}
              height={data.awayTeam.team.logos[0].height}
              alt="away team"
              className="w-11 object-contain"
              src={data.awayTeam.team.logos[0].href}
            />
            <Image
              width={data.homeTeam.team.logos[0].width}
              height={data.homeTeam.team.logos[0].height}
              alt="home team"
              className="w-11 object-contain"
              src={data.homeTeam.team.logos[0].href}
            />
          </div>
        </div>
      </div>
      <p className="text-center text-xs opacity-60 italic mt-2">According to ESPN Analytics</p>
    </div>
  );
}
