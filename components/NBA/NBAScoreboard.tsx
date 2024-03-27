"use client";

import { useEffect, useState } from "react";
import ScoreCard from "../ScoreCard";
import useSwr from "swr";
import { v4 as uuidv4 } from "uuid";
// import ButtonDatePicker from "../MLB/DatePicker";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Image from "next/image";
import useWindowDimensions from "../hooks/useWindowDimensions";
import Loading from "../Loading";
import { ScoreData } from "@/types";

function NBAScoreboard({ initialScoreData }: { initialScoreData: ScoreData }) {
  const { height, width } = useWindowDimensions();

  const [selectedYear, setSelectedYear] = useState(
    initialScoreData?.content?.dateParams?.date.substring(0, 4),
  );

  const pastYear = Number(selectedYear) - 1;

  const daysInYear = getDaysArray(
    new Date(`${pastYear}-01-01`),
    new Date(`${selectedYear}-12-31`),
  );

  const [selectedDate, setSelectedDate] = useState(
    formatDate(initialScoreData?.content?.dateParams?.date),
  );

  const [calendarValue, setCalendarValue] = useState("");

  const [currentIndex, setCurrentIndex] = useState(
    daysInYear.indexOf(formatDate(initialScoreData?.content?.dateParams?.date)),
  );

  const fetchKey =
    selectedDate == formatDate(initialScoreData?.content?.dateParams?.date)
      ? null
      : baseFetchUrl + selectedDate.replaceAll("-", "");

  const { data: newScoreData, isLoading } = useSwr(fetchKey, fetcher);

  const data = newScoreData ?? initialScoreData;

  const sortedGames = data.content.sbData.events.sort((a: any, b: any) => {
    if (a.status.type.state == "in") {
      return -1;
    }
  });

  useEffect(() => {
    setCurrentIndex(daysInYear.indexOf(selectedDate));
  }, [selectedDate]); // eslint-disable-line react-hooks/exhaustive-deps

  function getDateElements() {
    const dateElements = [];
    const maxEls = Math.min(Math.floor(width / 100), 7);
    for (let i = -1; i <= maxEls - 2; i++) {
      dateElements.push(daysInYear[mod(currentIndex + i, 730)]);
    }
    return dateElements;
  }

  function setNewCalendarDate(unformattedDate: string) {
    const formattedDate = new Date(unformattedDate);
    const year = formattedDate.getFullYear().toString();
    let month = (formattedDate.getMonth() + 1).toString();
    month = month.length === 1 ? "0" + month[0] : month;
    let date = formattedDate.getDate().toString();
    date = date.length === 1 ? "0" + date[0] : date;
    setSelectedYear(year);
    setSelectedDate(year + "-" + month + "-" + date);
  }

  function dateSelector() {
    return (
      <div className="mb-3 w-full rounded-xl bg-white p-3">
        <p className="mb-1 text-xl font-bold opacity-80 md:text-2xl">
          NBA Scoreboard
        </p>
        <div className="flex w-full items-center gap-3">
          <div
            id="style-1"
            className="flex w-full flex-row items-center justify-between overflow-x-auto px-2"
          >
            <Image
              src="/icons/chevron-left.svg"
              width="25"
              height="25"
              alt="left arrow"
              className="cursor-pointer"
              onClick={() =>
                setCurrentIndex(
                  (currentIndex: number) => (currentIndex - 4) % 730,
                )
              }
            />
            {getDateElements().map((date: string) => (
              <div
                key={uuidv4()}
                onClick={() => setSelectedDate(date)}
                style={{ opacity: date === selectedDate ? 1 : 0.5 }}
                className="jusitfy-center flex flex-shrink-0 cursor-pointer flex-col items-center p-2 font-semibold"
              >
                <p className="text-[13px] font-semibold md:text-[14px]">
                  {getWeekDay(date)}
                </p>
                <div className="flex flex-row items-center justify-center gap-1">
                  <p className="text-[11px]">{getMonthAndDate(date)}</p>
                </div>
              </div>
            ))}
            <Image
              src="/icons/chevron-right.svg"
              className="cursor-pointer"
              onClick={() =>
                setCurrentIndex(
                  (currentIndex: number) => (currentIndex + 4) % 730,
                )
              }
              width="25"
              height="25"
              alt="right icon"
            />
          </div>
          {/* <ButtonDatePicker
            value={calendarValue}
            onChange={(newValue) => setNewCalendarDate(newValue["$d"])}
          /> */}
        </div>
      </div>
    );
  }

  if (isLoading)
    return (
      // <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="mt-[-0.5rem] flex w-full flex-col items-center justify-center py-2 md:justify-start">
        {dateSelector()}
        <Loading />
      </div>
      // </LocalizationProvider>
    );
  return (
    // <LocalizationProvider dateAdapter={AdapterDayjs}>
    <div className="mt-[-0.5rem] flex w-full flex-col items-center justify-center py-2 md:justify-start">
      {dateSelector()}

      {sortedGames.length !== 0 && (
        <div className="mb-2 grid w-full rounded-xl bg-white p-2 pb-0">
          <p className="mb-2 mt-1 text-start text-[14px] font-[500] md:text-base">
            {getFullDate(selectedDate)}
          </p>
          <hr />
          {sortedGames.map((game: any, i: number) => (
            <div key={uuidv4()}>
              <ScoreCard gameInfo={game} league={"NBA"} />
              {i !== sortedGames.length - 1 && <hr />}
            </div>
          ))}
        </div>
      )}
      {sortedGames.length === 0 && (
        <p className="mt-5 w-full text-center">No games to display</p>
      )}
    </div>
    // </LocalizationProvider>
  );
}

export default NBAScoreboard;

const baseFetchUrl =
  "https://cdn.espn.com/core/nba/scoreboard?xhr=1&limit=50&date=";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const getDaysArray = function (start: any, end: any) {
  for (
    var arr = [], dt = new Date(start);
    dt <= new Date(end);
    dt.setDate(dt.getDate() + 1)
  ) {
    const date = new Date(dt);
    var mm = ("0" + (date.getMonth() + 1)).slice(-2);
    var dd = ("0" + date.getDate()).slice(-2);
    var yy = date.getFullYear();
    var dateString = yy + "-" + mm + "-" + dd;
    arr.push(dateString);
  }
  return arr;
};

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

function formatDate(date: string) {
  const year = date.substring(0, 4);
  const month = date.substring(4, 6);
  const day = date.substring(6, 8);
  return year + "-" + month + "-" + day;
}

function getWeekDay(date: string) {
  return new Date(date + "T00:00:00Z").toLocaleDateString(undefined, {
    timeZone: "UTC",
    weekday: "short",
  });
}

function getMonthAndDate(date: string) {
  return new Date(date + "T00:00:00Z").toLocaleDateString(undefined, {
    timeZone: "UTC",
    month: "short",
    day: "numeric",
  });
}

function getFullDate(date: string) {
  const newDate = new Date(date).toLocaleDateString(undefined, {
    timeZone: "UTC",
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return newDate;
}
