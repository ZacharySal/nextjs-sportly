import { Divider, Button, Box, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function ScoreCard() {
  return (
    <Box className="w-full h-full flex justfy-between flex-col gap-4 p-3 rounded text-black drop-shadow-md bg-white">
      <Typography className="text-sm">
        <span className="font-bold">FINAL</span> - THU 08/17
      </Typography>
      {/* Team Names and Score */}
      <Box className="w-full flex flex-row justify-between gap-5">
        <Box className="w-full ">
          <Box className="w-full flex justify-between items-center">
            {/* Home Team Name and Logo*/}
            <Box className="flex items-center gap-3">
              <img src="/panthers.png" className="w-10 h-10 object-cover"></img>
              <Typography className="font-bold">Panthers</Typography>
            </Box>
            {/* Home Team Score*/}
            <Typography>18</Typography>
          </Box>

          <Box className="w-full flex justify-between items-center">
            {/* Away Team Name and Logo*/}
            <Box className="flex items-center gap-3">
              <img src="/raiders.png" className="w-10 h-10 object-cover"></img>
              <Typography className="font-bold">Raiders</Typography>
            </Box>
            {/* Away Team Score*/}
            <Typography>27</Typography>
          </Box>
        </Box>
        <ArrowForwardIosIcon className="m-auto text-sm" />
      </Box>
      <Divider />
      {/* CTA Buttons */}
      <Box className="w-full flex justify-evenly items-center">
        <div className="border border-[#1b48e0]  rounded p-2 px-3 text-sm bg-[#1b48e0] text-white truncate">
          Full Replay
        </div>
        <div className="border border-[#1b48e0] rounded p-2 px-3 text-sm bg-[#1b48e0] text-white truncate">
          Game Details
        </div>
        <div className="border border-[#1b48e0] rounded p-2 px-3 text-sm bg-white font-bold text-[#1b48e0] truncate">
          Highlights
        </div>
      </Box>
    </Box>
  );
}
