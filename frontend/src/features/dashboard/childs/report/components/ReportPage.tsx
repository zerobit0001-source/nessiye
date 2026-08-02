"use client";
import { CircularProgress } from "@mui/material";
import { useGetChartsQuery } from "../api/ApiReport";
import ReportCards from "./ReportCards";
import ReportFilters from "./ReportFilters";
import ReportPageHeader from "./ReportPageHeader";
import ReportTopsContainer from "./ReportTopsContainer";
import SaleReportPage from "./SaleReportPage";
import ReportsCharts from "./ReportCharts";

export default function ReportPage() {
  const reportQuery = useGetChartsQuery();

  if (reportQuery.isLoading) {
    return (
      <div className="w-full py-10 flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  if (!reportQuery.data?.charts) {
    return <div>hi</div>;
  }

  console.log(reportQuery.data);

  return (
    <>
      <ReportPageHeader />
      <ReportFilters />
      <ReportsCharts charts={reportQuery.data.charts} />
      <ReportCards />
      <ReportTopsContainer />
      <SaleReportPage />
    </>
  );
}
