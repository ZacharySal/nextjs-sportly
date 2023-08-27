"use client";

import { useRouter } from "next/navigation";
import DateSelector from "./DateSelector";

export default function Navbar() {
  const router = useRouter();
  return (
    <nav className="w-full h-10 bg-gray-800 pointer drop-shadow-xl z-10 mx-auto flex justify-around items-center text-sm flex-row text-white sticky top-0">
      <h1>Sportly</h1>
      <h1 className="cursor-pointer" onClick={() => router.push("/nfl")}>
        NFL
      </h1>
      <h1>MLB</h1>
      <h1>NBA</h1>
    </nav>
  );
}
