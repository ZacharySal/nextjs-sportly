import { Box, Typography } from "@mui/material";
import Image from "next/image";

export default function StadiumInfo({ data }: { data: any }) {
  return (
    <>
      <Box className="w-full flex flex-col bg-white rounded-xl drop-shadow-md gap-2 p-3">
        <Typography className="text-sm opacity-70 font-semibold text-start">Stadium Information</Typography>

        <Image
          src={data.gameData.gameInfo.venue.images[0]?.href}
          width={200}
          height={200}
          className="w-full object-contain rounded"
          alt="Stadium"
        />
        <Typography className="opacity-80 font-bold">{data.gameData.gameInfo.venue.fullName}</Typography>
        <Typography className="opacity-80 text-sm mt-[-0.5rem]">
          {data.gameData.gameInfo.venue.address.city}, {data.gameData.gameInfo.venue.address.state}
        </Typography>
      </Box>
    </>
  );
}
