import Container from "@/components/dash/Container";
import { Button, Card, Typography } from "@mui/material";
import {
  AssignmentTurnedInRounded,
  AttachMoneyRounded,
  CheckRounded,
  DangerousRounded,
  NotificationImportantRounded,
  PeopleRounded,
  PointOfSaleRounded,
  ReceiptRounded,
  WarningRounded,
} from "@mui/icons-material";
import StatsCard from "@/features/dashboard/childs/components/StatCard";
import DateRangePicker from "../../../components/DateRangePicker";

const ProductsReportPage = () => {
  return (
    <Container>
      <Card className="w-full flex items-center justify-center p-4 rounded-lg!">
        <DateRangePicker />
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        <StatsCard
          title="تعداد محصولات"
          value={50}
          unit="عدد"
          icon={<NotificationImportantRounded />}
          iconBg="primary.light"
          iconColor="primary.dark"
        />
        <StatsCard
          title="موجودی کل"
          value={280}
          unit="عدد"
          icon={<CheckRounded />}
          iconBg="success.light"
          iconColor="success.dark"
        />
        <StatsCard
          title="محصولات کم‌موجود"
          value={30}
          unit="عدد"
          icon={<WarningRounded />}
          iconBg="warning.light"
          iconColor="warning.dark"
        />
        <StatsCard
          title="محصولات ناموجود"
          value={30}
          unit="عدد"
          icon={<DangerousRounded />}

          iconBg="error.light"
          iconColor="error.dark"
        />
      </div>
      <div className="grid grid-cols-6 gap-2">
        <Card className="col-span-full lg:col-span-4 rounded-lg! p-2">
          <Typography variant="subtitle2">سهم فروش هر محصول</Typography>
          <Typography variant="caption">نمودار فروش</Typography>
        </Card>
        <Card className="col-span-full lg:col-span-2 rounded-lg! p-2">
          <Typography variant="subtitle2">موجودی دسته‌بندی‌ها</Typography>
          <Typography variant="caption">روند فروش</Typography>
        </Card>
        <Card className="col-span-full lg:col-span-2 rounded-lg! p-2">
          <Typography variant="subtitle2">پرفروش‌ترین محصولات</Typography>
          <Typography variant="caption">بر اساس مبلغ فروش این دوره</Typography>
        </Card>
        <Card className="col-span-full lg:col-span-4 rounded-lg! p-2">
          <Typography variant="subtitle2">محصولات بدون فروش</Typography>
          <Typography variant="caption">بر اساس مبلغ خرید این دوره</Typography>
        </Card>
      </div>
    </Container>
  );
};

export default ProductsReportPage;
