import React from "react";
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight, faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";
import { allNFLDates } from "@/app/_lib/constants";

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
    <Box className="p-4 date-selector flex flex-col justify-center gap-2">
      <Box className="w-full flex justify-between items-center mb-2">
        <FontAwesomeIcon
          onClick={() => setCurrentCalendarYearIndex(mod(currentCalendarYearIndex - 1, allNFLDates.length))}
          className="cursor-pointer"
          icon={faAnglesLeft}
          style={{ fontSize: "0.75rem", color: "#3e82d6", cursor: "pointer" }}
        />
        <Typography className="text-lg">{calendarSelectedYear}</Typography>
        <FontAwesomeIcon
          onClick={() => setCurrentCalendarYearIndex(mod(currentCalendarYearIndex + 1, allNFLDates.length))}
          className="cursor-pointer"
          icon={faAnglesRight}
          style={{ fontSize: "0.75rem", color: "#3e82d6", cursor: "pointer" }}
        />
      </Box>

      {allNFLDates.map((year: any) => (
        <Box key={uuidv4()} className="flex flex-col gap-3 max-h-[20rem] overflow-y-scroll">
          {year.year == calendarSelectedYear &&
            year.weeksInYear.map((seasonType: any) => (
              <React.Fragment key={uuidv4()}>
                {seasonType.weeks.map((week: any) => (
                  <Box
                    key={uuidv4()}
                    onClick={() => {
                      setSelectedWeekInfo({ year: year.year, week: week.value, type: seasonType.seasonType });
                      setShowDateSelector(false);
                      setCurrentYearIndex(currentCalendarYearIndex);
                    }}
                    sx={{
                      opacity:
                        week.value == selectedWeekInfo.week &&
                        year.year == selectedWeekInfo.year &&
                        seasonType.seasonType == selectedWeekInfo.type
                          ? "1"
                          : "0.5",
                    }}
                    className="flex gap-5 justify-between cursor-pointer"
                  >
                    <Typography className="text-sm">{week.label}</Typography>
                    <Typography className="text-sm">{week.dateRange}</Typography>
                  </Box>
                ))}
              </React.Fragment>
            ))}
        </Box>
      ))}
      <Typography
        onClick={() => setShowDateSelector(false)}
        className="text-xs text-left w-full items-start justify-start flex text-blue-400 cursor-pointer mt-2"
      >
        CLOSE
      </Typography>
    </Box>
  );
}
