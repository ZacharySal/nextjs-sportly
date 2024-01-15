import React from "react";
import { v4 as uuidv4 } from "uuid";

function TeamStats({ stats }: { stats: any }) {
  return (
    <div className="w-full grid grid-cols-[1fr_1fr_1fr] md:flex md:flex-col md:justify-start md:items-center gap-2 md:gap-4">
      {Object.entries(stats).map(([statName, value]: [string, any]) => (
        <React.Fragment key={uuidv4()}>
          <div className=" w-full flex justify-center items-center flex-row p-2 md:p-3 bg-white gap-1 md:rounded-xl drop-shadow-md">
            <div className="flex flex-col justify-center gap-2 items-center">
              <p className="text-xs md:text-sm">{statName}</p>
              <p className="font-semibold text-xl md:text-3xl">{value.displayValue}</p>
              <p className="text-sm md:text-base opacity-70">{value.rankDisplayValue || "TBD"}</p>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

export default TeamStats;
