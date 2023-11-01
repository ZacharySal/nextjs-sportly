"use client";
import Home from "./nba/page";
import Navbar from "./_components/Navbar";
import MobileNavbar from "./_components/MobileNavbar";
import { useMediaQuery } from "@mui/material";

function Page() {
  const isDesktopScreen = useMediaQuery("(min-width:1000px");
  return (
    <>
      {isDesktopScreen ? <Navbar /> : <MobileNavbar />}
      <Home />
    </>
  );
}

export default Page;
