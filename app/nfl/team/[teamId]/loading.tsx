import { Box, Stack, CircularProgress } from "@mui/material";

function loading() {
  return (
    <Box className="w-full h-full flex justify-center items-center">
      <CircularProgress />
    </Box>
  );
}

export default loading;
