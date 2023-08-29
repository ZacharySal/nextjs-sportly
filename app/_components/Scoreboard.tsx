"use client";

import { Box, Typography, CircularProgress } from "@mui/material";
import { useState } from "react";
import ScoreCard from "./ScoreCard";
import useSwr from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function Scoreboard({ seasonWeeks }: { seasonWeeks: any }) {
  const [selectedWeek, setSelectedWeek] = useState({
    seasonValue: "",
    weekValue: "",
  });

  let key = `https://cdn.espn.com/core/nfl/scoreboard?xhr=1&limit=50&week=${selectedWeek.weekValue}&seasontype=${selectedWeek.seasonValue}`;
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

  function convertDate(date: string) {
    return new Date(date).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
  }

  function weekSelector() {
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
                    onClick={() => setSelectedWeek(week)}
                    className="flex flex-col jusitfy-center items-center font-semibold flex-shrink-0 cursor-pointer gap-1 width-40 p-2"
                  >
                    <Typography className="text-sm font-semibold">
                      {week.weekLabel}
                    </Typography>
                    <Box className="flex flex-row gap-1 justify-center items-center">
                      <Typography className="text-xs">
                        {convertDate(week.weekStartDate)}
                      </Typography>
                      <Typography className="text-xs">-</Typography>
                      <Typography className="text-xs">
                        {convertDate(week.weekEndDate)}
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

  if (isLoading)
    return (
      <>
        {weekSelector()}
        <Box className="w-full h-full flex justify-center items-center mt-20">
          <CircularProgress />
        </Box>
      </>
    );
  return (
    <>
      {weekSelector()}
      <Box className="w-full h-full grid grid-cols-2 gap-5">
        {data.content.sbData.events.map((game: any) => (
          <ScoreCard gameInfo={game} version={1} league={"nfl"} />
        ))}
      </Box>
    </>
  );
}

export default Scoreboard;
