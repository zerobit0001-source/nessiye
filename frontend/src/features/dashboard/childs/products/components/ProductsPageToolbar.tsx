"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Box,
  Card,
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from "@mui/material";
import {
  DownloadOutlined,
  FilterAltOutlined,
  Search,
} from "@mui/icons-material";

export default function ProductsPageToolbar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchParamsString = searchParams.toString();

  const [search, setSearch] = useState(searchParams.get("search") ?? "");

  const ordering = searchParams.get("ordering") ?? "-created_at";

  const stockStatus = searchParams.get("stock_status") ?? "all";

  // Keep input synced with URL (Back/Forward navigation)
  useEffect(() => {
    setSearch(searchParams.get("search") ?? "");
  }, [searchParams]);

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParamsString);

      if (!value || value === "all") {
        params.delete(key);
      } else {
        params.set(key, value);
      }

      // Reset pagination whenever filters change
      params.delete("page");

      router.replace(`?${params.toString()}`);
    },
    [router, searchParamsString],
  );

  // Search debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParamsString);

      if (search.trim()) {
        params.set("search", search.trim());
      } else {
        params.delete("search");
      }

      params.delete("page");

      router.replace(`?${params.toString()}`);
    }, 500);

    return () => clearTimeout(timer);
  }, [search, router, searchParamsString]);

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
        <Tooltip title="Export">
          <span>
            <IconButton
              disabled
              sx={{
                width: 42,
                height: 42,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <DownloadOutlined />
            </IconButton>
          </span>
        </Tooltip>

        <Tooltip title="Advanced Filters">
          <span>
            <IconButton
              disabled
              sx={{
                width: 42,
                height: 42,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <FilterAltOutlined />
            </IconButton>
          </span>
        </Tooltip>

        <FormControl
          size="small"
          sx={{
            minWidth: {
              xs: "100%",
              sm: 180,
            },
            flexShrink: 0,
          }}
        >
          <Select
            value={ordering}
            onChange={(e) => updateParam("ordering", e.target.value)}
          >
            <MenuItem value="-created_at">جدیدترین</MenuItem>

            <MenuItem value="created_at">قدیمی‌ترین</MenuItem>

            <MenuItem value="-price">بیشترین قیمت</MenuItem>

            <MenuItem value="price">کمترین قیمت</MenuItem>

            <MenuItem value="name">نام (A-Z)</MenuItem>

            <MenuItem value="-name">نام (Z-A)</MenuItem>
          </Select>
        </FormControl>

        <OutlinedInput
          size="small"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="جستجو بر اساس نام، بارکد یا کد کالا..."
          endAdornment={
            <InputAdornment position="end">
              <Search />
            </InputAdornment>
          }
          sx={{
            flex: 1,
            minWidth: {
              xs: "100%",
              md: 300,
            },
          }}
        />

        <ToggleButtonGroup
          exclusive
          value={stockStatus}
          onChange={(_, value) => {
            if (value !== null) {
              updateParam("stock_status", value);
            }
          }}
          sx={{
            flexShrink: 0,
            overflowX: "auto",

            "& .MuiToggleButton-root": {
              textTransform: "none",
              px: 2,
              height: 40,
              whiteSpace: "nowrap",
            },
          }}
        >
          <ToggleButton value="all">همه</ToggleButton>

          <ToggleButton value="stock">موجود</ToggleButton>

          <ToggleButton value="low_stock">کم موجود</ToggleButton>

          <ToggleButton value="non_stock">ناموجود</ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Card>
  );
}
