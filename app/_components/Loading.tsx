import { Box, CircularProgress } from "@mui/material";

function Loading() {
  return (
    <Box className="w-full h-screen flex justify-center items-center">
      <CircularProgress />
    </Box>
  );
}

export default Loading;
