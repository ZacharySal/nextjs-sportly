import { Box, CircularProgress } from "@mui/material";

function Loading() {
  return (
    <Box className="w-full h-80 flex justify-center items-center">
      <CircularProgress />
    </Box>
  );
}

export default Loading;
