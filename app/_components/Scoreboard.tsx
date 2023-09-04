"use client";

import { Box, Typography, CircularProgress } from "@mui/material";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import ScoreCard from "./ScoreCard";
import useSwr from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function Scoreboard({
  seasonWeeks,
  league,
}: {
  seasonWeeks: any;
  league: string;
}) {
  // const [storageLoading, setStorageLoading] = useState(true);

  // useEffect(() => {
  //   const newWeek = JSON.parse(
  //     window.localStorage.getItem("nflWeek") ||
  //       `{weekValue: "", seasonValue: ""}`
  //   );
  //   if (newWeek.weekValue) {
  //     setNflSelectedWeek(newWeek);
  //   }
  //   setStorageLoading(false);
  // }, []);

  // useEffect(() => {
  //   window.localStorage.setItem("nflWeek", JSON.stringify(nflSelectedWeek));
  // }, [nflSelectedWeek]);

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
    key = `https://cdn.espn.com/core/nfl/scoreboard?xhr=1&limit=50&week=${nflSelectedWeek.weekValue}&seasontype=${nflSelectedWeek.seasonValue}`;
  }

  if (isNba) {
    key = `https://cdn.espn.com/core/nba/scoreboard?xhr=1&limit=50&date=${nbaSelectedDate}`;
  }
  // get scoreboard on data for MLB
  if (isMlb) {
    key = `https://cdn.espn.com/core/mlb/scoreboard?xhr=1&limit=50&date=${mlbSelectedDate}`;
  }

  const { data, isLoading } = useSwr(key, fetcher);

  // function isWeekSelectedWeek(week: any) {
  //   if (selectedWeek) {
  //     if (
  //       selectedWeek.seasonValue === week.seasonValue &&
  //       selectedWeek.weekValue === week.weekValue
  //     ) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }

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
    const newDate = new Date(date).toLocaleDateString("en-CA");
    return newDate.replaceAll("-", "");
  }

  function nflWeekSelector() {
    return (
      <Box
        id="style-1"
        className="w-full flex flex-row overflow-x-auto bg-white drop-shadow-md mb-5"
      >
        {Object.entries(seasonWeeks).map(([index, season]: any) =>
          season.seasonWeeks.map((week: any) => {
            return (
              <Box
                key={week.weekValue + week.seasonValue}
                onClick={() => setNflSelectedWeek(week)}
                className="flex flex-col jusitfy-center items-center font-semibold flex-shrink-0 cursor-pointer gap-1 width-40 p-2"
              >
                <Typography className="text-sm font-semibold">
                  {week.weekLabel}
                </Typography>
                <Box className="flex flex-row gap-1 justify-center items-center">
                  <Typography className="text-xs">
                    {convertNflDate(week.weekStartDate)}
                  </Typography>
                  <Typography className="text-xs">-</Typography>
                  <Typography className="text-xs">
                    {convertNflDate(week.weekEndDate)}
                  </Typography>
                </Box>
              </Box>
            );
          })
        )}
      </Box>
    );
  }

  function mlbDateSelector() {
    return (
      <>
        <Box className="flex flex-col justify-center items-center mb-5">
          <Box
            id="style-1"
            className=" w-full flex  flex-row overflow-x-scroll bg-white drop-shadow-md gap-3"
          >
            {seasonWeeks.map((date: string, i: string) => (
              <div
                key={date + i}
                onClick={() => setMlbSelctedDate(getMlbCalendarDate(date))}
                className="flex flex-col jusitfy-center items-center font-semibold flex-shrink-0 cursor-pointer gap-1 width-40 p-2"
              >
                <Typography className="text-sm font-semibold">
                  {getMlbWeekday(date)}
                </Typography>
                <Box className="flex flex-row gap-1 justify-center items-center">
                  <Typography className="text-xs">
                    {getMlbDate(date)}
                  </Typography>
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
          <Box
            id="style-1"
            className=" w-full flex  flex-row overflow-x-scroll bg-white drop-shadow-md gap-3"
          >
            {seasonWeeks.map((date: string, i: string) => (
              <div
                key={date + i}
                onClick={() => setNbaSelectedDate(getMlbCalendarDate(date))}
                className="flex flex-col jusitfy-center items-center font-semibold flex-shrink-0 cursor-pointer gap-1 width-40 p-2"
              >
                <Typography className="text-sm font-semibold">
                  {getMlbWeekday(date)}
                </Typography>
                <Box className="flex flex-row gap-1 justify-center items-center">
                  <Typography className="text-xs">
                    {getMlbDate(date)}
                  </Typography>
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
      <Box className="w-full md:w-1/2">
        {isNfl && nflWeekSelector()}
        {isMlb && mlbDateSelector()}
        {isNba && nbaDateSelector()}
        <Box className="w-full h-full flex justify-center items-center mt-20">
          <CircularProgress />
        </Box>
      </Box>
    );
  return (
    <Box className="w-full md:w-1/2">
      {isNfl && nflWeekSelector()}
      {isMlb && mlbDateSelector()}
      {isNba && nbaDateSelector()}
      <Box className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-5">
        {data.content.sbData.events.map((game: any, i: string) => (
          <ScoreCard
            key={game + i}
            gameInfo={game}
            version={1}
            league={league}
            teamView={false}
          />
        ))}
      </Box>
    </Box>
  );
}

export default Scoreboard;
