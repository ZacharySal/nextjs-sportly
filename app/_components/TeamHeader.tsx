import { Box, Typography } from "@mui/material";
import Image from "next/image";

export default function TeamHeader({ data = null, league }: { data: any; league: string }) {
  let record;
  try {
    record = data.team.record.items[0].summary;
  } catch {
    record = "0-0";
  }

  return (
    <Box className="bg-white w-full flex justify-center border-b border-[rgba(0,0,0,0.2)] z-40 sticky top-[2.75rem]">
      <Box className="ml-5 md:ml-10 w-full 2xl:w-2/5 h-20 md:h-24 flex-row flex justify-start items-center gap-3 relative">
        <Image
          src={data.team.logos[0].href}
          width={data.team.logos[0].width}
          height={data.team.logos[0].height}
          alt="team logo"
          className="w-14 md:w-18 object-contain"
        />
        <Box className="flex flex-col">
          <Typography className="text-xl md:text-2xl opacity-80 uppercase">
            {data.team.location + " "} <span className="font-bold">{data.team.name}</span>
          </Typography>
          <Typography className="text-sm opacity-60">
            {record + " • " + data.team.standingSummary}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
