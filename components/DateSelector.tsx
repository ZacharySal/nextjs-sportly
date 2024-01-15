"use client";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

export default function DateSelector() {
  const currentDate = "08/21/2023";
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        sx={{
          "& input": {
            fontStyle: "bold",
            borderColor: "white",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white",
            },
            "&:hover fieldset": {},
            "&.Mui-focused fieldset": {},
          },
        }}
        label="Select Date"
        defaultValue={dayjs("2022-04-17")}
        slotProps={{ textField: { size: "small" } }}
      />
    </LocalizationProvider>
  );
}
