import { useState } from "react";
import NFLGameDrives from "./NFLGameDrives";
import NFLScoringPlays from "./NFLScoringPlays";

export default function NFLPlayByPlay({ data }: { data: any }) {
  const [userSelection, setUserSelection] = useState("scoringPlays");

  return (
    <div className="w-full rounded-xl bg-white px-2">
      <div
        style={{ width: "clamp(100px, 300px, 600px)" }}
        className="mx-auto mb-2 mt-5 flex justify-around gap-3 rounded-2xl bg-[#edeef09c] p-2 text-center"
      >
        <div
          onClick={() => setUserSelection("scoringPlays")}
          className={`${
            userSelection === "scoringPlays" && "button-active"
          } h-full flex-grow cursor-pointer text-xs font-semibold`}
        >
          Scoring Plays
        </div>
        <div
          onClick={() => setUserSelection("allPlays")}
          className={`${
            userSelection === "allPlays" && "button-active"
          } h-full flex-grow cursor-pointer text-xs font-semibold`}
        >
          All Plays
        </div>
      </div>

      {userSelection === "scoringPlays" && <NFLScoringPlays data={data} />}
      {userSelection === "allPlays" && <NFLGameDrives data={data} />}
    </div>
  );
}
