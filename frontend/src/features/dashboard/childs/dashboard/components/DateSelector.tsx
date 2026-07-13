import {
  Button,
} from "@mui/material";

import {
  CalendarMonthOutlined,
  KeyboardArrowDown,
} from "@mui/icons-material";


export default function DateSelector() {
  return (
    <Button
      variant="outlined"
      endIcon={<CalendarMonthOutlined />}
      startIcon={<KeyboardArrowDown />}
      sx={{
        direction: "rtl",
        height: 40,
        px: 2,
        borderRadius: 2,
        borderColor: "#dbe3ef",
        color: "#1f2937",
        fontWeight: 700,
        fontSize: 14,
        textTransform: "none",
        gap: 1,

        "&:hover": {
          borderColor: "#b8c4d6",
          backgroundColor: "transparent",
        },

        "& .MuiButton-startIcon": {
          marginLeft: 0,
          marginRight: 0,
        },

        "& .MuiButton-endIcon": {
          marginLeft: 0,
          marginRight: 0,
        },
      }}
    >
      امروز
    </Button>
  );
}