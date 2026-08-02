import Container from "@/components/dash/Container";
import SaleReportPage from "@/features/dashboard/childs/report/components/SaleReportPage";
import ReportPageHeader from "@/features/dashboard/childs/report/components/ReportPageHeader";
import ReportFilters from "@/features/dashboard/childs/report/components/ReportFilters";
import ReportCards from "@/features/dashboard/childs/report/components/ReportCards";
import ReportTopsContainer from "@/features/dashboard/childs/report/components/ReportTopsContainer";
import ReportPage from "@/features/dashboard/childs/report/components/ReportPage";

const Report = () => {
  return (
    <Container>
      <ReportPage />
    </Container>
  );
};

export default Report;
