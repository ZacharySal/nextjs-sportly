"use client";

import { Box, Typography, CircularProgress, FormControl, Select, MenuItem, Divider } from "@mui/material";
import { useState } from "react";
import NewScoreCard from "../NewScoreCard";
import useSwr from "swr";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faCalendar } from "@fortawesome/free-solid-svg-icons";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const allYears = () => {
  let res = [];

  for (let i = 2003; i <= 2023; i++) {
    res.push(
      <MenuItem key={uuidv4()} value={`${i}`}>
        {i}
      </MenuItem>
    );
  }

  return res;
};

function convertNflDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

function getFullDate(date: string) {
  const newDate = new Date(date).toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return newDate;
}

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

/* WE ARE ONLY GETTING THE SELECTED WEEKS IN THIS COMPONENT AND RENDERING THE DATE SELECTOR, WE WILL MAKE A SEPERATE API CALL FOR THE SCORES*/

function NFLDateSelector({ seasonData }: { seasonData: any }) {
  let weeks = seasonData.seasonWeeks;

  let selectedWeek = seasonData.currentWeek;

  const [selectedYear, setYear] = useState(seasonData.currentYear);
  const [selectedType, setType] = useState(seasonData.currentType);
  const [currIndex, setCurrIndex] = useState(weeks.map((week: any) => week.value).indexOf(String(selectedWeek)));

  const { data, isLoading } = useSwr(
    `https://cdn.espn.com/core/nfl/scoreboard?xhr=1&limit=50&week=${selectedWeek}&seasontype=${selectedType}&year=${selectedYear}`,
    fetcher,
    { refreshInterval: 5000 }
  );

  if (!isLoading) {
    let newWeeks: any = [];
    for (let seasonType of data.content.sbData.leagues[0].calendar) {
      {
        if (seasonType.value == selectedType) {
          for (let week of seasonType.entries) {
            newWeeks.push(week);
          }
        }
      }
    }
    weeks = newWeeks;
  }

  function getDateElements() {
    const dateElements = [];
    for (let i = -1; i <= 1; i++) {
      dateElements.push(weeks[mod(currIndex + i, weeks.length)]);
    }
    return dateElements;
  }

  function nflWeekSelector() {
    return (
      <Box className="w-full p-2 bg-white mb-3 rounded-xl drop-shadow-md">
        <Typography className="mb-1 font-semibold text-xl opacity-80">NFL Scoreboard</Typography>
        <Box className="w-full h-auto flex flex-row justify-start gap-1 mt-2">
          <FormControl sx={{ fontSize: "8px" }} size="small">
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedYear}
              onChange={(e) => {
                e.preventDefault;
                setYear(e.target.value);
                selectedWeek = "1";
              }}
              style={{ height: 28 }}
            >
              {allYears()}
            </Select>
          </FormControl>

          <FormControl size="small">
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedType}
              onChange={(e) => {
                e.preventDefault;
                setType(e.target.value);
                selectedWeek = "1";
              }}
              style={{ height: 28 }}
            >
              <MenuItem value={1}>Preseason</MenuItem>
              <MenuItem value={2}>Regular</MenuItem>
              <MenuItem value={3}>Postseason</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box className="w-full grid grid-cols-[1fr_auto] items-center">
          <Box id="style-1" className="w-full flex flex-row overflow-x-auto justify-evenly items-center">
            <FontAwesomeIcon
              onClick={() => setCurrIndex((currentIndex: number) => (currentIndex - 3) % weeks.length)}
              icon={faAngleLeft}
              style={{ color: "black" }}
            />
            {getDateElements().map((week: any) => {
              return (
                <Box
                  key={uuidv4()}
                  onClick={() => (selectedWeek = week.value)}
                  sx={{ opacity: week.value == selectedWeek ? "1" : "0.3" }}
                  className="flex flex-col jusitfy-center items-center font-semibold flex-shrink-0 cursor-pointer p-2"
                >
                  <Typography className="text-sm font-[500]">{week.alternateLabel}</Typography>
                  <Box className="flex flex-row gap-1 justify-center items-center">
                    <Typography className="text-xs">{convertNflDate(week.startDate)}</Typography>
                    <Typography className="text-xs">-</Typography>
                    <Typography className="text-xs">{convertNflDate(week.endDate)}</Typography>
                  </Box>
                </Box>
              );
            })}
            <FontAwesomeIcon
              onClick={() => setCurrIndex((currentIndex: number) => (currentIndex + 3) % weeks.length)}
              icon={faAngleRight}
              style={{ color: "black" }}
            />
          </Box>
        </Box>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box className="w-full py-2 mt-[-0.5rem]">
        <Box className="w-full flex justify-center items-center">
          <CircularProgress />
        </Box>
      </Box>
    );
  } else {
    return <Box className="w-full py-2 mt-[-0.5rem]">{nflWeekSelector()}</Box>;
  }
}

export default NFLDateSelector;
