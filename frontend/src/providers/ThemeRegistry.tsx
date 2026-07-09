"use client";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { useEffect, useMemo, useState } from "react";
import { getTheme } from "@/theme/theme";
import { useAppSelector } from "@/lib/redux/hooks";

export default function ThemeRegistry({
    children,
}: {
    children: React.ReactNode;
}) {
    const mode = useAppSelector((state) => state.theme.mode);

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
