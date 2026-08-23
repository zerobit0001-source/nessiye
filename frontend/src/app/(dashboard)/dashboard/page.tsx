import Container from "@/components/dash/Container";
import DashboardsCards from "@/features/dashboard/childs/dashboard/components/DashboardsCards";
import DashboardsCharts from "@/features/dashboard/childs/dashboard/components/DashboardsCharts";
import DashboardsRecents from "@/features/dashboard/childs/dashboard/components/DashboardsRecents";
import { CheckAuthServer } from "@/utils/auth/CheckAuth";
import DashboardPageHeader from "@/features/dashboard/childs/dashboard/components/DashboardPageHeader";
import QuickActions from "@/features/dashboard/childs/dashboard/components/QuickActions";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "داشبورد",
  description: "نمای کلی فروش، بدهی‌ها، پرداخت‌ها و وضعیت فروشگاه.",
};

// dasboard

const Dashboard = async () => {
  await CheckAuthServer();

  return (
    <Container>
      <DashboardPageHeader>
        {/*<DateSelector />*/}
        <div></div>
      </DashboardPageHeader>
      <DashboardsCards />

      <div className="grid grid-cols-1 lg:grid-cols-6  gap-4">
        <DashboardsCharts />
        <DashboardsRecents />
        <QuickActions />
      </div>
    </Container>
  );
};

export default Dashboard;
