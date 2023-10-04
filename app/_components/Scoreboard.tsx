"use client";

import { Box, Typography, CircularProgress, FormControl, InputLabel, Select, MenuItem, Divider } from "@mui/material";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import ScoreCard from "./ScoreCard";
import useSwr from "swr";
import { v4 as uuidv4 } from "uuid";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function Scoreboard({
  seasonWeeks,
  league,
  events = null,
  year = null,
  type = null,
  setType = null,
  setYear = null,
}: {
  seasonWeeks: any;
  league: string;
  events: any;
  year: any;
  type: any;
  setType: any;
  setYear: any;
}) {
  const [mlbSelectedDate, setMlbSelctedDate] = useState("");
  const [nbaSelectedDate, setNbaSelectedDate] = useState("");
  const [nflSelectedWeek, setNflSelectedWeek] = useState<any>({
    weekValue: "",
    seasonValue: "",
  });

  const isNfl = league === "nfl";
  const isMlb = league === "mlb";
  const isNba = league === "nba";

  let key;

  if (isNfl) {
    key = `https://cdn.espn.com/core/nfl/scoreboard?xhr=1&limit=50&week=${nflSelectedWeek.value}&seasontype=${type}&year=${year}`;
  }
  if (isNba) {
    key = `https://cdn.espn.com/core/nba/scoreboard?xhr=1&limit=50&date=${nbaSelectedDate.replaceAll("/", "")}`;
  }
  // get scoreboard on data for MLB
  if (isMlb) {
    key = `https://cdn.espn.com/core/mlb/scoreboard?xhr=1&limit=50&date=${mlbSelectedDate.replaceAll("/", "")}`;
  }

  const { data, isLoading } = useSwr(key, fetcher, { refreshInterval: 5000 });

  if (!isLoading) {
    console.log(key);
  }

  const allYears = () => {
    let res = [];

    for (let i = 2016; i <= 2023; i++) {
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

  function getMlbWeekday(date: string) {
    return new Date(date).toLocaleDateString(undefined, {
      weekday: "short",
    });
  }

  function getMlbDate(date: string) {
    return new Date(date).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
  }

  function getMlbCalendarDate(date: string) {
    const test = date.substring(0, date.indexOf("T"));
    return test.replaceAll("-", "");
  }

  function nflWeekSelector() {
    return (
      <>
        <Box className="p-2 bg-white mb-5 rounded-xl drop-shadow-md">
          <Typography className="mb-1 font-semibold opacity-80 text-sm">NFL Scoreboard</Typography>
          <Box className="w-full h-auto flex flex-row justify-start gap-1 mt-2">
            <FormControl sx={{ fontSize: "8px" }} size="small">
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={year}
                onChange={(e) => {
                  e.preventDefault;
                  setYear(e.target.value);
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
                value={type}
                onChange={(e) => {
                  e.preventDefault;
                  setType(e.target.value);
                }}
                style={{ height: 28 }}
              >
                <MenuItem value={1}>Preseason</MenuItem>
                <MenuItem value={2}>Regular</MenuItem>
                <MenuItem value={3}>Postseason</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box
            id="style-1"
            className="max-w-full flex flex-row border border-black border-opacity-20 rounded-md mt-2 border-radius-md overflow-x-auto"
          >
            {seasonWeeks.map((week: any) => {
              return (
                <Box
                  key={uuidv4()}
                  onClick={() => setNflSelectedWeek(week)}
                  className="flex flex-col jusitfy-center items-center font-semibold flex-shrink-0 cursor-pointer gap-1 width-40 p-2"
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
          </Box>
        </Box>
      </>
    );
  }

  function mlbDateSelector() {
    return (
      <>
        <Box className="w-full flex flex-col justify-center items-center mb-5">
          <Box id="style-1" className="max-w-full flex flex-row overflow-x-auto bg-white drop-shadow-md gap-3">
            {seasonWeeks.map((date: string, i: string) => (
              <div
                key={uuidv4()}
                onClick={() => setMlbSelctedDate(getMlbCalendarDate(date))}
                className="flex flex-col jusitfy-center items-center font-semibold flex-shrink-0 cursor-pointer gap-1 width-40 p-2"
              >
                <Typography className="text-sm font-semibold">{getMlbWeekday(date)}</Typography>
                <Box className="flex flex-row gap-1 justify-center items-center">
                  <Typography className="text-xs">{getMlbDate(date)}</Typography>
                </Box>
              </div>
            ))}
          </Box>
        </Box>
      </>
    );
  }

  function nbaDateSelector() {
    return (
      <>
        <Box className="flex flex-col justify-center items-center mb-5">
          <Box id="style-1" className="max-w-full flex  flex-row overflow-x-auto bg-white drop-shadow-md gap-3">
            {seasonWeeks.map((date: string, i: string) => (
              <div
                key={uuidv4()}
                onClick={() => setNbaSelectedDate(getMlbCalendarDate(date))}
                className="flex flex-col jusitfy-center items-center font-semibold flex-shrink-0 cursor-pointer gap-1 width-40 p-2"
              >
                <Typography className="text-sm font-semibold">{getMlbWeekday(date)}</Typography>
                <Box className="flex flex-row gap-1 justify-center items-center">
                  <Typography className="text-xs">{getMlbDate(date)}</Typography>
                </Box>
              </div>
            ))}
          </Box>
        </Box>
      </>
    );
  }

  if (isLoading)
    return (
      <Box className="max-w-full py-2">
        {isNfl && nflWeekSelector()}
        {isMlb && mlbDateSelector()}
        {isNba && nbaDateSelector()}
        <Box className="w-full flex justify-center items-center">
          <CircularProgress />
        </Box>
      </Box>
    );
  return (
    <Box className="max-w-full py-2">
      {isNfl && nflWeekSelector()}
      {isMlb && mlbDateSelector()}
      {isNba && nbaDateSelector()}
      <Box className="w-full grid grid-cols-2 gap-3">
        {data.content.sbData.events.map((game: any, i: string) => (
          <ScoreCard key={uuidv4()} gameInfo={game} version={1} league={league} teamView={false} />
        ))}
      </Box>
    </Box>
  );
}

export default Scoreboard;
