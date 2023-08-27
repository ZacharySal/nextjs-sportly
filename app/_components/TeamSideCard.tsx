import { Box, Typography, Divider } from "@mui/material";
import { nameExceptions } from "../_lib/constants";
export default function TeamSideCard({
  name,
  league,
}: {
  name: string;
  league: string;
}) {
  let parts = name.split(" ");
  let teamName = parts.pop();
  let location = parts.join(" ");

  if (nameExceptions.includes(name)) {
    parts = name.split(" ");
    parts.shift();
    teamName = parts.join(" ");
  }

  return (
    <Box
      sx={{ cursor: "pointer" }}
      className="flex justify-start flex-row items-center gap-2 mt-2"
    >
      <img
        className="w-7 object-contain"
        src={`/${league}/${teamName?.replace(" ", "")}.png`}
      />
      <Typography className="text-base">{name}</Typography>
    </Box>
  );
}
