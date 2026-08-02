"use client";

import { useTheme } from "@mui/material/styles";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { formatCompactPrice, formatDate } from "@/utils/formatters";
import ChartTooltip from "./ChartTooltip";

type SalesTrend = {
  date: string;
  cash: number;
  debt: number;
  total: number;
};

type ReportSaleTrenChartProps = {
  data: SalesTrend[];
};

export default function ReportSaleTrenChart({
  data,
}: ReportSaleTrenChartProps) {
  const theme = useTheme();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
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
              month: "numeric",
              day: "numeric",
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
            stroke: theme.palette.primary.main,
            strokeWidth: 1,
            strokeDasharray: "5 5",
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
        <Line
          type="monotone"
          dataKey="debt"
          stroke={theme.palette.error.main}
          strokeWidth={3}
          dot={{ r: 3 }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="cash"
          stroke={theme.palette.success.main}
          strokeWidth={3}
          dot={{ r: 3 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
