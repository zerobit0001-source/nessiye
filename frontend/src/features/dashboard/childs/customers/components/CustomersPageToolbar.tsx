"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  OutlinedInput,
  Stack,
} from "@mui/material";

import {
  Search,
  Tune,
  ImportExport,
  ErrorOutline,
  AccessTime,
  CheckCircleOutline,
} from "@mui/icons-material";

export default function CustomersPageToolbar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(
    null,
  );

  const filtering = searchParams.get("filtering") ?? "all";
  const ordering = searchParams.get("ordering") ?? "-amount";

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
  }, [search, router]);

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    switch (key) {
      case "ordering":
        if (value === "-amount") {
          params.delete("ordering");
        } else {
          params.set("ordering", value);
        }
        break;

      case "filtering":
        if (value === "all") {
          params.delete("filtering");
        } else {
          params.set("filtering", value);
        }
        break;

      default:
        params.set(key, value);
    }

    router.replace(`?${params.toString()}`);
  };

  return (
    <>
      <Stack
        direction={{ xs: "column", lg: "row" }}
        spacing={2}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", lg: "center" }}
      >
        {/* Search */}
        <OutlinedInput
          fullWidth
          size="small"
          placeholder="جستجو بر اساس نام یا شماره تماس"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <Search />
            </InputAdornment>
          }
          sx={{
            maxWidth: 420,
            borderRadius: 4,
          }}
        />

        <Stack direction="row" spacing={1}>
          {/* Sorting */}
          <Button
            variant="outlined"
            startIcon={<ImportExport />}
            onClick={(e) => setSortAnchorEl(e.currentTarget)}
            sx={{
              borderRadius: 3,
              whiteSpace: "nowrap",
            }}
          >
            مرتب‌سازی
          </Button>

          <Menu
            anchorEl={sortAnchorEl}
            open={Boolean(sortAnchorEl)}
            onClose={() => setSortAnchorEl(null)}
          >
            <MenuItem
              selected={ordering === "-amount"}
              onClick={() => {
                updateParam("ordering", "-amount");
                setSortAnchorEl(null);
              }}
            >
              بیشترین بدهی
            </MenuItem>

            <MenuItem
              selected={ordering === "amount"}
              onClick={() => {
                updateParam("ordering", "amount");
                setSortAnchorEl(null);
              }}
            >
              کمترین بدهی
            </MenuItem>

            <MenuItem
              selected={ordering === "-created_at"}
              onClick={() => {
                updateParam("ordering", "-created_at");
                setSortAnchorEl(null);
              }}
            >
              جدیدترین
            </MenuItem>

            <MenuItem
              selected={ordering === "created_at"}
              onClick={() => {
                updateParam("ordering", "created_at");
                setSortAnchorEl(null);
              }}
            >
              قدیمی‌ترین
            </MenuItem>
          </Menu>

          {/* Filter */}
          <IconButton
            onClick={(e) => setFilterAnchorEl(e.currentTarget)}
            color={filtering !== "all" ? "primary" : "default"}
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

          <Menu
            anchorEl={filterAnchorEl}
            open={Boolean(filterAnchorEl)}
            onClose={() => setFilterAnchorEl(null)}
          >
            <MenuItem
              selected={filtering === "all"}
              onClick={() => {
                updateParam("filtering", "all");
                setFilterAnchorEl(null);
              }}
            >
              <ListItemText>همه</ListItemText>
            </MenuItem>

            <MenuItem
              selected={filtering === "active"}
              onClick={() => {
                updateParam("filtering", "active");
                setFilterAnchorEl(null);
              }}
            >
              <ListItemIcon>
                <ErrorOutline color="warning" />
              </ListItemIcon>

              <ListItemText>فعال</ListItemText>
            </MenuItem>

            <MenuItem
              selected={filtering === "overdue"}
              onClick={() => {
                updateParam("filtering", "overdue");
                setFilterAnchorEl(null);
              }}
            >
              <ListItemIcon>
                <AccessTime color="error" />
              </ListItemIcon>

              <ListItemText>سررسید گذشته</ListItemText>
            </MenuItem>

            <MenuItem
              selected={filtering === "settled"}
              onClick={() => {
                updateParam("filtering", "settled");
                setFilterAnchorEl(null);
              }}
            >
              <ListItemIcon>
                <CheckCircleOutline color="success" />
              </ListItemIcon>

              <ListItemText>تسویه شده</ListItemText>
            </MenuItem>
          </Menu>
        </Stack>
      </Stack>
    </>
  );
}
