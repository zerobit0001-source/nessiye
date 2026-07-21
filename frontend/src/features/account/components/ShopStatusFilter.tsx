"use client";

import { Chip, Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ShopStatusFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentStatus = searchParams.get("status") ?? "all";

  const handleChange = (value: string | null) => {
    if (!value) return;

    const params = new URLSearchParams(searchParams);

    if (value === "all") {
      params.delete("status");
    } else {
      params.set("status", value);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Stack direction="row" spacing={1} flexWrap="wrap">
      <Chip
        label="همه"
        clickable
        color={
          !currentStatus || currentStatus === "all" ? "primary" : "default"
        }
        variant={
          !currentStatus || currentStatus === "all" ? "filled" : "outlined"
        }
        onClick={() => handleChange("all")}
      />

      <Chip
        label="فعال"
        clickable
        color={currentStatus === "active" ? "primary" : "default"}
        variant={currentStatus === "active" ? "filled" : "outlined"}
        onClick={() => handleChange("active")}
      />

      <Chip
        label="سررسید شده"
        clickable
        color={currentStatus === "overdue" ? "error" : "default"}
        variant={currentStatus === "overdue" ? "filled" : "outlined"}
        onClick={() => handleChange("overdue")}
      />

      <Chip
        label="تسویه شده"
        clickable
        color={currentStatus === "settled" ? "success" : "default"}
        variant={currentStatus === "settled" ? "filled" : "outlined"}
        onClick={() => handleChange("settled")}
      />
    </Stack>
  );
}
