"use client";

import { Card, Stack, Typography } from "@mui/material";
import { formatDate, formatPrice } from "@/utils/formatters";

type ChartTooltipProps = {
  active?: boolean;
  payload?: Array<{
    color: string;
    dataKey: string;
    name: string;
    value: number;
  }>;
  label?: string;
};

export default function ChartTooltip({
  active,
  payload,
  label,
}: ChartTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <Card
      elevation={2}
      sx={{
        px: 2,
        py: 1.5,
        minWidth: 190,
        borderRadius: 2,
        direction: "rtl",
      }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
        mb={1}
        fontWeight={600}
      >
        {formatDate(label!, {
          weekday: "long",
          day: "numeric",
          month: "long",
        })}
      </Typography>

      <Stack spacing={1}>
        {payload.map((item) => (
          <Stack
            key={item.dataKey}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: item.color,
                  display: "inline-block",
                }}
              />

              <Typography variant="body2">
                {item.name}
              </Typography>
            </Stack>

            <Typography variant="body2" fontWeight={700}>
              {formatPrice(item.value)}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}