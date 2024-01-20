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
  const [currentCalendarYearIndex, setCurrentCalendarYearIndex] =
    useState(currentYearIndex);
  const calendarSelectedYear = allNFLDates[currentCalendarYearIndex].year;

  return (
    <div className="date-selector flex flex-col justify-center gap-1 p-4">
      <div className="mb-2 flex w-full items-center justify-between">
        <p
          onClick={() =>
            setCurrentCalendarYearIndex(
              mod(currentCalendarYearIndex - 1, allNFLDates.length),
            )
          }
          className="cursor-pointer"
          style={{ fontSize: "0.75rem", color: "#3e82d6", cursor: "pointer" }}
        >
          left angle icon
        </p>
        <p className="text-lg">{calendarSelectedYear}</p>
        <p
          onClick={() =>
            setCurrentCalendarYearIndex(
              mod(currentCalendarYearIndex + 1, allNFLDates.length),
            )
          }
          className="cursor-pointer"
          style={{ fontSize: "0.75rem", color: "#3e82d6", cursor: "pointer" }}
        >
          right angle icon
        </p>
      </div>

      {allNFLDates.map((year: any) => (
        <div
          key={uuidv4()}
          className="flex max-h-[20rem] flex-col gap-3 overflow-y-scroll"
        >
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
                    className="flex cursor-pointer justify-between gap-5"
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
        className="flex w-full cursor-pointer items-start justify-start text-left text-xs text-blue-400"
      >
        CLOSE
      </p>
    </div>
  );
}
