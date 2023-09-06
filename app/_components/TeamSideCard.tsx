"use client";

import { Box, Typography, Divider } from "@mui/material";
import { nameExceptions } from "../_lib/constants";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function TeamSideCard({
  name,
  league,
}: {
  name: string;
  league: string;
}) {
  const router = useRouter();
  let parts = name[0].split(" ");
  let teamName = parts.pop();
  let location = parts.join(" ");

  if (nameExceptions.includes(name[0])) {
    parts = name[0].split(" ");
    parts.shift();
    teamName = parts.join(" ");
  }

  return (
    <Link href={`/${league}/team/${name[1]}`}>
      <Box
        sx={{ cursor: "pointer" }}
        className="flex justify-start flex-row items-center gap-1 mt-2"
      >
        <Image
          src={`/${league}/${teamName?.replace(" ", "").toLowerCase()}.png`}
          width={100}
          height={100}
          alt="team logo"
          className="w-7 object-contain"
        />
        <Typography className="text-sm">{name[0]}</Typography>
      </Box>
    </Link>
  );
}
