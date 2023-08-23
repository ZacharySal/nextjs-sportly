import { Box, Typography, Divider } from "@mui/material";

export default function TeamSideCard() {
  return (
    <Box className="flex justify-start flex-row items-center gap-1 my-2">
      <img className="w-5 object-contain" src="saints-logo.png" />
      <Typography>New Orleans Saints</Typography>
    </Box>
  );
}
