"use client";

// import Paper from "@mui/material/Paper";
import { allNFLDates } from "@/lib/constants";
import { useEffect, useState } from "react";
import useSwr from "swr";
import { v4 as uuidv4 } from "uuid";
import useWindowDimensions from "../hooks/useWindowDimensions";
// import CalendarMonthOutlined from "@mui/icons-material/CalendarMonthOutlined";
import Image from "next/image";
import Link from "next/link";
import Loading from "../Loading";
import ScoreCard from "../ScoreCard";
import NFLCalendar from "./NFLCalendar";

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
          allWeeks.push({ ...week, seasonType: seasonType.seasonType }),
        ),
      ),
  );

  return allWeeks;
}

function NFLScoreboard({
  initialScoreData,
  date,
}: {
  initialScoreData: any;
  date?: string;
}) {
  let groupedGames: any;

  const { width } = useWindowDimensions();

  const [showDateSelector, setShowDateSelector] = useState(false);

  const currentWeekInfo = {
    year: initialScoreData?.content.sbData.season.year,
    type: initialScoreData?.content.sbData.season.type,
    week: initialScoreData?.content.sbData.week.number,
  };

  const [selectedWeekInfo, setSelectedWeekInfo] = useState(
    date
      ? {
          year: date.substring(0, 4),
          type: date.substring(5, 6),
          week: date.substring(7),
        }
      : currentWeekInfo,
  );

  const [currentYearIndex, setCurrentYearIndex] = useState(
    allNFLDates.map((year) => year.year).indexOf(String(currentWeekInfo.year)),
  );

  const calendarSelectedYear = allNFLDates[currentYearIndex]?.year;

  const allDates = getDates(calendarSelectedYear);

  const [currentWeekIndex, setCurrentWeekIndex] = useState(
    allDates.findIndex(
      (week: any) =>
        week?.value == selectedWeekInfo.week &&
        week?.seasonType == selectedWeekInfo.type,
    ),
  );

  useEffect(() => {
    setCurrentWeekIndex(
      allDates.findIndex(
        (week: any) =>
          week?.value == selectedWeekInfo.week &&
          week?.seasonType == selectedWeekInfo.type,
      ),
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
    },
  );

  const data = newScoreData ?? initialScoreData;

  if (!isLoading) {
    const ungroupedGames = data.content.sbData.events.map((game: any) => {
      return { ...game, date: getFullDate(game.date) };
    });
    //let gg = ungroupedGames.reverse();
    groupedGames = ungroupedGames.reduce(
      (entryMap: any, e: any) =>
        entryMap.set(e.date, [...(entryMap.get(e.date) || []), e]),
      new Map(),
    );
  }

  function nflWeekSelector() {
    return (
      <div className="z-1 relative mb-3 w-full rounded-xl bg-white p-3">
        <p className="mb-1 text-xl font-bold opacity-80 md:text-2xl">
          NFL Scoreboard
        </p>
        <div className="flex w-full items-center gap-3">
          <div className="flex w-full flex-row items-center justify-between ">
            <Image
              alt="left icon"
              src="/icons/chevron-left.svg"
              width="25"
              height="25"
              onClick={() =>
                setCurrentWeekIndex(mod(currentWeekIndex - 3, allDates.length))
              }
              className="cursor-pointer"
            />
            {dateElements.map((week: any) => {
              return (
                <Link
                  key={uuidv4()}
                  href={`/nfl/${selectedWeekInfo.year}-${week?.seasonType}-${week?.value}`}
                  style={{
                    opacity:
                      week?.value == selectedWeekInfo.week &&
                      week?.seasonType == selectedWeekInfo.type
                        ? "1"
                        : "0.3",
                  }}
                  className="jusitfy-center flex flex-shrink-0 cursor-pointer flex-col items-center p-2 font-semibold"
                >
                  <p className="text-[13px] font-semibold">{week?.label}</p>
                  <p className="text-[11px]">{week?.dateRange}</p>
                </Link>
              );
            })}
            <div className="flex gap-4">
              <Image
                onClick={() =>
                  setCurrentWeekIndex(
                    mod(currentWeekIndex + 3, allDates.length),
                  )
                }
                width="25"
                height="25"
                alt="right icon"
                src="/icons/chevron-right.svg"
                className="cursor-pointer"
              />
              <div
                style={{ boxShadow: "-5px 0px 10px 1px rgba(0,0,0,0.15)" }}
                className="z-60 flex grow-0 items-center justify-center rounded-sm bg-white p-3"
              >
                <div className="w-[24px]">
                  <svg
                    id="calendar"
                    fill={showDateSelector ? "#3e82d6" : "black"}
                    style={{ cursor: "pointer" }}
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() =>
                      setShowDateSelector(
                        (showDateSelector) => !showDateSelector,
                      )
                    }
                    viewBox="0 0 122.88 122.89"
                  >
                    <title>date</title>
                    <path d="M81.61,4.73C81.61,2.12,84.19,0,87.38,0s5.77,2.12,5.77,4.73V25.45c0,2.61-2.58,4.73-5.77,4.73s-5.77-2.12-5.77-4.73V4.73ZM66.11,105.66c-.8,0-.8-10.1,0-10.1H81.9c.8,0,.8,10.1,0,10.1ZM15.85,68.94c-.8,0-.8-10.1,0-10.1H31.64c.8,0,.8,10.1,0,10.1Zm25.13,0c-.8,0-.8-10.1,0-10.1H56.77c.8,0,.8,10.1,0,10.1Zm25.13,0c-.8,0-.8-10.1,0-10.1H81.9c.8,0,.8,10.1,0,10.1Zm25.14-10.1H107c.8,0,.8,10.1,0,10.1H91.25c-.8,0-.8-10.1,0-10.1ZM15.85,87.3c-.8,0-.8-10.1,0-10.1H31.64c.8,0,.8,10.1,0,10.1ZM41,87.3c-.8,0-.8-10.1,0-10.1H56.77c.8,0,.8,10.1,0,10.1Zm25.13,0c-.8,0-.8-10.1,0-10.1H81.9c.8,0,.8,10.1,0,10.1Zm25.14,0c-.8,0-.8-10.1,0-10.1H107c.8,0,.8,10.1,0,10.1Zm-75.4,18.36c-.8,0-.8-10.1,0-10.1H31.64c.8,0,.8,10.1,0,10.1Zm25.13,0c-.8,0-.8-10.1,0-10.1H56.77c.8,0,.8,10.1,0,10.1ZM29.61,4.73C29.61,2.12,32.19,0,35.38,0s5.77,2.12,5.77,4.73V25.45c0,2.61-2.58,4.73-5.77,4.73s-5.77-2.12-5.77-4.73V4.73ZM6.4,43.47H116.47v-22a3,3,0,0,0-.86-2.07,2.92,2.92,0,0,0-2.07-.86H103a3.2,3.2,0,0,1,0-6.4h10.55a9.36,9.36,0,0,1,9.33,9.33v92.09a9.36,9.36,0,0,1-9.33,9.33H9.33A9.36,9.36,0,0,1,0,113.55V21.47a9.36,9.36,0,0,1,9.33-9.33H20.6a3.2,3.2,0,1,1,0,6.4H9.33a3,3,0,0,0-2.07.86,2.92,2.92,0,0,0-.86,2.07v22Zm110.08,6.41H6.4v63.67a3,3,0,0,0,.86,2.07,2.92,2.92,0,0,0,2.07.86H113.55a3,3,0,0,0,2.07-.86,2.92,2.92,0,0,0,.86-2.07V49.88ZM50.43,18.54a3.2,3.2,0,0,1,0-6.4H71.92a3.2,3.2,0,1,1,0,6.4Z" />
                  </svg>
                </div>
                {showDateSelector && (
                  <NFLCalendar
                    currentYearIndex={currentYearIndex}
                    selectedWeekInfo={selectedWeekInfo}
                    setShowDateSelector={setShowDateSelector}
                  />
                )}
              </div>
            </div>
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
        <div
          key={uuidv4()}
          className="mb-2 grid w-full rounded-xl bg-white p-2 pb-0"
        >
          <p className="mb-2 mt-1 text-start text-[14px] font-[500] md:text-base">
            {i}
          </p>
          <hr />
          {gamesOnDate.map((game: any, i: number) => (
            <div key={uuidv4()}>
              <ScoreCard gameInfo={game} league={"NFL"} />
              {i !== gamesOnDate.length - 1 && <hr />}
            </div>
          ))}
        </div>,
      );
    });
    return els;
  }

  if (isLoading) {
    return (
      <div className="mt-[-0.5rem] w-full py-2">
        {nflWeekSelector()}
        <Loading />
      </div>
    );
  } else if (!isLoading) {
    return (
      <div className="mt-[-0.5rem] w-full py-2">
        {nflWeekSelector()}
        {printSortedGames()}
      </div>
    );
  }
}

export default NFLScoreboard;
