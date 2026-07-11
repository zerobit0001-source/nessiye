import { createTheme } from "@mui/material/styles";

export const getTheme = (mode: "light" | "dark") =>
    createTheme({
        direction: "rtl",
        
        palette: {
            mode,
        },
        typography: {
            fontFamily: "var(--font-vazir)",
        },
    });