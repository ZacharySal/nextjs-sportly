"use client";

import { Box, Typography, CircularProgress } from "@mui/material";
import { useState } from "react";
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
  const [nflSelectedWeek, setNflSelectedWeek] = useState({
    seasonValue: "",
    weekValue: "",
  });

  const [mlbSelectedDate, setMlbSelctedDate] = useState("");

  const isNfl = league === "nfl";
  const isMlb = league === "mlb";

  let key;

  if (isNfl) {
    key = `https://cdn.espn.com/core/nfl/scoreboard?xhr=1&limit=50&week=${nflSelectedWeek.weekValue}&seasontype=${nflSelectedWeek.seasonValue}`;
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
    console.log(newDate.replaceAll("-", ""));
    return newDate.replaceAll("-", "");
  }

  function nflWeekSelector() {
    return (
      <>
        <Box className="flex flex-col justify-center items-center mb-5">
          <Box
            id="style-1"
            className=" w-full flex  flex-row overflow-x-scroll bg-white drop-shadow-md"
          >
            {Object.entries(seasonWeeks).map(([index, season]: any) =>
              season.seasonWeeks.map((week: any) => {
                return (
                  <Box
                    key={week}
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
        </Box>
      </>
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
            {seasonWeeks.map((date: string) => (
              <div
                key={date}
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

  if (isLoading)
    return (
      <Box className="w-7/12">
        {isNfl && nflWeekSelector()}
        {isMlb && mlbDateSelector()}
        <Box className="w-full h-full flex justify-center items-center mt-20">
          <CircularProgress />
        </Box>
      </Box>
    );
  return (
    <Box className="w-7/12">
      {isNfl && nflWeekSelector()}
      {isMlb && mlbDateSelector()}
      <Box className="w-full h-full grid grid-cols-2 gap-5">
        {data.content.sbData.events.map((game: any) => (
          <ScoreCard
            key={league}
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
