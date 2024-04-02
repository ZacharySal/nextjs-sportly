"use client";

import {
  formatDate,
  getFullDate,
  getMonthAndDate,
  getWeekDay,
  mod,
} from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSwr from "swr";
import { v4 as uuidv4 } from "uuid";
import Loading from "../Loading";
import ScoreCard from "../ScoreCard";
import useWindowDimensions from "../hooks/useWindowDimensions";

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

const baseFetchUrl =
  "https://cdn.espn.com/core/mlb/scoreboard?xhr=1&limit=50&date=";

function MLBScoreboard({
  initialScoreData,
  date,
}: {
  initialScoreData: any;
  date?: string;
}) {
  const { width } = useWindowDimensions();

  const selectedYear = initialScoreData?.content?.dateParams?.date.substring(
    0,
    4,
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
    date ?? formatDate(initialScoreData?.content?.dateParams?.date),
  );

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
      dateElements.push(formattedDaysInYear[mod(currentIndex + i, 730)]);
    }
    return dateElements;
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
              <Link
                key={uuidv4()}
                href={`/mlb/${date}`}
                style={{ opacity: date === selectedDate ? 1 : 0.5 }}
                className="jusitfy-center flex flex-shrink-0 cursor-pointer flex-col items-center p-2 font-semibold"
              >
                <p className="text-sm font-semibold">{getWeekDay(date)}</p>
                <div className="flex flex-row items-center justify-center gap-1">
                  <p className="text-xs">{getMonthAndDate(date)}</p>
                </div>
              </Link>
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
        </div>
      </div>
    );
  }

  if (isLoading)
    return (
      <div className="mt-[-0.5rem] flex w-full flex-col items-center justify-center py-2 md:justify-start">
        {dateSelector()}
        <Loading />
      </div>
    );
  return (
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
  );
}

export default MLBScoreboard;
