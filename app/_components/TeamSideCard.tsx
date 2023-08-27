import { Box, Typography, Divider } from "@mui/material";

export default function TeamSideCard({ name }: { name: string }) {
  const parts = name.split(" ");
  const teamName = parts.pop();
  const location = parts.join(" ");

  return (
    <Box
      sx={{ cursor: "pointer" }}
      className="flex justify-start flex-row items-center gap-2 mt-2"
    >
      <img className="w-7 object-contain" src={`nfl/${teamName}.png`} />
      <Typography className="text-base">{name}</Typography>
    </Box>
  );
}
