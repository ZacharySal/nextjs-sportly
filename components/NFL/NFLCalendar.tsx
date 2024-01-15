import React from "react";
import { useState } from "react";

import { v4 as uuidv4 } from "uuid";
import { allNFLDates } from "@/lib/constants";

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

export default function NFLCalendar({
  currentYearIndex,
  setSelectedWeekInfo,
  selectedWeekInfo,
  setShowDateSelector,
  setCurrentYearIndex,
}: {
  currentYearIndex: any;
  selectedWeekInfo: any;
  setSelectedWeekInfo: any;
  setShowDateSelector: Function;
  setCurrentYearIndex: Function;
}) {
  const [currentCalendarYearIndex, setCurrentCalendarYearIndex] = useState(currentYearIndex);
  const calendarSelectedYear = allNFLDates[currentCalendarYearIndex].year;

  return (
    <div className="p-4 date-selector flex flex-col justify-center gap-1">
      <div className="w-full flex justify-between items-center mb-2">
        <p
          onClick={() =>
            setCurrentCalendarYearIndex(mod(currentCalendarYearIndex - 1, allNFLDates.length))
          }
          className="cursor-pointer"
          style={{ fontSize: "0.75rem", color: "#3e82d6", cursor: "pointer" }}
        >
          left angle icon
        </p>
        <p className="text-lg">{calendarSelectedYear}</p>
        <p
          onClick={() =>
            setCurrentCalendarYearIndex(mod(currentCalendarYearIndex + 1, allNFLDates.length))
          }
          className="cursor-pointer"
          style={{ fontSize: "0.75rem", color: "#3e82d6", cursor: "pointer" }}
        >
          right angle icon
        </p>
      </div>

      {allNFLDates.map((year: any) => (
        <div key={uuidv4()} className="flex flex-col gap-3 max-h-[20rem] overflow-y-scroll">
          {year.year == calendarSelectedYear &&
            year.weeksInYear.map((seasonType: any) => (
              <React.Fragment key={uuidv4()}>
                {seasonType.weeks.map((week: any) => (
                  <div
                    key={uuidv4()}
                    onClick={() => {
                      setSelectedWeekInfo({
                        year: year.year,
                        week: week.value,
                        type: seasonType.seasonType,
                      });
                      setShowDateSelector(false);
                      setCurrentYearIndex(currentCalendarYearIndex);
                    }}
                    style={{
                      opacity:
                        week.value == selectedWeekInfo.week &&
                        year.year == selectedWeekInfo.year &&
                        seasonType.seasonType == selectedWeekInfo.type
                          ? "1"
                          : "0.5",
                    }}
                    className="flex gap-5 justify-between cursor-pointer"
                  >
                    <p className="text-sm">{week.label}</p>
                    <p className="text-sm">{week.dateRange}</p>
                  </div>
                ))}
              </React.Fragment>
            ))}
        </div>
      ))}
      <p
        onClick={() => setShowDateSelector(false)}
        className="text-xs text-left w-full items-start justify-start flex text-blue-400 cursor-pointer"
      >
        CLOSE
      </p>
    </div>
  );
}
