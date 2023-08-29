import { Box, Stack, CircularProgress } from "@mui/material";

function loading() {
  return (
    <Box className="w-screen h-screen flex justify-center items-center">
      <CircularProgress />
    </Box>
  );
}

export default loading;
