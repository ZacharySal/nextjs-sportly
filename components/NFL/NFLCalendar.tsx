import { allNFLDates } from "@/lib/constants";
import { mod } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function NFLCalendar({
  currentYearIndex,
  selectedWeekInfo,
  setShowDateSelector,
}: {
  currentYearIndex: any;
  selectedWeekInfo: any;
  setShowDateSelector: Function;
}) {
  const [currentCalendarYearIndex, setCurrentCalendarYearIndex] =
    useState(currentYearIndex);
  const calendarSelectedYear = allNFLDates[currentCalendarYearIndex]?.year;

  const nflDates = allNFLDates.find(
    (year) => year.year === calendarSelectedYear,
  );

  return (
    <div className="date-selector top-10 z-50 flex flex-col justify-center gap-1 bg-white p-4 shadow-2xl">
      <div className="mb-2 flex w-full items-center justify-between">
        <Image
          alt="left icon"
          src="/icons/chevron-left.svg"
          width="25"
          height="25"
          style={{ fontSize: "0.75rem", color: "black", cursor: "pointer" }}
          onClick={() =>
            setCurrentCalendarYearIndex(
              mod(currentCalendarYearIndex - 1, allNFLDates.length),
            )
          }
        />

        <p className="text-lg">{calendarSelectedYear}</p>
        <Image
          onClick={() =>
            setCurrentCalendarYearIndex(
              mod(currentCalendarYearIndex + 1, allNFLDates.length),
            )
          }
          width="25"
          height="25"
          alt="right icon"
          src="/icons/chevron-right.svg"
          style={{ fontSize: "0.75rem", color: "black", cursor: "pointer" }}
        />
      </div>

      <div
        key={uuidv4()}
        className="flex max-h-[20rem] min-w-full flex-col gap-3 overflow-y-scroll px-3"
      >
        {nflDates?.weeksInYear.map((seasonType: any) => (
          <React.Fragment key={uuidv4()}>
            {seasonType.weeks.map((week: any) => (
              <Link
                href={`/nfl/${nflDates.year}-${seasonType.seasonType}-${week?.value}`}
                key={uuidv4()}
                style={{
                  opacity:
                    week?.value == selectedWeekInfo.week &&
                    nflDates.year == selectedWeekInfo.year &&
                    seasonType.seasonType == selectedWeekInfo.type
                      ? "1"
                      : "0.5",
                }}
                className="flex min-w-full cursor-pointer justify-between"
              >
                <p className="text-sm">{week?.label}</p>
                <p className="text-sm">{week?.dateRange}</p>
              </Link>
            ))}
          </React.Fragment>
        ))}
      </div>

      <p
        onClick={() => setShowDateSelector(false)}
        className="mt-2 flex w-full cursor-pointer items-start justify-end text-left text-sm font-semibold text-blue-400 hover:underline"
      >
        CLOSE
      </p>
    </div>
  );
}
