import type { Metadata } from "next";
import Container from "@/components/dash/Container";
import DashboardsPageHeader from "@/components/dash/DashboardsPageHeader";
import OverduesPage from "@/features/dashboard/childs/overdue/components/OverduesPage";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "اقساط سررسید گذشته",
  description: "مشاهده و مدیریت اقساط و بدهی‌های سررسید گذشته مشتریان فروشگاه.",
};

const Overdues = () => {
  return (
    <Container>
      <DashboardsPageHeader
        title="اقساط سررسید گذشته"
        caption="7 تا نسیه که تاخیر دارن، جمع مبالغ 43 م ریال"
      >
        <div />
      </DashboardsPageHeader>

      <Suspense fallback={null}>
        <OverduesPage />
      </Suspense>
    </Container>
  );
};

export default Overdues;
