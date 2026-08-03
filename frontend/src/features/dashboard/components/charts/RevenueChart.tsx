"use client";

import {
  formatChartDate,
  formatCompactPrice,
  formatPrice,
} from "@/utils/formatters";
import { Card, Stack, Typography, useTheme } from "@mui/material";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type SalesTrend = {
  date: string;
  total: number;
};

type RevenueChartProps = {
  data: SalesTrend[];
};

export default function RevenueChart({ data }: RevenueChartProps) {
  const theme = useTheme();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        style={{
          fontFamily: "Vazirmatn",
          direction: "ltr",
        }}
        margin={{
          top: 10,
          right: 10,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid
          vertical={false}
          strokeDasharray="3 3"
          stroke={theme.palette.divider}
        />

        <XAxis
          dataKey="date"
          tickFormatter={formatChartDate}
          tick={{ fontSize: 13 }}
          axisLine={false}
          tickLine={false}
        />

        <YAxis
          tickFormatter={formatCompactPrice}
          tick={{ fontSize: 13 }}
          axisLine={false}
          tickLine={false}
        />

        <Tooltip
          cursor={{
            stroke: theme.palette.success.main,
            strokeWidth: 1,
            strokeDasharray: "5 5",
            fill: "rgba(76,175,80,0.08)",
          }}
          content={<ChartTooltip />}
        />

        <Bar
          dataKey="total"
          fill={theme.palette.success.main}
          radius={[8, 8, 0, 0]}
          maxBarSize={48}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

type ChartTooltipProps = {
  active?: boolean;
  payload?: any[];
  label?: string;
};

function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <Card
      elevation={3}
      sx={{
        px: 2,
        py: 1.5,
        minWidth: 180,
        direction: "rtl",
        borderRadius: 2,
      }}
    >
      <Stack spacing={0.5}>
        <Typography variant="body2" color="text.secondary">
          {label ? formatChartDate(label) : "-"}
        </Typography>

        <Typography variant="body1" fontWeight={700} color="success.main">
          {formatPrice(payload[0].value)} تومان
        </Typography>
      </Stack>
    </Card>
  );
}
