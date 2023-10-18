"use client";

import {
  Box,
  Typography,
  CircularProgress,
  FormControl,
  Select,
  MenuItem,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { JSX, useState } from "react";
import NewScoreCard from "../NewScoreCard";
import ScoreCard from "../ScoreCard";
import useSwr from "swr";
import { v4 as uuidv4 } from "uuid";
import test from "node:test";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function NFLScoreboard({
  seasonWeeks,
  league,
  year = null,
  type = null,
  setType = null,
  setYear = null,
}: {
  seasonWeeks: any;
  league: string;
  events: any;
  year: any;
  type: any;
  setType: any;
  setYear: any;
}) {
  const [nflSelectedWeek, setNflSelectedWeek] = useState<any>({
    weekValue: "",
    seasonValue: "",
  });

  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  let groupedGames: any;

  const key = `https://cdn.espn.com/core/nfl/scoreboard?xhr=1&limit=50&week=${nflSelectedWeek.value}&seasontype=${type}&year=${year}`;

  const { data, isLoading } = useSwr(key, fetcher, { refreshInterval: 5000 });

  if (!isLoading) {
    const ungroupedGames = data.content.sbData.events.map((game: any) => {
      return { ...game, date: getFullDate(game.date) };
    });

    let gg = ungroupedGames.reverse();
    groupedGames = gg.reduce(
      (entryMap: any, e: any) => entryMap.set(e.date, [...(entryMap.get(e.date) || []), e]),
      new Map()
    );
  }

  const allYears = () => {
    let res = [];

    for (let i = 2016; i <= 2023; i++) {
      res.push(
        <MenuItem key={uuidv4()} value={`${i}`}>
          {i}
        </MenuItem>
      );
    }

    return res;
  };

  function convertNflDate(date: string) {
    return new Date(date).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
  }

  function nflWeekSelector() {
    return (
      <Box className="p-2 bg-white mb-3 rounded-xl drop-shadow-md">
        <Typography className="mb-1 font-semibold text-xl opacity-80">NFL Scoreboard</Typography>
        <Box className="w-full h-auto flex flex-row justify-start gap-1 mt-2">
          <FormControl sx={{ fontSize: "8px" }} size="small">
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={year}
              onChange={(e) => {
                e.preventDefault;
                setYear(e.target.value);
              }}
              style={{ height: 28 }}
            >
              {allYears()}
            </Select>
          </FormControl>

          <FormControl size="small">
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={type}
              onChange={(e) => {
                e.preventDefault;
                setType(e.target.value);
              }}
              style={{ height: 28 }}
            >
              <MenuItem value={1}>Preseason</MenuItem>
              <MenuItem value={2}>Regular</MenuItem>
              <MenuItem value={3}>Postseason</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box
          id="style-1"
          className="max-w-full flex flex-row border border-black border-opacity-20 rounded-md mt-2 border-radius-md overflow-x-auto"
        >
          {seasonWeeks.map((week: any) => {
            return (
              <Box
                key={uuidv4()}
                onClick={() => setNflSelectedWeek(week)}
                className="flex flex-col jusitfy-center items-center font-semibold flex-shrink-0 cursor-pointer gap-1 width-40 p-2"
              >
                <Typography className="text-sm font-[500]">{week.alternateLabel}</Typography>
                <Box className="flex flex-row gap-1 justify-center items-center">
                  <Typography className="text-xs">{convertNflDate(week.startDate)}</Typography>
                  <Typography className="text-xs">-</Typography>
                  <Typography className="text-xs">{convertNflDate(week.endDate)}</Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  }

  function getFullDate(date: string) {
    const newDate = new Date(date).toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    return newDate;
  }

  function printSortedGames() {
    let els: any[] = [];
    groupedGames.forEach((gamesOnDate: any, i: any) => {
      els.push(
        <Box key={uuidv4()} className="w-full grid gap-2 bg-white p-2 rounded-xl mb-2">
          <Typography className="opacity-80 font-semibold mt-2 text-start text-sm md:text-base">{i}</Typography>
          <Divider />
          {gamesOnDate.map((game: any, i: number) => (
            <Box key={uuidv4()}>
              <NewScoreCard gameInfo={game} version={1} league={league} teamView={false} />
              {i !== gamesOnDate.length - 1 && <Divider />}
            </Box>
          ))}
        </Box>
      );
    });
    return els;
  }

  if (isLoading)
    return (
      <Box className="max-w-full py-2 mt-[-0.5rem]">
        {nflWeekSelector()}
        <Box className="w-full flex justify-center items-center">
          <CircularProgress />
        </Box>
      </Box>
    );
  return (
    <Box className="max-w-full py-2 mt-[-0.5rem]">
      {nflWeekSelector()}
      {printSortedGames()}
    </Box>
  );
}

export default NFLScoreboard;
