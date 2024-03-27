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
    <nav className="sticky top-0 z-50 flex h-11 w-full flex-row items-center justify-start bg-[#2b2c2d]">
      <div className="main-logo h-full min-w-[12rem]">
        <p className={`${russo.className} rr`}>SPORTLY</p>
      </div>
      <div className="ml-[-1rem] flex h-full w-full flex-row justify-end gap-4 pr-4 md:ml-1 md:justify-start md:gap-20 md:pr-0">
        <NavbarOptions />
      </div>
    </nav>
  );
}
