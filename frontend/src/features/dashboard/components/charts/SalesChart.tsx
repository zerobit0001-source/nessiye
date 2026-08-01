"use client";
import {
  formatCompactPrice,
  formatDate,
  formatPrice,
} from "@/utils/formatters";
import { Card, Stack, Typography, useTheme } from "@mui/material";
import {
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

type SalesChartProps = {
  data: SalesTrend[];
};

export default function SalesChart({ data }: SalesChartProps) {
  const theme = useTheme();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        style={{
          fontFamily: "Vazirmatn",
          direction: "ltr",
        }}
      >
        <CartesianGrid />

        <XAxis
          dataKey="date"
          tickFormatter={(value) =>
            formatDate(value, {
              weekday: "short",
            })
          }
        />
        <YAxis
          dataKey="total"
          tickFormatter={(value) => formatCompactPrice(value)}
          fontSize={"14px"}
        />
        <Tooltip
          cursor={{
            stroke: theme.palette.primary.main,
            strokeWidth: 1,
            strokeDasharray: "5 5",
            fill: "rgba(255,152,0,0.05)",
          }}
          content={<ChartTooltip />}
        />

        <Line
          type="monotone"
          dataKey="total"
          stroke={theme.palette.primary.main}
          strokeWidth={3}
          dot={{ r: 3 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
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
          {formatDate(label, { dateStyle: "long" })}
        </Typography>

        <Typography variant="body1" fontWeight={700} color="primary.main">
          {formatPrice(payload[0].value)} تومان
        </Typography>
      </Stack>
    </Card>
  );
}
