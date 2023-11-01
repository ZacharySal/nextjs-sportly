"use client";

import Navbar from "../_components/Navbar";
import MobileNavbar from "../_components/MobileNavbar";
import { useMediaQuery } from "@mui/material";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");
  return (
    <div lang="en">
      {isDesktopScreen ? <Navbar /> : <MobileNavbar />}

      {children}
    </div>
  );
}
