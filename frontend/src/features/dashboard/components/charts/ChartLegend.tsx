"use client";

import { formatPrice } from "@/utils/formatters";
import { Stack, Typography } from "@mui/material";

type ChartLegendItem = {
  color: string;
  label: string;
  value: number;
};

type ChartLegendProps = {
  items: ChartLegendItem[];
};

export default function ChartLegend({ items }: ChartLegendProps) {
  return (
    <Stack spacing={1.5} mt={2}>
      {items.map((item) => (
        <Stack
          key={item.label}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: item.color,
                display: "inline-block",
              }}
            />

            <Typography variant="body2">{item.label}</Typography>
          </Stack>

          <Typography variant="body2" fontWeight={700}>
            {formatPrice(item.value)}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}
