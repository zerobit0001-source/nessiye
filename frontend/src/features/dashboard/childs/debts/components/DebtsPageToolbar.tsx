"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Box,
  Card,
  FormControl,
  IconButton,
  InputAdornment,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import {
  CheckCircleOutline,
  DownloadOutlined,
  FilterAltOutlined,
  PendingOutlined,
  Search,
  WarningAmberOutlined,
} from "@mui/icons-material";

export default function DebtsPageToolbar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") ?? "");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const openFilter = Boolean(anchorEl);

  const status = searchParams.get("status") ?? "all";
  const ordering = searchParams.get("ordering") ?? "-created_at";

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
        if (value === "-created_at") {
          params.delete("ordering");
        } else {
          params.set("ordering", value);
        }
        break;

      case "status":
        if (value === "all") {
          params.delete("status");
        } else {
          params.set("status", value);
        }
        break;

      default:
        params.set(key, value);
    }

    router.replace(`?${params.toString()}`);
  };

  const handleOpenFilter = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseFilter = () => {
    setAnchorEl(null);
  };

  const handleSelectStatus = (value: string) => {
    updateParam("status", value);
    handleCloseFilter();
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
        {/* Filter */}
        <IconButton
          onClick={handleOpenFilter}
          sx={{
            border: "1px solid",
            borderColor: "divider",
            width: 42,
            height: 42,
          }}
        >
          <FilterAltOutlined />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={openFilter}
          onClose={handleCloseFilter}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem
            selected={status === "all"}
            onClick={() => handleSelectStatus("all")}
          >
            <ListItemText>همه</ListItemText>
          </MenuItem>

          <MenuItem
            selected={status === "settled"}
            onClick={() => handleSelectStatus("settled")}
          >
            <ListItemIcon>
              <CheckCircleOutline color="success" />
            </ListItemIcon>

            <ListItemText>پرداخت شده</ListItemText>
          </MenuItem>

          <MenuItem
            selected={status === "active"}
            onClick={() => handleSelectStatus("active")}
          >
            <ListItemIcon>
              <PendingOutlined color="warning" />
            </ListItemIcon>

            <ListItemText>پرداخت نشده</ListItemText>
          </MenuItem>

          <MenuItem
            selected={status === "overdue"}
            onClick={() => handleSelectStatus("overdue")}
          >
            <ListItemIcon>
              <WarningAmberOutlined color="error" />
            </ListItemIcon>

            <ListItemText>تاریخ گذشته</ListItemText>
          </MenuItem>
        </Menu>

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

            <MenuItem value="-amount">بیشترین مبلغ</MenuItem>

            <MenuItem value="amount">کمترین مبلغ</MenuItem>
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
      </Box>
    </Card>
  );
}
