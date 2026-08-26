"use client";
import { CircularProgress } from "@mui/material";
import { useGetCardsQuery, useGetChartsQuery } from "../api/ApiReport";
import ReportCards from "./ReportCards";
import ReportFilters from "./ReportFilters";
import ReportPageHeader from "./ReportPageHeader";
import ReportTopsContainer from "./ReportTopsContainer";
import SaleReportPage from "./SaleReportPage";
import ReportsCharts from "./ReportCharts";

export default function ReportPage() {
  const chartQuery = useGetChartsQuery();
  const cardQuery = useGetCardsQuery();

  if (chartQuery.isLoading || cardQuery.isLoading) {
    return (
      <div className="w-full py-10 flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  if (!chartQuery.data?.charts || !cardQuery.data?.summary) {
    return <div>hi</div>;
  }
 
  return (
    <>
      <ReportPageHeader />
      <ReportFilters />
      <ReportCards
        cards={cardQuery.data.summary}
        isLoading={cardQuery.isLoading}
      />
      <ReportsCharts
        charts={chartQuery.data.charts}
        isLoading={chartQuery.isLoading}
      />
      <ReportTopsContainer />
      <SaleReportPage />
    </>
  );
}
