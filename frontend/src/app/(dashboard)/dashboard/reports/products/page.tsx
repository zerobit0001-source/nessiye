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

const ReportPayments = () => {
  return (
    <Container>
      <DashboardsPageHeader
        title="گزارش ها"
        caption="اردیبهشت 1404 ، فروشگاه نگین"
      >
        <Button variant="outlined" endIcon={<InstallDesktopRounded />}>
          پرینت PDF
        </Button>
      </DashboardsPageHeader>
      <ReportTabs />
    </Container>
  );
};

export default ReportPayments;
