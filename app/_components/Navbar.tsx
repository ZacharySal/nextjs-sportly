import { Link, Typography, Box } from "@mui/material";
import { russo } from "../layout";

export default function Navbar() {
  return (
    <nav className="w-full h-10 md:h-12 z-40 flex justify-start items-center flex-row sticky top-0 bg-[#2b2c2d]">
      <div className="min-w-[12rem] h-full main-logo">
        <Typography
          style={{
            width: "75%",
            fontSize: "1.25rem",
            letterSpacing: "2px",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "400",
            color: "white",
          }}
          className={russo.className}
        >
          SPORTLY
        </Typography>
      </div>
      <Box className="w-full flex flex-row w-full justify-evenly ml-[-2rem]">
        <Link
          href="/nfl"
          style={{ textDecoration: "none" }}
          className="no-underline"
        >
          <Typography className="cursor-pointer text-white opacity-80">
            NFL
          </Typography>
        </Link>
        <Link
          href="/mlb"
          style={{ textDecoration: "none" }}
          className="no-underline"
        >
          <Typography className="cursor-pointer text-white opacity-80">
            MLB
          </Typography>
        </Link>
        <Link
          href="/nba"
          style={{ textDecoration: "none" }}
          className="no-underline"
        >
          <Typography className="cursor-pointer text-white opacity-80">
            NBA
          </Typography>
        </Link>
      </Box>
    </nav>
  );
}
