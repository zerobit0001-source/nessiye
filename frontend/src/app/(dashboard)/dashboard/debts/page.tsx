import Container from "@/components/dash/Container";
import DashboardsPageHeader from "@/components/dash/DashboardsPageHeader";
import { Box } from "@mui/material";
import DebtsList from "@/features/dashboard/childs/debts/components/DebtsList";
import AddDebtModal from "@/features/dashboard/components/AddDebtsModal";
import { Suspense } from "react";
import DebtsCards from "@/features/dashboard/childs/debts/components/DebtsPageCards";
import DebtsPageToolbar from "@/features/dashboard/childs/debts/components/DebtsPageToolbar";
import LinkButton from "@/features/dashboard/components/LinkButton";
interface Props {
  searchParams: Promise<{
    search?: string;
    status?: string;
    ordering?: string;
    period?: string;
  }>;
}
const Debts = async ({ searchParams }: Props) => {
  const params = await searchParams;
  return (
    <Container>
      <DashboardsPageHeader
        title="حساب ها"
        caption="128 حساب ، 180000000 ریال جمع حساب ها"
      >
        <LinkButton
          link="/dashboard/debts/create"
          text="افزودن بدهی"
          variant="contained"
        />
      </DashboardsPageHeader>
      <DebtsCards />
      <DebtsPageToolbar />
      <Box className="w-full overflow-x-scroll xl:overflow-auto">
        <DebtsList
          search={params.search}
          status={params.status}
          ordering={params.ordering}
          period={params.period}
        />
      </Box>
    </Container>
  );
};

export default Debts;
