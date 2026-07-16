import Container from "@/components/dash/Container";
import { Button, Card, Typography } from "@mui/material";
import {
  AssignmentTurnedInRounded,
  AttachMoneyRounded,
  CheckRounded,
  NotificationImportantRounded,
  PeopleRounded,
  PointOfSaleRounded,
  ReceiptRounded,
} from "@mui/icons-material";
import StatsCard from "@/features/dashboard/childs/components/StatCard";
import DateRangePicker from "../../../components/DateRangePicker";

const DebtsReportPage = () => {
  return (
    <Container>
      <Card className="w-full flex items-center justify-center p-4 rounded-lg!">
        <DateRangePicker />

      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        <StatsCard
          title="کل بدهی"
          value={29000000}
          unit="تومان"
          icon={<PointOfSaleRounded />}
          iconBg="primary.light"
          iconColor="primary.dark"
        />
        <StatsCard
          title="بدهی سررسید گذشته"
          value={43000000}
          unit="تومان"
          icon={<NotificationImportantRounded />}
          iconBg="warning.light"
          iconColor="warning.dark"
        />
        <StatsCard
          title="بدهی تسویه شده"
          value={280}
          unit="عدد"
          icon={<CheckRounded />}
          iconBg="success.light"
          iconColor="success.dark"
        />
        <StatsCard
          title="تعداد بدهکاران"
          value={30}
          unit="عدد"
          icon={<PeopleRounded />}
          iconBg="secondary.light"
          iconColor="secondary.dark"
        />
      </div>
      <div className="grid grid-cols-6 gap-2">
        <Card className="col-span-full lg:col-span-4 bg-black shadow">
          <Typography variant="subtitle2">روند ایجاد بدهی</Typography>
          <Typography variant="caption">نمودار فروش</Typography>
        </Card>
        <Card className="col-span-full lg:col-span-2 bg-black shadow">
          <Typography variant="subtitle2">روند تسویه</Typography>
          <Typography variant="caption">روند فروش</Typography>
        </Card>
        <Card className="col-span-full lg:col-span-2 bg-black shadow">
          <Typography variant="subtitle2">بیشترین بدهکارها</Typography>
          <Typography variant="caption">بر اساس مبلغ فروش این دوره</Typography>
        </Card>
        <Card className="col-span-full lg:col-span-4 bg-black shadow">
          <Typography variant="subtitle2">بدهی‌های معوق</Typography>
          <Typography variant="caption">بر اساس مبلغ خرید این دوره</Typography>
        </Card>
      </div>
    </Container>
  );
};

export default DebtsReportPage;
