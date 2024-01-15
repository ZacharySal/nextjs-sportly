"use client";

import Link from "next/link";
import {
  nbaDivisionTeams,
  nameExceptions,
  nflDivisonTeams,
  mlbDivisonTeams,
} from "../../lib/constants";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { usePathname } from "next/navigation";

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

export default function NavbarOptions() {
  const pathName = usePathname();
  const dropDownMenu = (league: string, divisonTeams: any) => (
    <div className="flex flex-row menu-option relative h-full items-center cursor-pointer">
      <Link href={`/${league}`} style={{ textDecoration: "none" }}>
        <p
          className={`text-white uppercase relative font-[600] ${
            pathName.includes(league) && "league-open"
          }`}
        >
          {league}
        </p>
      </Link>
      <div className="menu-dropdown hidden">
        <div className="flex flex-row gap-5">
          <div className="flex flex-col gap-1 text-black pt-3 w-2/7 justify-start">
            <Link href={`/${league}`} className="no-underline text-black">
              <p className="rounded-md opacity-60 p-2 text-[14px] menu-dropdown-option">Scores</p>
            </Link>
            <Link href={`/${league}/standings`} className="no-underline text-black">
              <p className="rounded-md opacity-60 p-2 text-[14px] menu-dropdown-option">
                Standings
              </p>
            </Link>
            <Link href={`/${league}/teams`} className="no-underline text-black">
              <p className="rounded-md opacity-60 p-2 text-[14px] menu-dropdown-option">Teams</p>
            </Link>
          </div>

          <div
            style={{
              gridTemplateColumns:
                league === "nfl" ? "repeat(4, minmax(0, 1fr))" : "repeat(3, minmax(0, 1fr))",
            }}
            className="grid gap-x-8 bg-gray-100 p-3 rounded-xl"
          >
            {Object.entries(divisonTeams).map(([conference, teams]: [string, any]) => (
              <div key={conference + uuidv4()} className="flex flex-col gap-2 mb-3 text-black">
                <h1 className="font-bold text-[12px] opacity-70">{conference}</h1>
                {teams.map((team: any) => (
                  <Link
                    className="no-underline text-black"
                    href={`/${league}/team/${team[1]}/home`}
                    key={uuidv4()}
                  >
                    <div className="flex flex-row justify-start items-center w-full gap-2 p-1 rounded-md menu-dropdown-team">
                      <Image
                        width={100}
                        height={100}
                        alt="team"
                        src={setTeamImageSrc(team[0], league)}
                        className="w-7 object-contain"
                      />
                      <p className="text-[12px] whitespace-nowrap opacity-60">{team[0]}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <>
      {dropDownMenu("nfl", nflDivisonTeams)}
      {dropDownMenu("nba", nbaDivisionTeams)}
      {dropDownMenu("mlb", mlbDivisonTeams)}
    </>
  );
}
