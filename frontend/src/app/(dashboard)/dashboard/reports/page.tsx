import type { Metadata } from "next";
import Container from "@/components/dash/Container";
import ReportPage from "@/features/dashboard/childs/report/components/ReportPage";

export const metadata: Metadata = {
  title: "گزارش‌ها",
  description:
    "مشاهده گزارش‌های فروش، پرداخت‌ها، بدهی‌ها، مشتریان و عملکرد فروشگاه.",
};

const Report = () => {
  return (
    <Container>
      <ReportPage />
    </Container>
  );
};

export default Report;
