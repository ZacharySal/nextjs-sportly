import { Box, Typography } from "@mui/material";
import Image from "next/image";

export default function NBABoxscore({ data }: { data: any }) {
  return (
    <Box className="w-full bg-white p-3 rounded-xl grid items-center text-center grid-cols-8 grid-rows-[0.25rem, 0.5rem, 0.5rem] gap-y-2 gap-x-0">
      <Typography className="text-sm font-semibold opacity-70 col-start-1 col-span-2 text-start">
        Score Recap
      </Typography>
      <Typography className="text-sm opacity-60 col-start-4">1</Typography>
      <Typography className="text-sm opacity-60 col-start-5">2</Typography>
      <Typography className="text-sm opacity-60 col-start-6">3</Typography>
      <Typography className="text-sm opacity-60 col-start-7">4</Typography>
      <Typography className="text-sm opacity-60 col-start-8">T</Typography>

      <Box className="col-span-3 row-start-2 flex flex-row justify-start items-center gap-2">
        <Image
          src={`/nba/${data.homeTeam.team.name.replace(" ", "").toLowerCase()}.png`}
          width={100}
          height={100}
          className="w-8 object-contain"
          alt="home team logo"
        />
        <Typography className="text-sm md:text-base  font-semibold">{data.homeTeam.team.name}</Typography>
      </Box>

      <Box className="col-span-3 row-start-3 flex flex-row justify-start items-center gap-2">
        <Image
          src={`/nba/${data.awayTeam.team.name.replace(" ", "").toLowerCase()}.png`}
          width={100}
          height={100}
          className="w-8 object-contain"
          alt="away team logo"
        />
        <Typography className="text-sm md:text-base  font-semibold">{data.awayTeam.team.name}</Typography>
      </Box>

      <Typography className="text-sm md:text-base  opacity-70 col-start-4 row-start-2">
        {data.homeTeam.linescores[0]?.displayValue || "-"}
      </Typography>
      <Typography className="text-sm md:text-base  opacity-70 col-start-5 row-start-2">
        {data.homeTeam.linescores[1]?.displayValue || "-"}
      </Typography>
      <Typography className="text-sm md:text-base  opacity-70 col-start-6 row-start-2">
        {data.homeTeam.linescores[2]?.displayValue || "-"}
      </Typography>
      <Typography className="text-sm md:text-base  opacity-70 col-start-7 row-start-2">
        {data.homeTeam.linescores[3]?.displayValue || "-"}
      </Typography>
      <Typography className="text-sm md:text-base font-bold col-start-8 row-start-2">
        {data.homeTeam?.score || "0"}
      </Typography>

      <Typography className="text-sm md:text-base  opacity-70 col-start-4 row-start-3">
        {data.awayTeam.linescores[0]?.displayValue || "-"}
      </Typography>
      <Typography className="text-sm md:text-base  opacity-70 col-start-5 row-start-3">
        {data.awayTeam.linescores[1]?.displayValue || "-"}
      </Typography>
      <Typography className="text-sm md:text-base  opacity-70 col-start-6 row-start-3">
        {data.awayTeam.linescores[2]?.displayValue || "-"}
      </Typography>
      <Typography className="text-sm md:text-base  opacity-70 col-start-7 row-start-3">
        {data.awayTeam.linescores[3]?.displayValue || "-"}
      </Typography>
      <Typography className="text-sm md:text-base font-bold col-start-8 row-start-3">
        {data.awayTeam?.score || "0"}
      </Typography>
    </Box>
  );
}
