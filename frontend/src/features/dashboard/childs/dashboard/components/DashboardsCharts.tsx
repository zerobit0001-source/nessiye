import { Box, Card, Typography } from "@mui/material";
import React from "react";
import SaleVsPaymentChart from "./SaleVsPaymentChart";
import DebtsStatusChart from "./DebtsStatusChart";
import RevenueChart from "./RevenueChart";
import { ChartCard } from "@/features/dashboard/components/charts/ChartCard";
import SalesChart from "@/features/dashboard/components/charts/SalesChart";
import { TrendingUpRounded } from "@mui/icons-material";

const DashboardsCharts = () => {
  return (
    <>
      <div className="col-span-full lg:col-span-4 overflow-auto">
        <ChartCard title="hi" caption="goodby" icon={<TrendingUpRounded />}>
          <SalesChart
            data={[
              { date: "2026-07-01T17:25:12.365549Z", total: 4200000 },
              { date: "2026-07-02T17:25:12.365549Z", total: 5800000 },
              { date: "2026-07-03T17:25:12.365549Z", total: 3500000 },
              { date: "2026-07-04T17:25:12.365549Z", total: 7100000 },
              { date: "2026-07-05T17:25:12.365549Z", total: 9200000 },
              { date: "2026-07-06T17:25:12.365549Z", total: 6800000 },
              { date: "2026-07-07T17:25:12.365549Z", total: 10500000 },
              { date: "2026-07-08T17:25:12.365549Z", total: 8700000 },
              { date: "2026-07-09T17:25:12.365549Z", total: 7600000 },
              { date: "2026-07-10T17:25:12.365549Z", total: 13100000 },
              { date: "2026-07-11T17:25:12.365549Z", total: 9800000 },
              { date: "2026-07-12T17:25:12.365549Z", total: 12400000 },
              { date: "2026-07-13T17:25:12.365549Z", total: 11200000 },
              { date: "2026-07-14T17:25:12.365549Z", total: 14500000 },
            ]}
          />
        </ChartCard>
      </div>
      <Card className="col-span-full lg:col-span-2 bg-gray-100! rounded-lg ">
        <Box className="border-b border-gray-300 p-2">
          <DebtsStatusChart />
        </Box>
      </Card>
      <Card className="col-span-full bg-gray-100! rounded-lg ">
        <Box className="border-b border-gray-300 p-2">
          <RevenueChart />
        </Box>
      </Card>
    </>
  );
};

export default DashboardsCharts;
