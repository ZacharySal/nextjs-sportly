import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import React from "react";

export default function MLBScoringPlays({ data }: { data: any }) {
  const allScoringPlays = data.gameData.plays.filter(
    (play: any) => play.scoringPlay == true,
  );

  const finalScoringPlays = allScoringPlays.filter(
    (play: any) => play.type.text === "Play Result",
  );

  if (finalScoringPlays.length === 0) return null;

  function getTeamName(id: string) {
    return id === data.homeTeam.id
      ? data.homeTeam.team.name
      : data.awayTeam.team.name;
  }

  return (
    <div className="grid w-full grid-cols-[25px_5px_20px_auto_15px_15px] grid-rows-[20px_auto] items-center gap-x-3 gap-y-2 rounded-xl bg-white p-3 drop-shadow-md">
      <p className="row-1  col-span-6 text-sm font-semibold">Scoring Plays</p>
      {finalScoringPlays.map((play: any) => (
        <React.Fragment key={uuidv4()}>
          <Image
            src={`/mlb/${getTeamName(play.team.id).replace(" ", "").toLowerCase()}.png`}
            width={100}
            height={100}
            alt="home team logo"
            style={{ width: "25px" }}
            className="col-start-1 object-contain"
          />
          <p
            style={{
              paddingBottom: play.period.type === "Top" ? "15px" : "5px",
              borderColor:
                play.period.type === "Top"
                  ? "transparent transparent gray"
                  : "gray transparent transparent transparent",
            }}
            className="mlb-scoring-plays-p col-start-2 text-xs opacity-70"
          ></p>
          <p className="col-start-3 text-xs opacity-70">
            {play.period.displayValue.slice(0, 3)}
          </p>
          <p className="col-start-4 text-xs opacity-70">{play.text}</p>
          <p
            style={{
              fontWeight: play.team.id === data.awayTeam.id ? "700" : "400",
            }}
            className="col-start-5 text-xs opacity-70"
          >
            {play.awayScore}
          </p>
          <p
            style={{
              fontWeight: play.team.id === data.homeTeam.id ? "700" : "400",
            }}
            className="col-start-6 text-xs opacity-70"
          >
            {play.homeScore}
          </p>
        </React.Fragment>
      ))}
    </div>
  );
}
