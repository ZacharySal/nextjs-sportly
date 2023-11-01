import { Link, Typography, Box } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { russo } from "../layout";
import {
  nbaDivisionTeams,
  nameExceptions,
  nflDivisonTeams,
  mlbDivisonTeams,
} from "../_lib/constants";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";

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
  const dropDownMenu = (league: string, divisonTeams: any) => (
    <Box className="flex flex-row menu-option relative h-full items-center cursor-pointer">
      <Link href={`/${league}`} sx={{ textDecoration: "none" }}>
        <Typography className="text-white opacity-80 uppercase">
          {league}
        </Typography>
      </Link>
      <KeyboardArrowDownIcon className="text-white opacity-80 hidden md:block" />
      <Box className="menu-dropdown hidden">
        <Box className="flex flex-row gap-5">
          <Box className="flex flex-col gap-1 text-black pt-3 w-1/7">
            <Link href={`/${league}`} className="no-underline text-black">
              <Typography className="rounded-md opacity-60 p-2 text-sm menu-dropdown-option">
                Scores
              </Typography>
            </Link>
            <Typography className="rounded-md opacity-60 p-2 text-sm menu-dropdown-option">
              Schedules
            </Typography>
            <Link
              href={`/${league}/standings`}
              className="no-underline text-black"
            >
              <Typography className="rounded-md opacity-60 p-2 text-sm menu-dropdown-option">
                Standings
              </Typography>
            </Link>
            <Typography className="rounded-md opacity-60 p-2 text-sm menu-dropdown-option">
              Stats
            </Typography>
            <Link href={`/${league}/teams`} className="no-underline text-black">
              <Typography className="rounded-md opacity-60 p-2 text-sm menu-dropdown-option">
                Teams
              </Typography>
            </Link>
          </Box>

          <Box
            sx={{
              gridTemplateColumns:
                league === "nfl"
                  ? "repeat(4, minmax(0, 1fr))"
                  : "repeat(3, minmax(0, 1fr))",
            }}
            className="grid gap-x-8 bg-gray-100 p-3 rounded-xl"
          >
            {Object.entries(divisonTeams).map(
              ([conference, teams]: [string, any]) => (
                <Box
                  key={conference + uuidv4()}
                  className="flex flex-col gap-3 mb-3 text-black"
                >
                  <h1 className="font-bold text-[12px] opacity-70">
                    {conference}
                  </h1>
                  {teams.map((team: any) => (
                    <Link
                      className="no-underline text-black"
                      href={`/${league}/team/${team[1]}/home`}
                      key={uuidv4()}
                    >
                      <Box className="flex flex-row justify-start items-center w-full gap-1 px-1 rounded-md menu-dropdown-team">
                        <Image
                          width={100}
                          height={100}
                          alt="team"
                          src={setTeamImageSrc(team[0], league)}
                          className="w-7 object-contain"
                        />
                        <Typography className="text-xs whitespace-nowrap opacity-60">
                          {team[0]}
                        </Typography>
                      </Box>
                    </Link>
                  ))}
                </Box>
              )
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
  return (
    <nav className="w-full h-11 z-50 flex justify-start items-center flex-row sticky top-0 bg-[#2b2c2d]">
      <div className="min-w-[12rem] h-full main-logo">
        <Typography className={`${russo.className} rr`}>SPORTLY</Typography>
      </div>
      <Box className="w-full flex flex-row h-full gap-4 justify-start md:ml-1 md:gap-20 ml-[-1rem]">
        <>
          {dropDownMenu("nfl", nflDivisonTeams)}
          {dropDownMenu("nba", nbaDivisionTeams)}
          {dropDownMenu("mlb", mlbDivisonTeams)}
        </>
      </Box>
    </nav>
  );
}
