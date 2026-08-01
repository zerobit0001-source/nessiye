"use client";
import {
  formatCompactPrice,
  formatDate,
  formatPrice,
} from "@/utils/formatters";
import { Card, Stack, Typography, useTheme } from "@mui/material";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
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
      >
        <CartesianGrid />

        <XAxis
          dataKey="date"
          // minTickGap={25}
          // interval={1}
        />

        <YAxis
          dataKey="total"
          tickFormatter={(value) => formatCompactPrice(value)}
          fontSize={"14px"}
        />
        <Tooltip
          cursor={{
            stroke: theme.palette.success.main,
            strokeWidth: 1,
            strokeDasharray: "5 5",
            fill: "rgba(255,152,0,0.05)",
          }}
          content={<ChartTooltip />}
        />

        <Bar
          dataKey="total"
          fill={theme.palette.success.main}
          radius={[8, 8, 0, 0]}
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
      elevation={1}
      sx={{
        px: 2,
        py: 1.5,
        minWidth: 170,
        direction: "rtl",
      }}
      className="rounded-lg!"
    >
      <Stack spacing={0.5}>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>

        <Typography variant="body1" fontWeight={700} color="success.main">
          {formatPrice(payload[0].value)} تومان
        </Typography>
      </Stack>
    </Card>
  );
}
