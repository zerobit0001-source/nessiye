import Container from "@/components/dash/Container";
import { Button, Card, Typography } from "@mui/material";
import {
  AssignmentTurnedInRounded,
  AttachMoneyRounded,
  PointOfSaleRounded,
  ReceiptRounded,
} from "@mui/icons-material";
import StatsCard from "@/features/dashboard/childs/components/StatCard";
import DateRangePicker from "../../../components/DateRangePicker";

const PaymentsReportPage = () => {
  return (
    <Container>
      <Card className="w-full flex items-center justify-center p-4 rounded-lg!">
        <DateRangePicker />

      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <StatsCard
          title="مجموع پرداخت‌ها"
          value={29000000}
          unit="تومان"
          icon={<PointOfSaleRounded />}
          iconBg="primary.light"
          iconColor="primary.dark"
        />
        <StatsCard
          title="پرداخت‌های امروز"
          value={43000000}
          unit="تومان"
          icon={<AssignmentTurnedInRounded />}
          iconBg="warning.light"
          iconColor="warning.dark"
        />
        <StatsCard
          title="تعداد پرداخت‌ها"
          value="280"
          unit="عدد"
          icon={<ReceiptRounded />}
          iconBg="success.light"
          iconColor="success.dark"
        />
      </div>
      <div className="grid grid-cols-6 gap-2">
        <Card className="col-span-full lg:col-span-4 bg-black shadow">
          <Typography variant="subtitle2">روند پرداخت‌ها</Typography>
          <Typography variant="caption">نمودار فروش</Typography>
        </Card>
        <Card className="col-span-full lg:col-span-2 bg-black shadow">
          <Typography variant="subtitle2">پرداخت نسبت به بدهی</Typography>
          <Typography variant="caption">روند فروش</Typography>
        </Card>
        <Card className="col-span-full lg:col-span-2 bg-black shadow">
          <Typography variant="subtitle2">آخرین پرداخت‌ها</Typography>
          <Typography variant="caption">بر اساس مبلغ فروش این دوره</Typography>
        </Card>
        <Card className="col-span-full lg:col-span-4 bg-black shadow">
          <Typography variant="subtitle2">بزرگ‌ترین پرداخت‌ها</Typography>
          <Typography variant="caption">بر اساس مبلغ خرید این دوره</Typography>
        </Card>
      </div>
    </Container>
  );
};

export default PaymentsReportPage;
