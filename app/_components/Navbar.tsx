"use client";

import { useRouter } from "next/navigation";
import { Link, Typography } from "@mui/material";
import DateSelector from "./DateSelector";

export default function Navbar() {
  const router = useRouter();
  return (
    <nav className="w-full h-10 bg-gray-800 pointer drop-shadow-xl z-10 mx-auto flex justify-around items-center text-sm flex-row text-white sticky top-0">
      <Typography>Sportly</Typography>
      <Link href="/nfl">
        <Typography className="cursor-pointer">NFL</Typography>
      </Link>
      <Link href="/mlb">
        <Typography
          className="cursor-pointer"
          onClick={() => router.push("/mlb")}
        >
          MLB
        </Typography>
      </Link>
      <Link href="/nba">
        <Typography
          className="cursor-pointer"
          onClick={() => router.push("/nba")}
        >
          NBA
        </Typography>
      </Link>
    </nav>
  );
}
