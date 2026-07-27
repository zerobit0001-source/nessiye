import { createTheme } from "@mui/material/styles";

export const getTheme = (mode: "light" | "dark") =>
  createTheme({
    direction: "rtl",

    palette: {
      mode,

      ...(mode === "light" && {
        background: {
          default: "#F8FAFC",
          paper: "#FCFCFD",
        },
      }),
    },

    typography: {
      fontFamily: "var(--font-vazir)",
    },
  });