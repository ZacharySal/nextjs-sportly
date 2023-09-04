import { Box, Stack, CircularProgress } from "@mui/material";

function loading() {
  return (
    <Box className="w-full h-80 flex justify-center items-center">
      <CircularProgress />
    </Box>
  );
}

export default loading;
