import { Box, Typography } from "@mui/material";

export default function WeekSelector({ seasonWeeks }: { seasonWeeks: any }) {
  return (
    <Box className="flex flex-col justify-center items-center mb-8">
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
  );
}
