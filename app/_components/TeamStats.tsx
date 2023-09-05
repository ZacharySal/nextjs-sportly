import { Box, Typography } from "@mui/material";

function TeamStats({ stats }: { stats: any }) {
  return (
    <Box className="w-full h-full grid grid-cols-[1fr_1fr_1fr] md:flex md:flex-col md:justify-start md:items-center gap-2 md:gap-4">
      {Object.entries(stats).map(([statName, value]: [string, any]) => (
        <>
          <Box className=" w-full md:w-40 flex justify-center items-center flex-row p-2 md:p-3 bg-white gap-1 rounded-xl drop-shadow-md">
            <Box className="flex flex-col justify-center gap-2 items-center">
              <Typography className="text-xs md:text-sm">{statName}</Typography>
              <Typography className="font-semibold text-xl md:text-3xl">
                {value.displayValue}
              </Typography>
              <Typography className="text-sm md:text-base opacity-70">
                {value.rankDisplayValue}
              </Typography>
            </Box>
          </Box>
        </>
      ))}
    </Box>
  );
}

export default TeamStats;
