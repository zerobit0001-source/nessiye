"use client";

import { useEffect, useMemo } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";

import { getTheme } from "@/theme/theme";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setTheme } from "@/features/theme/themeSlice";

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.theme.mode);

  useEffect(() => {
    const saved = localStorage.getItem("theme");

    if (saved === "light" || saved === "dark") {
      dispatch(setTheme(saved));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("theme", mode);
  }, [mode]);

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <AppRouterCacheProvider
      options={{
        key: "mui",
        stylisPlugins: [prefixer, rtlPlugin],
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
