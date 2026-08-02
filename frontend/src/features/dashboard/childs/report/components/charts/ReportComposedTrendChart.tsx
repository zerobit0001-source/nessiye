"use client";

import { useTheme } from "@mui/material/styles";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { formatCompactPrice, formatDate } from "@/utils/formatters";
import ChartTooltip from "./ChartTooltip";

type ComposedTrend = {
  date: string;
  sales: number;
  payments: number;
};

type ReportComposedTrendChartProps = {
  data: ComposedTrend[];
};

export default function ReportComposedTrendChart({
  data,
}: ReportComposedTrendChartProps) {
  const theme = useTheme();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart
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
            stroke: theme.palette.info.main,
            strokeDasharray: "5 5",
          }}
          content={<ChartTooltip />}
        />

        <Bar
          dataKey="sales"
          name="فروش"
          fill={theme.palette.warning.main}
          radius={[8, 8, 0, 0]}
          barSize={28}
        />

        <Line
          type="monotone"
          dataKey="payments"
          name="دریافتی"
          stroke={theme.palette.success.main}
          strokeWidth={3}
          dot={{ r: 3 }}
          activeDot={{ r: 6 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
