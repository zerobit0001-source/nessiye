import { ArrowDownwardRounded } from "@mui/icons-material";
import { Box, Card, IconButton, Typography } from "@mui/material";
import TopDebtors from "./TopDebtors";
import RecentActivities from "./RecentActivities";
import LowStockProducts from "./LowStockProducts";

const DashboardsRecents = () => {
  return (
    <>
      <TopDebtors />
      <RecentActivities />
      <LowStockProducts />
    </>
  );
};

export default DashboardsRecents;
