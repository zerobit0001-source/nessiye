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

const CustomersReportPage = () => {
  return (
    <Container>
      <Card className="w-full flex items-center justify-center p-4 rounded-lg!">
        <DateRangePicker />
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <StatsCard
          title="میانگین خرید هر مشتری"
          value={43000000}
          unit="تومان"
          icon={<NotificationImportantRounded />}
          iconBg="warning.light"
          iconColor="warning.dark"
        />
        <StatsCard
          title="تعداد مشتریان فعال"
          value={280}
          unit="عدد"
          icon={<CheckRounded />}
          iconBg="success.light"
          iconColor="success.dark"
        />
        <StatsCard
          title="میانگین تعداد خرید"
          value={30}
          unit="عدد"
          icon={<PeopleRounded />}
          iconBg="secondary.light"
          iconColor="secondary.dark"
        />
      </div>
      <div className="grid grid-cols-6 gap-2">
        <Card className="col-span-full lg:col-span-4 rounded-lg! p-2">
          <Typography variant="subtitle2">مشتریان جدید در طول زمان</Typography>
          <Typography variant="caption">نمودار فروش</Typography>
        </Card>
        <Card className="col-span-full lg:col-span-2 rounded-lg! p-2">
          <Typography variant="subtitle2">
            مشتریان بر اساس میزان خرید
          </Typography>
          <Typography variant="caption">روند فروش</Typography>
        </Card>
        <Card className="col-span-full lg:col-span-2 rounded-lg! p-2">
          <Typography variant="subtitle2">بهترین مشتریان</Typography>
          <Typography variant="caption">بر اساس مبلغ فروش این دوره</Typography>
        </Card>
        <Card className="col-span-full lg:col-span-4 rounded-lg! p-2">
          <Typography variant="subtitle2">
            مشتریان با بیشترین تعداد خرید
          </Typography>
          <Typography variant="caption">بر اساس مبلغ خرید این دوره</Typography>
        </Card>
      </div>
    </Container>
  );
};

export default CustomersReportPage;
