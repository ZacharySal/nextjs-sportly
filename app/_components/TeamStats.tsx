import { Box, Typography } from "@mui/material";

function TeamStats({ stats }: { stats: any }) {
  return (
    <Box className="w-auto h-full flex flex-col justify-start items-center gap-4">
      {Object.entries(stats).map(([statName, value]: [string, any]) => (
        <>
          <Box className="w-40 flex justify-center items-center flex-row p-3 bg-white gap-1 rounded-xl drop-shadow-md">
            <Box className="flex flex-col justify-center gap-2 items-center">
              <Typography className="text-sm">{statName}</Typography>
              <Typography className="font-semibold text-3xl">
                {value.displayValue}
              </Typography>
              <Typography className="text-base opacity-70">
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
