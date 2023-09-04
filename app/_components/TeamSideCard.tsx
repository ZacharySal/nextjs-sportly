"use client";

import { Box, Typography, Divider } from "@mui/material";
import { nameExceptions } from "../_lib/constants";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
        <img
          className="w-7 object-contain"
          src={`/${league}/${teamName?.replace(" ", "")}.png`}
        />
        <Typography className="text-sm">{name[0]}</Typography>
      </Box>
    </Link>
  );
}
