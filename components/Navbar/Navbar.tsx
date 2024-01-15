import Link from "next/link";
import { russo } from "../../app/layout";
import {
  nbaDivisionTeams,
  nameExceptions,
  nflDivisonTeams,
  mlbDivisonTeams,
} from "../../lib/constants";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import NavbarOptions from "./NavbarOptions";

const setTeamImageSrc = (fullName: string, league: string) => {
  let parts = fullName.split(" ");
  let teamName = parts.pop();

  if (typeof teamName === "undefined") {
    teamName = "";
  }

  if (nameExceptions.includes(fullName)) {
    parts = fullName.split(" ");
    parts.shift();
    teamName = parts.join(" ");
  }

  return `/${league}/${teamName.replaceAll(" ", "").toLowerCase()}.png`;
};

export default function Navbar() {
  return (
    <nav className="w-full h-11 z-50 flex justify-start items-center flex-row sticky top-0 bg-[#2b2c2d]">
      <div className="min-w-[12rem] h-full main-logo">
        <p className={`${russo.className} rr`}>SPORTLY</p>
      </div>
      <div className="w-full flex flex-row h-full gap-4 justify-end pr-4 md:pr-0 md:justify-start md:ml-1 md:gap-20 ml-[-1rem]">
        <NavbarOptions />
      </div>
    </nav>
  );
}
