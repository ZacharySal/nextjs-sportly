import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import React from "react";

export default function MLBScoringPlays({ data }: { data: any }) {
  const allScoringPlays = data.gameData.plays.filter((play: any) => play.scoringPlay == true);

  const finalScoringPlays = allScoringPlays.filter((play: any) => play.type.text === "Play Result");

  if (finalScoringPlays.length === 0) return null;

  function getTeamName(id: string) {
    return id === data.homeTeam.id ? data.homeTeam.team.name : data.awayTeam.team.name;
  }

  return (
    <div className="w-full grid grid-cols-[25px_5px_20px_auto_15px_15px] grid-rows-[20px_auto] gap-x-3 gap-y-2 bg-white p-3 drop-shadow-md items-center rounded-xl">
      <p className="text-sm  font-semibold row-1 col-span-6">Scoring Plays</p>
      {finalScoringPlays.map((play: any) => (
        <React.Fragment key={uuidv4()}>
          <Image
            src={`/mlb/${getTeamName(play.team.id).replace(" ", "").toLowerCase()}.png`}
            width={100}
            height={100}
            alt="home team logo"
            style={{ width: "25px" }}
            className="object-contain col-start-1"
          />
          <p
            style={{
              paddingBottom: play.period.type === "Top" ? "15px" : "5px",
              borderColor:
                play.period.type === "Top"
                  ? "transparent transparent gray"
                  : "gray transparent transparent transparent",
            }}
            className="col-start-2 opacity-70 text-xs mlb-scoring-plays-p"
          ></p>
          <p className="col-start-3 opacity-70 text-xs">{play.period.displayValue.slice(0, 3)}</p>
          <p className="col-start-4 opacity-70 text-xs">{play.text}</p>
          <p
            style={{
              fontWeight: play.team.id === data.awayTeam.id ? "700" : "400",
            }}
            className="col-start-5 opacity-70 text-xs"
          >
            {play.awayScore}
          </p>
          <p
            style={{
              fontWeight: play.team.id === data.homeTeam.id ? "700" : "400",
            }}
            className="col-start-6 opacity-70 text-xs"
          >
            {play.homeScore}
          </p>
        </React.Fragment>
      ))}
    </div>
  );
}
