"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
    Card,
    Stack,
    Chip,
    OutlinedInput,
    InputAdornment,
    FormControl,
    Select,
    MenuItem,
    IconButton,
    Box,
} from "@mui/material";
import {
    Search,
    Tune,
    PeopleOutline,
    ErrorOutline,
    AccessTime,
    CheckCircleOutline,
} from "@mui/icons-material";

const filters = [
    {
        label: "همه",
        value: "all",
        icon: <PeopleOutline fontSize="small" />,
    },
    {
        label: "دارای بدهی",
        value: "debt",
        icon: <ErrorOutline fontSize="small" />,
    },
    {
        label: "معوق",
        value: "overdue",
        icon: <AccessTime fontSize="small" />,
    },
    {
        label: "تسویه‌شده",
        value: "paid",
        icon: <CheckCircleOutline fontSize="small" />,
    },
];

export default function DebtsPageToolbar() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState(searchParams.get("search") ?? "");

    const status = searchParams.get("status") ?? "all";
    const ordering = searchParams.get("ordering") ?? "-remaining_amount";

    useEffect(() => {
        const timer = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());

            if (search.trim()) {
                params.set("search", search);
            } else {
                params.delete("search");
            }

            router.replace(`?${params.toString()}`);
        }, 500);

        return () => clearTimeout(timer);
    }, [search, router, searchParams]);

    const changeStatus = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value === "all") {
            params.delete("status");
        } else {
            params.set("status", value);
        }

        router.replace(`?${params.toString()}`);
    };

    const changeOrdering = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        params.set("ordering", value);

        router.replace(`?${params.toString()}`);
    };

    return (
        <Card
            elevation={0}
            sx={{
                p: 1,
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
            }}
        >
            <Box
                className="
            flex
            flex-wrap
            items-center
            gap-3
        "
            >
                {/* Search */}
                <OutlinedInput
                    size="small"
                    placeholder="جستجو..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    endAdornment={
                        <InputAdornment position="end">
                            <Search />
                        </InputAdornment>
                    }
                    sx={{
                        width: {
                            xs: "100%",
                            md: 280,
                        },
                    }}
                />

                {/* Filters */}
                <Stack direction="row" spacing={1}>
                    {filters.map((item) => (
                        <Chip
                            key={item.value}
                            clickable
                            icon={item.icon}
                            label={item.label}
                            color={
                                status === item.value ? "primary" : "default"
                            }
                            variant={
                                status === item.value ? "filled" : "outlined"
                            }
                            onClick={() => changeStatus(item.value)}
                        />
                    ))}
                </Stack>

                {/* Spacer */}
                <Box sx={{ flexGrow: 1 }} />

                {/* Sort */}
                <FormControl
                    size="small"
                    sx={{
                        minWidth: 180,
                    }}
                >
                    <Select
                        value={ordering}
                        onChange={(e) => changeOrdering(e.target.value)}
                    >
                        <MenuItem value="-remaining_amount">
                            بیشترین بدهی
                        </MenuItem>

                        <MenuItem value="remaining_amount">
                            کمترین بدهی
                        </MenuItem>

                        <MenuItem value="-created_at">جدیدترین</MenuItem>

                        <MenuItem value="created_at">قدیمی‌ترین</MenuItem>
                    </Select>
                </FormControl>

                <IconButton
                    sx={{
                        border: "1px solid",
                        borderColor: "divider",
                    }}
                >
                    <Tune />
                </IconButton>
            </Box>
        </Card>
    );
}
