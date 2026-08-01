import DashboardsPageHeader from "@/components/dash/DashboardsPageHeader";
import SlideUpBoxAnimation from "@/components/SlideUpBoxAnimation";
import { ReportCardsData } from "@/data/ReportsData";
import {
  Box,
  Button,
  Card,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import Container from "@/components/dash/Container";
import { InstallDesktopRounded } from "@mui/icons-material";
import ReportTabs from "@/features/dashboard/childs/report/components/ReportPageTabs";
import SaleReportPage from "@/features/dashboard/childs/report/components/SaleReportPage";
import ReportPageHeader from "@/features/dashboard/childs/report/components/ReportPageHeader";
import ReportFilters from "@/features/dashboard/childs/report/components/ReportFilters";
import ReportCards from "@/features/dashboard/childs/report/components/ReportCards";
import ReportTopsContainer from "@/features/dashboard/childs/report/components/ReportTopsContainer";

const Report = () => {
  return (
    <Container>
      <ReportPageHeader />
      <ReportFilters />
      <ReportCards />
      <ReportTopsContainer />
      <SaleReportPage />
    </Container>
  );
};

export default Report;
