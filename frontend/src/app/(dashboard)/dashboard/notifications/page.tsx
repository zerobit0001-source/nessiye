import Container from "@/components/dash/Container";
import DashboardsPageHeader from "@/components/dash/DashboardsPageHeader";
import NotificationsPageCards from "@/features/dashboard/childs/notifications/components/NotificationsPageCards";
import NotificationsPageFilter from "@/features/dashboard/childs/notifications/components/NotificationsPageFilters";
import { Button } from "@mui/material";

export default async function Notifications() {
  return (
    <Container>
      <div className="w-full mx-auto flex flex-col gap-4 lg:max-w-250">
        <DashboardsPageHeader
          title="اعلان ها"
          caption="آخرین رویدادها و اطلاعیه‌های مربوط به فروشگاه خود را مشاهده کنید"
        >
          <Button variant="outlined" color="info">
            همه را خوانده شده علامت بزن
          </Button>
        </DashboardsPageHeader>
        <NotificationsPageCards />
        <NotificationsPageFilter />
        {/*<Notifications />  */}
      </div>
    </Container>
  );
}
