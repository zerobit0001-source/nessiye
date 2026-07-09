"use client";
import { toggleTheme } from "@/features/theme/themeSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { DarkModeRounded, LightModeRounded } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import React from "react";

const ToggleThemeBtn = () => {
    const dispatch = useAppDispatch();
    const mode = useAppSelector((state) => state.theme.mode);

    return (
        <IconButton onClick={() => dispatch(toggleTheme())}>
            {mode === "light" ? <DarkModeRounded /> : <LightModeRounded />}
        </IconButton>
    );
};

export default ToggleThemeBtn;
