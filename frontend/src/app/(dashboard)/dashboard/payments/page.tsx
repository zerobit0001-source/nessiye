import Container from "@/components/dash/Container";
import DashboardsPageHeader from "@/components/dash/DashboardsPageHeader";
import PaymentList from "@/features/dashboard/childs/payments/components/PaymentList";
import AddPaymentModal from "@/features/dashboard/components/AddPaymentModal";
import PaymentsPageToolbar from "@/features/dashboard/childs/payments/components/PaymetPageToolbar";
import PaymentsPageCards from "@/features/dashboard/childs/payments/components/PaymentsPageCards";
import DebtsCards from "@/features/dashboard/childs/debts/components/DebtsPageCards";
import { Box } from "@mui/material";
import LinkButton from "@/features/dashboard/components/LinkButton";
interface Props {
  searchParams: Promise<{
    search?: string;
    status?: string;
    ordering?: string;
    period?: string;
  }>;
}
const Payments = async ({ searchParams }: Props) => {
  const params = await searchParams;

  return (
    <Container>
      <DashboardsPageHeader
        title="پرداختی ها"
        caption="42 م ریال مبلغ جمع شده این ماه"
      >
        <LinkButton
          link="/dashboard/payments/create"
          text="ثبت پرداختی"
          variant="contained"
        />
      </DashboardsPageHeader>
      <DebtsCards />
      <PaymentsPageToolbar />
      <Box className="w-full overflow-x-scroll xl:overflow-auto">
        {/*<BranchHead branches={PaymentBranchName} />*/}
        <PaymentList
          search={params.search}
          status={params.status}
          ordering={params.ordering}
          period={params.period}
        />
      </Box>
    </Container>
  );
};

export default Payments;
