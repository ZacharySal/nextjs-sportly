"use client";

// import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import useSwr from "swr";
import { v4 as uuidv4 } from "uuid";
import useWindowDimensions from "../hooks/useWindowDimensions";
import React from "react";
import { allNFLDates } from "@/app/_lib/constants";
// import CalendarMonthOutlined from "@mui/icons-material/CalendarMonthOutlined";
import Image from "next/image";
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

function NFLScoreboard({ initialScoreData }: { initialScoreData: any }) {
  let groupedGames: any;

  const { height, width } = useWindowDimensions();

  const [showDateSelector, setShowDateSelector] = useState(false);

  const currentWeekInfo = {
    year: initialScoreData.content.sbData.season.year,
    type: initialScoreData.content.sbData.season.type,
    week: initialScoreData.content.sbData.week.number,
  };

  const [selectedWeekInfo, setSelectedWeekInfo] = useState(currentWeekInfo);

  const [currentYearIndex, setCurrentYearIndex] = useState(
    allNFLDates.map((year) => year.year).indexOf(String(currentWeekInfo.year))
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

  const { data: newScoreData, isLoading } = useSwr(
    selectedWeekInfo == currentWeekInfo ? null : key,
    fetcher,
    {
      refreshInterval: 30000,
    }
  );

  const data = newScoreData ?? initialScoreData;

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
      <div className="relative z-10 w-full p-2 md:p-4 bg-white mb-3 rounded-xl">
        <p className="mb-1 font-semibold text-xl md:text-2xl opacity-80">NFL Scoreboard</p>
        <div className="pl-2 w-full flex gap-3 items-center">
          <div className="w-full flex flex-row overflow-x-auto justify-between items-center">
            <Image
              alt="left icon"
              src="/icons/chevron-left.svg"
              width="25"
              height="25"
              onClick={() => setCurrentWeekIndex(mod(currentWeekIndex - 3, allDates.length))}
            />
            {dateElements.map((week: any) => {
              return (
                <div
                  key={uuidv4()}
                  onClick={() => {
                    setSelectedWeekInfo({
                      ...selectedWeekInfo,
                      type: week.seasonType,
                      week: week.value,
                    });
                  }}
                  style={{
                    opacity:
                      week.value == selectedWeekInfo.week &&
                      week.seasonType == selectedWeekInfo.type
                        ? "1"
                        : "0.3",
                  }}
                  className="flex flex-col jusitfy-center items-center font-semibold flex-shrink-0 cursor-pointer p-2"
                >
                  <p className="text-sm font-semibold">{week.label}</p>
                  <p className="text-xs">{week.dateRange}</p>
                </div>
              );
            })}
            <Image
              onClick={() => setCurrentWeekIndex(mod(currentWeekIndex + 3, allDates.length))}
              width="25"
              height="25"
              alt="right icon"
              src="/icons/chevron-right.svg"
            />
          </div>
          {/* <Paper elevation={1} className="relative bg-white p-3">
            <CalendarMonthOutlined
              style={{ color: showDateSelector ? "#3e82d6" : "black" }}
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
          </Paper> */}
        </div>
      </div>
    );
  }

  function printSortedGames() {
    let els: any[] = [];
    groupedGames.forEach((gamesOnDate: any, i: any) => {
      els.push(
        <div key={uuidv4()} className="w-full grid bg-white p-2 pb-0 rounded-xl mb-2">
          <p className="opacity-80 font-semibold mt-1 text-start text-sm md:text-base mb-2">{i}</p>
          <hr />
          {gamesOnDate.map((game: any, i: number) => (
            <div key={uuidv4()}>
              <ScoreCard gameInfo={game} league={"NFL"} />
              {i !== gamesOnDate.length - 1 && <hr />}
            </div>
          ))}
        </div>
      );
    });
    return els;
  }

  if (isLoading) {
    return (
      <div className="w-full py-2 mt-[-0.5rem]">
        {nflWeekSelector()}
        <Loading />
      </div>
    );
  } else if (!isLoading) {
    return (
      <div className="w-full py-2 mt-[-0.5rem]">
        {nflWeekSelector()}
        {printSortedGames()}
      </div>
    );
  }
}

export default NFLScoreboard;
