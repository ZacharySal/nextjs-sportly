"use client";

import { nameExceptions } from "../lib/constants";
import Link from "next/link";
import Image from "next/image";

export default function TeamSideCard({
  name,
  league,
}: {
  name: string;
  league: string;
}) {
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
      className="mt-4 flex flex-row items-center justify-start gap-2"
    >
      <Link href={`/${league}/team/${name[1]}/home`}>
        <Image
          src={`/${league}/${teamName?.replace(" ", "").toLowerCase()}.png`}
          width={100}
          height={100}
          alt="team logo"
          className="w-11 object-contain md:w-12"
        />
      </Link>

      <div className="flex flex-col gap-1">
        <Link href={`/${league}/team/${name[1]}/home`}>
          <p className="team-link text-[14px] font-[400] md:text-base">
            {name[0]}
          </p>
        </Link>
        <div className="flex flex-row justify-start gap-1">
          <Link href={`/${league}/team/${name[1]}/stats`}>
            <p className="anchor-link border-r border-[rgba(0,0,0,0.1)] pr-1 text-[11px]">
              Statistics
            </p>
          </Link>
          <Link href={`/${league}/team/${name[1]}/schedule`}>
            <p className="anchor-link border-r border-[rgba(0,0,0,0.1)] pr-1 text-[11px]">
              Schedule
            </p>
          </Link>
          <Link href={`/${league}/team/${name[1]}/roster`}>
            <p className="anchor-link border-r border-[rgba(0,0,0,0.1)] pr-1 text-[11px]">
              Roster
            </p>
          </Link>
          <Link href={`/${league}/team/${name[1]}/roster`}>
            <p className="anchor-link text-[11px]">Depth Chart</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
