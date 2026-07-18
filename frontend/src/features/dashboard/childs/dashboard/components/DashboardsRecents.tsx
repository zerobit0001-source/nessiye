"use client";
import { ArrowDownwardRounded } from "@mui/icons-material";
import { Box, Card, IconButton, Typography } from "@mui/material";
import TopDebtors from "./TopDebtors";
import RecentActivities from "./RecentActivities";
import LowStockProducts from "./LowStockProducts";
import { useGetDashboardCardsQuery } from "../api/ApiDashboard";

const DashboardsRecents = () => {
  const { data, isLoading, error } = useGetDashboardCardsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.error.message}</div>;

  const TopDebtorsData = data?.data.top_debtors ?? [];
  const RecentActivitiesData = data?.data.recent_activities ?? [];
  const LowStockProductsData = data?.data.low_stock_products ?? [];

  return (
    <>
      <TopDebtors data={TopDebtorsData} />
      <RecentActivities data={RecentActivitiesData} />
      <LowStockProducts data={LowStockProductsData} />
    </>
  );
};

export default DashboardsRecents;
