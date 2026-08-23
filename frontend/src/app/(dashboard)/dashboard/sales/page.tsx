import Container from "@/components/dash/Container";
import DashboardsPageHeader from "@/components/dash/DashboardsPageHeader";
import { Box } from "@mui/material";
import SalesList from "@/features/dashboard/childs/sales/components/SalesList";
import SalesPageCards from "@/features/dashboard/childs/sales/components/SalesPageCard";
import SalesToolbar from "@/features/dashboard/childs/sales/components/SalesPageToolbar";
import LinkButton from "@/features/dashboard/components/LinkButton";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "فروش‌ها",
  description:
    "مشاهده و مدیریت فروش‌های ثبت شده، جزئیات تراکنش‌ها و اطلاعات خرید مشتریان.",
};

interface Props {
  searchParams: Promise<{
    search?: string;
    status?: string;
    ordering?: string;
    period?: string;
  }>;
}
const Sales = async ({ searchParams }: Props) => {
  const params = await searchParams;

  return (
    <Container>
      <DashboardsPageHeader
        title="فروش ها"
        caption="128 حساب ، 180000000 ریال جمع حساب ها"
      >
        <LinkButton
          link="/dashboard/sales/create"
          text="افزودن فروش"
          variant="contained"
        />
      </DashboardsPageHeader>
      <SalesPageCards />
      <SalesToolbar />
      <Box className="w-full overflow-x-scroll xl:overflow-auto">
        {/*<Suspense fallback={null}>
          <PagesFilterLinks page="sales" />
        </Suspense>*/}
        {/*<BranchHead branches={SaleBranchName} />*/}
        <SalesList
          search={params.search}
          status={params.status}
          ordering={params.ordering}
          period={params.period}
        />
      </Box>
    </Container>
  );
};

export default Sales;
