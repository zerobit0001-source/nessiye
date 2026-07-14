"use client";

import {
    Box,
    Button,
    Chip,
    IconButton,
    OutlinedInput,
    Stack,
    InputAdornment,
} from "@mui/material";
import {
    Search,
    Tune,
    ImportExport,
    PeopleOutline,
    ErrorOutline,
    AccessTime,
    CheckCircleOutline,
} from "@mui/icons-material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const filters = [
    {
        label: "همه",
        icon: <PeopleOutline fontSize="small" />,
        active: true,
    },
    {
        label: "دارای بدهی",
        icon: <ErrorOutline fontSize="small" />,
    },
    {
        label: "معوق",
        icon: <AccessTime fontSize="small" />,
    },
    {
        label: "تسویه‌شده",
        icon: <CheckCircleOutline fontSize="small" />,
    },
];

export default function CustomersPageToolbar() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState(searchParams.get("search") ?? "");
    const [debouncedSearch, setDebouncedSearch] = useState(search);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    useEffect(() => {
        const params = new URLSearchParams(searchParams);

        if (debouncedSearch) {
            params.set("search", debouncedSearch);
        } else {
            params.delete("search");
        }

        router.replace(`?${params.toString()}`);
    }, [debouncedSearch]);
    return (
        <Stack
            direction={{ xs: "column", lg: "row" }}
            spacing={2}
            justifyContent="space-between"
            alignItems={{ xs: "stretch", lg: "center" }}
        >
            {/* Search */}
            <OutlinedInput
                fullWidth
                placeholder="جستجو بر اساس نام یا شماره تماس"
                size="small"
                endAdornment={
                    <InputAdornment position="end">
                        <Search color="action" />
                    </InputAdornment>
                }
                sx={{
                    maxWidth: 420,
                    borderRadius: 4,
                    bgcolor: "background.paper",
                }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {/* Actions */}
            <Stack direction="row" spacing={1} flexWrap="wrap">
                {filters.map((item) => (
                    <Chip
                        key={item.label}
                        clickable
                        icon={item.icon}
                        label={item.label}
                        color={item.active ? "primary" : "default"}
                        variant={item.active ? "filled" : "outlined"}
                        sx={{
                            borderRadius: 3,
                            height: 42,
                            px: 1,
                        }}
                    />
                ))}

                <Button
                    variant="outlined"
                    startIcon={<ImportExport />}
                    sx={{
                        borderRadius: 3,
                        px: 2,
                        whiteSpace: "nowrap",
                    }}
                >
                    مرتب‌سازی: بیشترین بدهی
                </Button>

                <IconButton
                    sx={{
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 3,
                        width: 44,
                        height: 44,
                    }}
                >
                    <Tune />
                </IconButton>
            </Stack>
        </Stack>
    );
}
