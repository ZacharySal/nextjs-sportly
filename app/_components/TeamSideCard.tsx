"use client";

import { nameExceptions } from "../_lib/constants";
import Link from "next/link";
import Image from "next/image";

export default function TeamSideCard({ name, league }: { name: string; league: string }) {
  let parts = name[0].split(" ");
  let teamName = parts.pop();
  let location = parts.join(" ");

  if (nameExceptions.includes(name[0])) {
    parts = name[0].split(" ");
    parts.shift();
    teamName = parts.join(" ");
  }

  return (
    <div
      style={{ cursor: "pointer" }}
      className="flex justify-start flex-row items-center gap-2 mt-4"
    >
      <Link href={`/${league}/team/${name[1]}/home`}>
        <Image
          src={`/${league}/${teamName?.replace(" ", "").toLowerCase()}.png`}
          width={100}
          height={100}
          alt="team logo"
          className="w-8 md:w-12 object-contain"
        />
      </Link>

      <div className="flex flex-col gap-1">
        <Link href={`/${league}/team/${name[1]}/home`}>
          <p className="text-sm md:text-base team-link">{name[0]}</p>
        </Link>
        <div className="flex flex-row justify-start gap-1">
          <Link href={`/${league}/team/${name[1]}/stats`}>
            <p className="text-[11px] anchor-link pr-1 border-r border-[rgba(0,0,0,0.1)]">
              Statistics
            </p>
          </Link>
          <Link href={`/${league}/team/${name[1]}/schedule`}>
            <p className="text-[11px] anchor-link pr-1 border-r border-[rgba(0,0,0,0.1)]">
              Schedule
            </p>
          </Link>
          <Link href={`/${league}/team/${name[1]}/roster`}>
            <p className="text-[11px] anchor-link pr-1 border-r border-[rgba(0,0,0,0.1)]">Roster</p>
          </Link>
          <Link href={`/${league}/team/${name[1]}/roster`}>
            <p className="text-[11px] anchor-link">Depth Chart</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
