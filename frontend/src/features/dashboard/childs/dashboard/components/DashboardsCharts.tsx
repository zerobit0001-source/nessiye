"use client";
import { Box, Card, Typography } from "@mui/material";
import React, { useEffect } from "react";
import SaleVsPaymentChart from "./SaleVsPaymentChart";
import DebtsStatusChart from "./DebtsStatusChart";
import { ChartCard } from "@/features/dashboard/components/charts/ChartCard";
import SalesChart from "@/features/dashboard/components/charts/SalesChart";
import {
  AttachMoneyRounded,
  PieChartRounded,
  TrendingUpRounded,
} from "@mui/icons-material";
import PaymentDistributionChart from "@/features/dashboard/components/charts/PaymentDistributionChart";
import ChartLegend from "@/features/dashboard/components/charts/ChartLegend";
import RevenueChart from "@/features/dashboard/components/charts/RevenueChart";
import { useGetDashboardCardsQuery } from "../api/ApiDashboard";

const DashboardsCharts = () => {
  const { data, isLoading, error } = useGetDashboardCardsQuery();

  useEffect(() => {
    if (data) {
      console.log("Dashboard Cards Charts:", data.data.charts);
    }
  }, [data]);

  const dashboardCharts = data?.data.charts;

  return (
    <>
      <div className="col-span-full lg:col-span-4 h-full">
        <ChartCard
          title="فروش در برابر پرداخت"
          caption="نمایش مقدار بدهی داده شده در برابر مبلغ تسویه شده"
          icon={<TrendingUpRounded color="success" />}
        >
          <SalesChart data={dashboardCharts?.sales_trend} />
        </ChartCard>
      </div>
      <div className="col-span-full lg:col-span-2 h-full">
        <ChartCard
          title="وضعیت بدهی و پرداختی ها"
          caption="نمایش مقدار کل بدهی هفته در براره پرداخت"
          icon={<PieChartRounded color="secondary" />}
        >
          <PaymentDistributionChart data={dashboardCharts?.debt_distribution} />
          <ChartLegend
            items={[
              {
                color: "#FF9800",
                label: "نقدی",
                value: 10000000,
              },
              {
                color: "#42A5F5",
                label: "نسیه",
                value: 3000000,
              },
            ]}
          />
        </ChartCard>
      </div>
      <div className="col-span-full ">
        <ChartCard
          title="درآمده هفته"
          caption="جمع تمام مبالغ فروش و بدهی "
          icon={<AttachMoneyRounded color="success" />}
        >
          <RevenueChart data={dashboardCharts?.payments_trend} />
        </ChartCard>
      </div>
    </>
  );
};

export default DashboardsCharts;
