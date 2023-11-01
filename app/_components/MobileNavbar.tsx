import { Link, Typography, Box } from "@mui/material";
import { russo } from "../layout";

export default function MobileNavbar() {
  return (
    <nav className="w-full h-11 z-50 flex justify-start items-center flex-row sticky top-0 bg-[#2b2c2d]">
      <div className="min-w-[12rem] h-full main-logo">
        <Typography className={`${russo.className} rr`}>SPORTLY</Typography>
      </div>
      <Box className="w-full flex flex-row h-full gap-3 justify-start items-center ml-[-1rem]">
        <Link href={`/nfl`} sx={{ textDecoration: "none" }}>
          <Typography className="text-white opacity-80">NFL</Typography>
        </Link>
        <Link href={`/nba`} sx={{ textDecoration: "none" }}>
          <Typography className="text-white opacity-80">NBA</Typography>
        </Link>
        <Link href={`/mlb`} sx={{ textDecoration: "none" }}>
          <Typography className="text-white opacity-80">MLB</Typography>
        </Link>
      </Box>
    </nav>
  );
}

// border-r pr-3 border-[rgba(255,255,255,0.5)]
