"use client";
import { Box, Card, CircularProgress, Typography } from "@mui/material";
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
          {isLoading ? (
            <div className="flex items-center justify-center h-80">
              <CircularProgress />
            </div>
          ) : dashboardCharts?.sales_trend.length === 0 ? (
            <div className="flex items-center justify-center h-80">
              <Typography variant="body1">هیچ داده ای یافت نشد.</Typography>
            </div>
          ) : (
            <SalesChart data={dashboardCharts?.sales_trend} />
          )}
        </ChartCard>
      </div>
      <div className="col-span-full lg:col-span-2 h-full">
        <ChartCard
          title="وضعیت بدهی و پرداختی ها"
          caption="نمایش مقدار کل بدهی هفته در براره پرداخت"
          icon={<PieChartRounded color="secondary" />}
        >
          {isLoading ? (
            <div className="flex items-center justify-center h-80">
              <CircularProgress />
            </div>
          ) : dashboardCharts?.debt_distribution ? (
            <>
              <PaymentDistributionChart
                data={dashboardCharts?.debt_distribution}
              />
              <ChartLegend
                items={[
                  {
                    color: "#4CAF50",
                    label: "پرداخت شده",
                    value: dashboardCharts?.debt_distribution.total_paid,
                  },
                  {
                    color: "#FF9800",
                    label: "باقی مانده",
                    value: dashboardCharts?.debt_distribution.remaining,
                  },
                ]}
              />
            </>
          ) : (
            <div className="flex items-center justify-center h-80">
              <Typography variant="body1">هیچ داده ای یافت نشد.</Typography>
            </div>
          )}
        </ChartCard>
      </div>
      <div className="col-span-full ">
        <ChartCard
          title="درآمده هفته"
          caption="جمع تمام مبالغ فروش و بدهی "
          icon={<AttachMoneyRounded color="success" />}
        >
          {isLoading ? (
            <div className="flex items-center justify-center h-80">
              <CircularProgress />
            </div>
          ) : dashboardCharts?.payments_trend.length === 0 ? (
            <div className="flex items-center justify-center h-80">
              <Typography variant="body1">هیچ داده ای یافت نشد.</Typography>
            </div>
          ) : (
            <RevenueChart data={dashboardCharts?.payments_trend} />
          )}
        </ChartCard>
      </div>
    </>
  );
};

export default DashboardsCharts;
