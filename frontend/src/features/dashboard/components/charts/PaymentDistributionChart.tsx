"use client";

import { formatPrice } from "@/utils/formatters";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  Label,
} from "recharts";

type PaymentDistributionChartProps = {
  data: {
    total_debt: number;
    total_paid: number;
    remaining: number;
  };
};

const COLORS = ["#4CAF50", "#FF9800"];

export default function PaymentDistributionChart({
  data,
}: PaymentDistributionChartProps) {
  const chartData = [
    {
      name: "پرداخت شده",
      value: data?.total_paid,
    },
    {
      name: "باقیمانده",
      value: data?.remaining,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={100}
          paddingAngle={4}
          stroke="none"
        >
          {chartData.map((_, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}

          <Label
            position="center"
            content={(props: any) => {
              const { viewBox } = props;

              if (!viewBox?.cx || !viewBox?.cy) return null;

              return (
                <g>
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy - 12}
                    textAnchor="middle"
                    fill="#6B7280"
                    fontSize={13}
                    fontWeight={500}
                  >
                    کل بدهی
                  </text>

                  <text
                    x={viewBox.cx}
                    y={viewBox.cy + 16}
                    textAnchor="middle"
                    fill="#111827"
                    fontSize={18}
                    fontWeight={700}
                  >
                    {formatPrice(data.total_debt)}
                  </text>
                </g>
              );
            }}
          />
        </Pie>

        <Tooltip
          formatter={(value: number, name: string) => [
            formatPrice(value),
            name,
          ]}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
