import { Box, Typography, Divider } from "@mui/material";

export default function PlayerSideCard() {
  return (
    <Box className="flex justify-start flex-row items-center gap-2 my-2">
      <img
        className="w-7 object-contain"
        src={`https://a.espncdn.com/i/headshots/nfl/players/full/4046557.png`}
      />
      <Typography>M. Jenkins</Typography>
    </Box>
  );
}
