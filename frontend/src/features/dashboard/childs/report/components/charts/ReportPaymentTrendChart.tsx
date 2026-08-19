"use client";

import { useTheme } from "@mui/material/styles";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { formatCompactPrice, formatDate } from "@/utils/formatters";
import ChartTooltip from "./ChartTooltip";

type PaymentsTrend = {
  date: string;
  total: number;
  count: number;
};

type ReportPaymentTrendChartProps = {
  data: PaymentsTrend[];
};

export default function ReportPaymentTrendChart({
  data,
}: ReportPaymentTrendChartProps) {
  const theme = useTheme();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
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
        <defs>
          <linearGradient id="paymentsGradient" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={theme.palette.success.main}
              stopOpacity={0.35}
            />
            <stop
              offset="95%"
              stopColor={theme.palette.success.main}
              stopOpacity={0}
            />
          </linearGradient>
        </defs>

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
            stroke: theme.palette.success.main,
            strokeDasharray: "5 5",
          }}
          content={<ChartTooltip />}
        />

        <Area
          type="monotone"
          dataKey="total"
          name="دریافتی"
          stroke={theme.palette.success.main}
          strokeWidth={3}
          fill="url(#paymentsGradient)"
          // dot={{ r: 3 }}
          // activeDot={{ r: 6 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
