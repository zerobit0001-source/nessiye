"use client";

import { Search } from "@mui/icons-material";
import { InputBase, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function DashboardNavBarSearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("q") ?? "";

  const [searchValue, setSearchValue] = useState(query);

  useEffect(() => {
    setSearchValue(query);
  }, [query]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const value = searchValue.trim();

      if (!value) {
        router.replace("/dashboard");
        return;
      }

      if (value.length > 2) {
        router.replace(`/dashboard/search?q=${encodeURIComponent(value)}`);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchValue, router]);

  return (
    <Paper
      elevation={0}
      sx={{
        width: 380,
        display: "flex",
        alignItems: "center",
        px: 2,
        py: 0.5,
        borderRadius: 999,
        bgcolor: "action.hover",
        border: 1,
        borderColor: "divider",
      }}
      className="hidden lg:flex"
    >
      <Search
        sx={{
          color: "text.secondary",
          mr: 1,
        }}
      />

      <InputBase
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        placeholder="جستجوی مشتری، بدهی یا پرداخت..."
        sx={{
          flex: 1,
        }}
      />
    </Paper>
  );
}
