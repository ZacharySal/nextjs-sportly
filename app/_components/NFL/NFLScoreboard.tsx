"use client";

import { Box, Typography, Divider, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import useSwr from "swr";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import useWindowDimensions from "../hooks/useWindowDimensions";
import React from "react";
import { allNFLDates } from "@/app/_lib/constants";
import CalendarMonthOutlined from "@mui/icons-material/CalendarMonthOutlined";
import NFLCalendar from "./NFLCalendar";
import ScoreCard from "../ScoreCard";
import Loading from "../Loading";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

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

function getDates(selectedYear: string) {
  let allWeeks: any = [];
  allNFLDates.map(
    (year: any) =>
      year.year === selectedYear &&
      year.weeksInYear.map((seasonType: any) =>
        seasonType.weeks.map((week: any) =>
          allWeeks.push({ ...week, seasonType: seasonType.seasonType })
        )
      )
  );

  return allWeeks;
}

function NFLScoreboard({ seasonData }: { seasonData: any }) {
  let groupedGames: any;

  const { height, width } = useWindowDimensions();

  const [showDateSelector, setShowDateSelector] = useState(false);

  const [selectedWeekInfo, setSelectedWeekInfo] = useState({
    year: seasonData.currentYear,
    type: seasonData.currentType,
    week: seasonData.currentWeek,
  });

  const [currentYearIndex, setCurrentYearIndex] = useState(
    allNFLDates.map((year) => year.year).indexOf(String(seasonData.currentYear))
  );

  const calendarSelectedYear = allNFLDates[currentYearIndex].year;

  const allDates = getDates(calendarSelectedYear);

  const [currentWeekIndex, setCurrentWeekIndex] = useState(
    allDates.findIndex(
      (week: any) => week.value == selectedWeekInfo.week && week.seasonType == selectedWeekInfo.type
    )
  );

  useEffect(() => {
    setCurrentWeekIndex(
      allDates.findIndex(
        (week: any) =>
          week.value == selectedWeekInfo.week && week.seasonType == selectedWeekInfo.type
      )
    );
  }, [selectedWeekInfo]); // eslint-disable-line react-hooks/exhaustive-deps

  function getDateElements() {
    const dateElements = [];
    const maxEls = Math.min(Math.floor(width / 115), 6);
    for (let i = -1; i <= maxEls - 2; i++) {
      dateElements.push(allDates[mod(currentWeekIndex + i, allDates.length)]);
    }
    return dateElements;
  }
  const dateElements = getDateElements();

  const key = `https://cdn.espn.com/core/nfl/scoreboard?xhr=1&limit=50&week=${selectedWeekInfo.week}&seasontype=${selectedWeekInfo.type}&year=${selectedWeekInfo.year}`;
  const { data, isLoading } = useSwr(key, fetcher, { refreshInterval: 30000 });

  if (!isLoading) {
    const ungroupedGames = data.content.sbData.events.map((game: any) => {
      return { ...game, date: getFullDate(game.date) };
    });
    //let gg = ungroupedGames.reverse();
    groupedGames = ungroupedGames.reduce(
      (entryMap: any, e: any) => entryMap.set(e.date, [...(entryMap.get(e.date) || []), e]),
      new Map()
    );
  }

  function nflWeekSelector() {
    return (
      <Box className="relative z-10 w-full p-2 md:p-4 bg-white mb-3 rounded-xl">
        <Typography className="mb-1 font-semibold text-xl md:text-2xl opacity-80">
          NFL Scoreboard
        </Typography>
        <Box className="pl-2 w-full flex gap-3 items-center">
          <Box className="w-full flex flex-row overflow-x-auto justify-between items-center">
            <FontAwesomeIcon
              onClick={() => setCurrentWeekIndex(mod(currentWeekIndex - 3, allDates.length))}
              icon={faAngleLeft}
              style={{ fontSize: "1rem", color: "#3e82d6", cursor: "pointer" }}
            />
            {dateElements.map((week: any) => {
              return (
                <Box
                  key={uuidv4()}
                  onClick={() => {
                    setSelectedWeekInfo({
                      ...selectedWeekInfo,
                      type: week.seasonType,
                      week: week.value,
                    });
                  }}
                  sx={{
                    opacity:
                      week.value == selectedWeekInfo.week &&
                      week.seasonType == selectedWeekInfo.type
                        ? "1"
                        : "0.3",
                  }}
                  className="flex flex-col jusitfy-center items-center font-semibold flex-shrink-0 cursor-pointer p-2"
                >
                  <Typography className="text-sm font-semibold">{week.label}</Typography>
                  <Typography className="text-xs">{week.dateRange}</Typography>
                </Box>
              );
            })}
            <FontAwesomeIcon
              onClick={() => setCurrentWeekIndex(mod(currentWeekIndex + 3, allDates.length))}
              icon={faAngleRight}
              style={{ fontSize: "1rem", color: "#3e82d6", cursor: "pointer" }}
            />
          </Box>
          <Paper elevation={1} className="relative bg-white p-3">
            <CalendarMonthOutlined
              sx={{ color: showDateSelector ? "#3e82d6" : "black" }}
              onClick={() => setShowDateSelector((showDateSelector) => !showDateSelector)}
            />
            {showDateSelector && (
              <NFLCalendar
                currentYearIndex={currentYearIndex}
                selectedWeekInfo={selectedWeekInfo}
                setSelectedWeekInfo={setSelectedWeekInfo}
                setShowDateSelector={setShowDateSelector}
                setCurrentYearIndex={setCurrentYearIndex}
              />
            )}
          </Paper>
        </Box>
      </Box>
    );
  }

  function printSortedGames() {
    let els: any[] = [];
    groupedGames.forEach((gamesOnDate: any, i: any) => {
      els.push(
        <Box key={uuidv4()} className="w-full grid bg-white p-2 pb-0 rounded-xl mb-2">
          <Typography className="opacity-80 font-semibold mt-1 text-start text-sm md:text-base mb-2">
            {i}
          </Typography>
          <Divider />
          {gamesOnDate.map((game: any, i: number) => (
            <Box key={uuidv4()}>
              <ScoreCard gameInfo={game} league={"NFL"} />
              {i !== gamesOnDate.length - 1 && <Divider />}
            </Box>
          ))}
        </Box>
      );
    });
    return els;
  }

  if (isLoading) {
    return (
      <Box className="w-full py-2 mt-[-0.5rem]">
        {nflWeekSelector()}
        <Loading />
      </Box>
    );
  } else if (!isLoading) {
    return (
      <Box className="w-full py-2 mt-[-0.5rem]">
        {nflWeekSelector()}
        {printSortedGames()}
      </Box>
    );
  }
}

export default NFLScoreboard;
