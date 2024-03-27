"use client";

import { useEffect, useState } from "react";
import ScoreCard from "../ScoreCard";
import useSwr from "swr";
import { v4 as uuidv4 } from "uuid";
// import ButtonDatePicker from "../MLB/DatePicker";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import useWindowDimensions from "../hooks/useWindowDimensions";
import Loading from "../Loading";
import Image from "next/image";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const getDaysArray = function (start: any, end: any) {
  for (
    var arr = [], dt = new Date(start);
    dt <= new Date(end);
    dt.setDate(dt.getDate() + 1)
  ) {
    arr.push(new Date(dt));
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

const baseFetchUrl =
  "https://cdn.espn.com/core/mlb/scoreboard?xhr=1&limit=50&date=";

function MLBScoreboard({ initialScoreData }: { initialScoreData: any }) {
  const { height, width } = useWindowDimensions();

  const [selectedYear, setSelectedYear] = useState(
    initialScoreData?.content?.dateParams?.date.substring(0, 4),
  );

  const pastYear = Number(selectedYear) - 1;

  const daysInYear = getDaysArray(
    new Date(`${pastYear}-01-01`),
    new Date(`${selectedYear}-12-31`),
  );
  const formattedDaysInYear = daysInYear.map((v: any) => {
    return v.toISOString().slice(0, 10);
  });

  const [selectedDate, setSelectedDate] = useState(
    formatDate(initialScoreData?.content?.dateParams?.date),
  );
  const [calendarValue, setCalendarValue] = useState("");
  const [currentIndex, setCurrentIndex] = useState(
    formattedDaysInYear.indexOf(
      formatDate(initialScoreData?.content?.dateParams?.date),
    ),
  );

  useEffect(() => {
    setCurrentIndex(formattedDaysInYear.indexOf(selectedDate));
  }, [selectedDate]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchKey =
    selectedDate == formatDate(initialScoreData?.content?.dateParams?.date)
      ? null
      : baseFetchUrl + selectedDate.replaceAll("-", "");

  const { data: newScoreData, isLoading } = useSwr(fetchKey, fetcher);

  const data = newScoreData ?? initialScoreData;

  function getDateElements() {
    const dateElements = [];
    const maxEls = Math.min(Math.floor(width / 100), 7);
    for (let i = -1; i <= maxEls - 2; i++) {
      dateElements.push(formattedDaysInYear[mod(currentIndex + i, 365)]);
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
      <div className="mb-3  w-full rounded-xl bg-white p-3">
        <p className="mb-1 text-xl font-bold opacity-80 md:text-2xl">
          MLB Scoreboard
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
              alt="left icon"
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
                <p className="text-sm font-semibold">{getWeekDay(date)}</p>
                <div className="flex flex-row items-center justify-center gap-1">
                  <p className="text-xs">{getMonthAndDate(date)}</p>
                </div>
              </div>
            ))}
            <Image
              src="/icons/chevron-right.svg"
              width="25"
              height="25"
              alt="right icon"
              onClick={() =>
                setCurrentIndex(
                  (currentIndex: number) => (currentIndex + 4) % 730,
                )
              }
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
      {data.content.sbData.events.length !== 0 && (
        <div className="mb-2 grid w-full rounded-xl bg-white p-2 pb-0">
          <p className="mb-2 mt-1 text-start text-sm font-semibold opacity-80 md:text-base">
            {getFullDate(selectedDate)}
          </p>
          <hr />
          {data.content.sbData.events.map((game: any, i: number) => (
            <div key={uuidv4()}>
              <ScoreCard gameInfo={game} league={"MLB"} />
              {i !== data.content.sbData.events.length - 1 && <hr />}
            </div>
          ))}
        </div>
      )}
      {data.content.sbData.events.length === 0 && (
        <p className="mt-5 w-full text-center">No games to display</p>
      )}
    </div>
    // </LocalizationProvider>
  );
}

export default MLBScoreboard;
