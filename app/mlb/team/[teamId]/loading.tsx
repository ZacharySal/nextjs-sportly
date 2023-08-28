import { Box, Stack, CircularProgress } from "@mui/material";

function loading() {
  return (
    <Stack alignItems="center">
      <CircularProgress />
    </Stack>
  );
}

export default loading;
