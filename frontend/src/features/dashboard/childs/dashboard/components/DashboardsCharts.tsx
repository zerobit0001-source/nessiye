import { Box, Card, Typography } from "@mui/material";
import React from "react";
import SaleVsPaymentChart from "./SaleVsPaymentChart";
import DebtsStatusChart from "./DebtsStatusChart";
import RevenueChart from "./RevenueChart";

const DashboardsCharts = () => {
  return (
    <>
      <Card className="col-span-full lg:col-span-4 bg-gray-100! rounded-lg ">
        <Box className="border-b border-gray-300 p-2">
          <SaleVsPaymentChart />
        </Box>
      </Card>
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
