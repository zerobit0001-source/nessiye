"use client";

import { useMemo } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import ChartTooltip from "./ChartTooltip";

type PaymentDistribution = {
  cash: number;
  debt: number;
};

type ReportPaymentDistributionChartProps = {
  data: PaymentDistribution;
};

export default function ReportPaymentDistributionChart({
  data,
}: ReportPaymentDistributionChartProps) {
  const theme = useTheme();

  const chartData = useMemo(
    () => [
      {
        name: "نقدی",
        value: data.cash,
        color: theme.palette.success.main,
      },
      {
        name: "نسیه",
        value: data.debt,
        color: theme.palette.warning.main,
      },
    ],
    [data, theme],
  );

  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Tooltip content={<ChartTooltip />} />

        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          innerRadius={65}
          outerRadius={95}
          paddingAngle={4}
          stroke="none"
        >
          {chartData.map((item) => (
            <Cell
              key={item.name}
              fill={item.color}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}