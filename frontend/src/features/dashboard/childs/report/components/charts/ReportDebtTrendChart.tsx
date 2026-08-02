"use client";

import { useTheme } from "@mui/material/styles";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { formatCompactPrice, formatDate } from "@/utils/formatters";
import ChartTooltip from "./ChartTooltip";

type DebtsTrend = {
  date: string;
  total: number;
  count: number;
};

type ReportDebtTrenChartProps = {
  data: DebtsTrend[];
};

export default function ReportDebtTrenChart({
  data,
}: ReportDebtTrenChartProps) {
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
          left: 10,
          bottom: 10,
        }}
      >
        <CartesianGrid
          vertical={false}
          stroke={theme.palette.divider}
          strokeDasharray="4 4"
        />

        <XAxis
          dataKey="date"
          tickFormatter={(value) =>
            formatDate(value, {
              day: "numeric",
              month: "short",
            })
          }
          tick={{ fill: theme.palette.text.secondary }}
        />

        <YAxis
          tickFormatter={formatCompactPrice}
          tick={{ fill: theme.palette.text.secondary }}
        />

        <Tooltip
          cursor={{
            fill: `${theme.palette.error.main}15`,
          }}
          content={<ChartTooltip />}
        />

        <Bar
          dataKey="total"
          name="نسیه ثبت‌شده"
          fill={theme.palette.error.main}
          radius={[8, 8, 0, 0]}
          barSize={28}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
