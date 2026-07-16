"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Box,
  Button,
  Card,
  Chip,
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import {
  DownloadOutlined,
  FilterAltOutlined,
  Search,
} from "@mui/icons-material";

export default function PaymentsPageToolbar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") ?? "");

  const status = searchParams.get("status") ?? "all";
  const ordering = searchParams.get("ordering") ?? "-created_at";
  const period = searchParams.get("period") ?? "month";

  // Search debounce
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

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (key === "status" && value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    router.replace(`?${params.toString()}`);
  };

  return (
    <Card
      elevation={0}
      sx={{
        p: 1.5,
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          flexWrap: {
            xs: "wrap",
            lg: "nowrap",
          },
        }}
      >
        {/* Export */}
        <IconButton
          sx={{
            border: "1px solid",
            borderColor: "divider",
            width: 42,
            height: 42,
          }}
        >
          <DownloadOutlined />
        </IconButton>

        {/* Filter */}
        <IconButton
          sx={{
            border: "1px solid",
            borderColor: "divider",
            width: 42,
            height: 42,
          }}
        >
          <FilterAltOutlined />
        </IconButton>

        {/* Sorting */}
        <FormControl
          size="small"
          sx={{
            minWidth: 180,
          }}
        >
          <Select
            value={ordering}
            onChange={(e) => updateParam("ordering", e.target.value)}
          >
            <MenuItem value="-created_at">جدیدترین</MenuItem>

            <MenuItem value="created_at">قدیمی‌ترین</MenuItem>

            <MenuItem value="-total_amount">بیشترین مبلغ</MenuItem>

            <MenuItem value="total_amount">کمترین مبلغ</MenuItem>
          </Select>
        </FormControl>

        {/* Search */}
        <OutlinedInput
          size="small"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="جستجو بر اساس نام مشتری یا شماره فاکتور"
          endAdornment={
            <InputAdornment position="end">
              <Search />
            </InputAdornment>
          }
          sx={{
            flex: 1,
            minWidth: 320,
            mx: 1,
          }}
        />

        {/* Status */}
        <Chip
          clickable
          label="همه"
          color={status === "all" ? "primary" : "default"}
          variant={status === "all" ? "filled" : "outlined"}
          onClick={() => updateParam("status", "all")}
        />

        {/* Period */}
        <ToggleButtonGroup
          exclusive
          value={period}
          onChange={(_, value) => {
            if (value) {
              updateParam("period", value);
            }
          }}
          sx={{
            "& .MuiToggleButton-root": {
              textTransform: "none",
              px: 2,
              height: 40,
            },
          }}
        >
          <ToggleButton value="today">امروز</ToggleButton>

          <ToggleButton value="week">هفته</ToggleButton>

          <ToggleButton value="month">ماه</ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Card>
  );
}
