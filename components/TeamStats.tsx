import React from "react";
import { v4 as uuidv4 } from "uuid";

function TeamStats({ stats }: { stats: any }) {
  return (
    <div className="grid w-full grid-cols-[1fr_1fr_1fr] gap-2 md:flex md:flex-col md:items-center md:justify-start md:gap-4">
      {Object.entries(stats).map(([statName, value]: [string, any]) => (
        <React.Fragment key={uuidv4()}>
          <div className=" flex w-full flex-row items-center justify-center gap-1 bg-white p-2 drop-shadow-md md:rounded-xl md:p-3">
            <div className="flex flex-col items-center justify-center gap-2">
              <p className="text-xs md:text-sm">{statName}</p>
              <p className="text-xl font-semibold md:text-3xl">
                {value.displayValue}
              </p>
              <p className="text-sm opacity-70 md:text-base">
                {value.rankDisplayValue || "TBD"}
              </p>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

export default TeamStats;
