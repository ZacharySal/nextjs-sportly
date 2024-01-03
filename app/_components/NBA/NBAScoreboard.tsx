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
import useWindowDimensions from "../useWindowDimensions";
import Loading from "../Loading";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const getDaysArray = function (start: any, end: any) {
  for (var arr = [], dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
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

function NBAScoreboard({ currentDate }: { currentDate: string }) {
  const { height, width } = useWindowDimensions();

  const [selectedYear, setSelectedYear] = useState(currentDate.substring(0, 4));
  const pastYear = Number(selectedYear) - 1;

  const daysInYear = getDaysArray(new Date(`${pastYear}-01-01`), new Date(`${selectedYear}-12-31`));

  const [selectedDate, setSelectedDate] = useState(formatDate(currentDate));
  const [calendarValue, setCalendarValue] = useState("");
  const [currentIndex, setCurrentIndex] = useState(daysInYear.indexOf(formatDate(currentDate)));

  useEffect(() => {
    setCurrentIndex(daysInYear.indexOf(selectedDate));
  }, [selectedDate]); // eslint-disable-line react-hooks/exhaustive-deps

  let key = `https://cdn.espn.com/core/nba/scoreboard?xhr=1&limit=50&date=${selectedDate.replaceAll(
    "-",
    ""
  )}`;
  const { data, isLoading } = useSwr(key, fetcher, { refreshInterval: 5000 });

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
      <Box className="w-full p-2 bg-white mb-3 rounded-xl">
        <Typography className="mb-1 font-semibold text-xl opacity-80">NBA Scoreboard</Typography>
        <Box className="w-full flex gap-3 items-center">
          <Box
            id="style-1"
            className="pl-2 w-full flex flex-row overflow-x-auto justify-between items-center"
          >
            <FontAwesomeIcon
              onClick={() => setCurrentIndex((currentIndex: number) => (currentIndex - 4) % 730)}
              icon={faAngleLeft}
              style={{ fontSize: "1rem", color: "#3e82d6", cursor: "pointer" }}
            />
            {getDateElements().map((date: string) => (
              <Box
                key={uuidv4()}
                onClick={() => setSelectedDate(date)}
                style={{ opacity: date === selectedDate ? 1 : 0.5 }}
                className="flex flex-col jusitfy-center items-center font-semibold flex-shrink-0 cursor-pointer p-2"
              >
                <Typography className="text-sm font-semibold">{getWeekDay(date)}</Typography>
                <Box className="flex flex-row gap-1 justify-center items-center">
                  <Typography className="text-xs">{getMonthAndDate(date)}</Typography>
                </Box>
              </Box>
            ))}
            <FontAwesomeIcon
              onClick={() => setCurrentIndex((currentIndex: number) => (currentIndex + 4) % 730)}
              icon={faAngleRight}
              style={{ fontSize: "1rem", color: "#3e82d6", cursor: "pointer" }}
            />
          </Box>
          <ButtonDatePicker
            value={calendarValue}
            onChange={(newValue) => setNewCalendarDate(newValue["$d"])}
          />
        </Box>
      </Box>
    );
  }

  if (isLoading)
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box className="w-full py-2 flex flex-col justify-center md:justify-start items-center mt-[-0.5rem]">
          {dateSelector()}
          <Loading />
        </Box>
      </LocalizationProvider>
    );
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box className="w-full py-2 flex flex-col justify-center md:justify-start items-center mt-[-0.5rem]">
        {dateSelector()}

        {data.content.sbData.events.length !== 0 && (
          <Box className="w-full grid bg-white p-2 pb-0 rounded-xl mb-2">
            <Typography className="opacity-80 font-semibold mt-1 text-start text-sm md:text-base mb-2">
              {getFullDate(selectedDate)}
            </Typography>
            <Divider />
            {data.content.sbData.events.map((game: any, i: number) => (
              <Box key={uuidv4()}>
                <ScoreCard gameInfo={game} league={"NBA"} />
                {i !== data.content.sbData.events.length - 1 && <Divider />}
              </Box>
            ))}
          </Box>
        )}
        {data.content.sbData.events.length === 0 && (
          <p className="w-full text-center mt-5">No games to display</p>
        )}
      </Box>
    </LocalizationProvider>
  );
}

export default NBAScoreboard;
