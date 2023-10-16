"use client";

import { Box, Typography, CircularProgress, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import ScoreCard from "../ScoreCard";
import useSwr from "swr";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import ButtonDatePicker from "../MLB/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const getDaysArray = function (start: any, end: any) {
  for (var arr = [], dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
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

function NBAScoreboard({ currentDate }: { currentDate: string }) {
  const [selectedYear, setSelectedYear] = useState("2023");

  const daysInYear = getDaysArray(new Date(`${selectedYear}-01-01`), new Date(`${selectedYear}-12-31`));
  const formattedDaysInYear = daysInYear.map((v: any) => {
    return v.toISOString().slice(0, 10);
  });

  const [selectedDate, setSelectedDate] = useState(formatDate(currentDate));
  const [calendarValue, setCalendarValue] = useState("");
  const [currentIndex, setCurrentIndex] = useState(formattedDaysInYear.indexOf(formatDate(currentDate)));

  useEffect(() => {
    setCurrentIndex(formattedDaysInYear.indexOf(selectedDate));
  }, [selectedDate]);

  let key = `https://cdn.espn.com/core/nba/scoreboard?xhr=1&limit=50&date=${selectedDate.replaceAll("-", "")}`;
  const { data, isLoading } = useSwr(key, fetcher, { refreshInterval: 5000 });

  function getDateElements() {
    const dateElements = [];
    for (let i = -2; i <= 1; i++) {
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
      <Box className="w-full p-2 bg-white mb-3 rounded-xl drop-shadow-md">
        <Typography className="mb-1 font-semibold text-xl opacity-80">NBA Scoreboard</Typography>
        <Box className="w-full grid grid-cols-[1fr_auto]">
          <Box id="style-1" className="w-full flex flex-row overflow-x-auto justify-evenly items-center">
            <FontAwesomeIcon
              onClick={() => setCurrentIndex((currentIndex: number) => (currentIndex - 4) % 365)}
              icon={faAngleLeft}
              style={{ fontSize: "0.75rem", color: "black" }}
            />
            {getDateElements().map((date: string) => (
              <Box
                key={uuidv4()}
                onClick={() => setSelectedDate(date)}
                style={{ opacity: date === selectedDate ? 1 : 0.5 }}
                className="flex flex-col jusitfy-center items-center font-semibold flex-shrink-0 cursor-pointer gap-1 p-2"
              >
                <Typography className="text-sm font-semibold">{getWeekDay(date)}</Typography>
                <Box className="flex flex-row gap-1 justify-center items-center">
                  <Typography className="text-xs">{getMonthAndDate(date)}</Typography>
                </Box>
              </Box>
            ))}
            <FontAwesomeIcon
              onClick={() => setCurrentIndex((currentIndex: number) => (currentIndex + 4) % 365)}
              icon={faAngleRight}
              style={{ fontSize: "0.75rem", color: "black" }}
            />
          </Box>
          <ButtonDatePicker value={calendarValue} onChange={(newValue) => setNewCalendarDate(newValue["$d"])} />
        </Box>
        <Divider />
        <Typography className="opacity-80 font-semibold mt-2 text-center">{getFullDate(selectedDate)}</Typography>
      </Box>
    );
  }

  if (isLoading)
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box className="w-full py-2 flex flex-col justify-center items-center">
          {dateSelector()}
          <Box className="w-full flex justify-center items-center">
            <CircularProgress />
          </Box>
        </Box>
      </LocalizationProvider>
    );
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box className="w-full py-2 flex flex-col justify-center items-center">
        {dateSelector()}
        <Box className="w-full grid grid-cols-2 2xl:grid-cols-3 2xl:gap-5 gap-3">
          {data.content.sbData.events.map((game: any, i: string) => (
            <ScoreCard key={uuidv4()} gameInfo={game} version={1} league={"nba"} teamView={false} />
          ))}
        </Box>
        {data.content.sbData.events.length === 0 && <p className="mt-5">No games to display</p>}
      </Box>
    </LocalizationProvider>
  );
}

export default NBAScoreboard;
