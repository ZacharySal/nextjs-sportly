import { Box, Typography, Divider } from "@mui/material";

export default function TeamSideCard({
  name,
  league,
}: {
  name: string;
  league: string;
}) {
  const parts = name.split(" ");
  const teamName = parts.pop();
  const location = parts.join(" ");

  return (
    <Box
      sx={{ cursor: "pointer" }}
      className="flex justify-start flex-row items-center gap-2 mt-2"
    >
      <img className="w-7 object-contain" src={`/${league}/${teamName}.png`} />
      <Typography className="text-base">{name}</Typography>
    </Box>
  );
}
