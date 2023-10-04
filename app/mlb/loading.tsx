import { Box, CircularProgress } from "@mui/material";

function loading() {
  return (
    <Box className="w-full h-92 flex justify-center items-center">
      <CircularProgress />
    </Box>
  );
}

export default loading;
