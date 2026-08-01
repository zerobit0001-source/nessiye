"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

type PaymentDistribution = {
  name: string;
  value: number;
};

type PaymentDistributionChartProps = {
  data: PaymentDistribution[];
};

const COLORS = [
  "#FF9800",
  "#42A5F5",
];

export default function PaymentDistributionChart({
  data,
}: PaymentDistributionChartProps) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={70}
          outerRadius={100}
          paddingAngle={4}
        >
          {data.map((_, index) => (
            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>

        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}