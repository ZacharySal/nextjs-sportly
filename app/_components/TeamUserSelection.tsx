import { Box, Typography } from "@mui/material";
import Link from "next/link";

export default function TeamUserSelection({
  userSelection,
}: {
  userSelection: string;
}) {
  const isSelected = (selection: string) => selection === userSelection;

  return (
    <Box className="w-full bg-white">
      <Box className="drop-shadow-md w-full 2xl:w-1/2 max-w-full overflow-x-auto h-10 flex justify-start 2xl:justify-center items-center gap-3 py-2 pl-5">
        <Link href={`home`}>
          <Typography
            className={`${
              isSelected("home") && "selection-active"
            } flex items-center relative text-sm cursor-pointer`}
          >
            Home
          </Typography>
        </Link>
        {/* <Link href={`stats`}>
          <Typography
            className={`${
              isSelected("stats") && "selection-active"
            } flex items-center relative text-sm cursor-pointer`}
          >
            Stats
          </Typography>
        </Link> */}
      </Box>
    </Box>
  );
}
