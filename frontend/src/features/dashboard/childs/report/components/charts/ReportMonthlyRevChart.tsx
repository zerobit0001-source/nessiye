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

import { formatCompactPrice, formatPrice } from "@/utils/formatters";

type MonthlyRevenue = {
  month: string;
  total: number;
};

type ReportMonthlyRevenueChartProps = {
  data: MonthlyRevenue[];
};

export default function ReportMonthlyRevenueChart({
  data,
}: ReportMonthlyRevenueChartProps) {
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
          dataKey="month"
          tickFormatter={(value) => {
            const [year, month] = value.split("-");

            const date = new Date(Number(year), Number(month) - 1, 1);

            return date.toLocaleDateString("fa-IR", {
              month: "long",
            });
          }}
          tick={{ fill: theme.palette.text.secondary }}
        />

        <YAxis
          tickFormatter={formatCompactPrice}
          tick={{ fill: theme.palette.text.secondary }}
        />

        <Tooltip
          cursor={{
            fill: `${theme.palette.primary.main}10`,
          }}
          content={({ active, payload, label }) => {
            if (!active || !payload?.length) return null;

            const [year, month] = label.split("-");
            const date = new Date(Number(year), Number(month) - 1, 1);

            return (
              <div
                style={{
                  background: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 12,
                  padding: 12,
                  direction: "rtl",
                }}
              >
                <div style={{ marginBottom: 8 }}>
                  {date.toLocaleDateString("fa-IR", {
                    month: "long",
                    year: "numeric",
                  })}
                </div>

                <strong>
                  {formatPrice(payload[0].value)} تومان
                </strong>
              </div>
            );
          }}
        />

        <Bar
          dataKey="total"
          name="درآمد"
          fill={theme.palette.primary.main}
          radius={[8, 8, 0, 0]}
          barSize={40}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}