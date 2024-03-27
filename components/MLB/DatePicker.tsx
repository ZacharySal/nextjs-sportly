import * as React from "react";
import Button from "@mui/material/Button";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { UseDateFieldProps } from "@mui/x-date-pickers/DateField";
import {
  BaseSingleInputFieldProps,
  DateValidationError,
  FieldSection,
} from "@mui/x-date-pickers/models";
import CalendarMonthOutlined from "@mui/icons-material/CalendarMonthOutlined";
import Paper from "@mui/material/Paper";

interface ButtonFieldProps
  extends UseDateFieldProps<any>,
    BaseSingleInputFieldProps<
      any | null,
      any,
      FieldSection,
      DateValidationError
    > {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

function ButtonField(props: ButtonFieldProps) {
  const {
    setOpen,
    id,
    disabled,
    InputProps: { ref } = {},
    inputProps: { "aria-label": ariaLabel } = {},
  } = props;

  return (
    <Button
      style={{ minWidth: 0 }}
      id={id}
      disabled={disabled}
      ref={ref}
      aria-label={ariaLabel}
      onClick={() => setOpen?.((prev) => !prev)}
    >
      <Paper elevation={1} className="relative bg-white p-3">
        <CalendarMonthOutlined style={{ color: "black" }} />
      </Paper>
    </Button>
  );
}

export default function ButtonDatePicker(
  props: Omit<DatePickerProps<any>, "open" | "onOpen" | "onClose">,
) {
  const [open, setOpen] = React.useState(false);

  return (
    <DatePicker
      slots={{ field: ButtonField, ...props.slots }}
      slotProps={{ field: { setOpen } as any }}
      {...props}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    />
  );
}
