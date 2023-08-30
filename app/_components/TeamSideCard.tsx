"use client";

import { Box, Typography, Divider } from "@mui/material";
import { nameExceptions } from "../_lib/constants";
import { useRouter } from "next/navigation";

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
    <Box
      sx={{ cursor: "pointer" }}
      onClick={() => router.push(`/${league}/team/${name[1]}`)}
      className="flex justify-start flex-row items-center gap-2 mt-2"
    >
      <img
        className="w-7 object-contain"
        src={`/${league}/${teamName?.replace(" ", "")}.png`}
      />
      <Typography className="text-base">{name[0]}</Typography>
    </Box>
  );
}
