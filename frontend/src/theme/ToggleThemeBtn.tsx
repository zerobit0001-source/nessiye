"use client";
import { toggleTheme } from "@/features/theme/themeSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { DarkModeRounded, LightModeRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";

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
