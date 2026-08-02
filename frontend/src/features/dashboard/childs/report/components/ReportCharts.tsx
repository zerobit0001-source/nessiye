import { ChartCard } from "@/features/dashboard/components/charts/ChartCard";
import { ReportsChartsType } from "@/types/types";
import ReportSaleTrenChart from "./charts/ReportSaleTrendChart";
import { TrendingUpRounded } from "@mui/icons-material";
import ReportPaymentTrendChart from "./charts/ReportPaymentTrendChart";
import ReportDebtTrenChart from "./charts/ReportDebtTrendChart";
import ReportComposedTrendChart from "./charts/ReportComposedTrendChart";
import ReportPaymentDistributionChart from "./charts/ReportPaymentDisChart";
import ReportMonthlyRevenueChart from "./charts/ReportMonthlyRevChart";

export default function ReportsCharts({
  charts,
}: {
  charts: ReportsChartsType;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <ChartCard
        title="روند فروش زمانی"
        caption="نمودار خطی تغییرات میزان فروش کلی"
        icon={<TrendingUpRounded color="primary" />}
      >
        <ReportSaleTrenChart data={charts.sales_trend} />
      </ChartCard>
      <ChartCard
        title="روند دریافتی‌ها و وصولی‌ها"
        caption="نمودار مساحتی پرداختی‌های مشتریان"
        icon={<TrendingUpRounded color="success" />}
      >
        <ReportPaymentTrendChart data={charts.payments_trend} />
      </ChartCard>
      <ChartCard
        title="ثبت نسیه‌های جدید"
        caption="حجم نسیه‌های ایجادشده به تفکیک هفته"
        icon={<TrendingUpRounded color="error" />}
      >
        <ReportDebtTrenChart data={charts.debts_trend} />
      </ChartCard>
      <ChartCard
        title="مقایسه فروش و دریافتی‌ها"
        caption="ترکیب فروش کل در برابر وصولی نقد"
        icon={<TrendingUpRounded color="warning" />}
      >
        <ReportComposedTrendChart data={charts.composed_trend} />
      </ChartCard>
      <ChartCard
        title="تفکیک نحوه پرداخت"
        caption="سهم روش‌های تسویه (نقدی، کارت، نسیه)"
        icon={<TrendingUpRounded color="secondary" />}
      >
        <ReportPaymentDistributionChart data={charts.payment_distribution} />
      </ChartCard>
      <ChartCard
        title="درآمد و گردش ماهانه"
        caption="مقایسه عملکرد ۶ ماه گذشته"
        icon={<TrendingUpRounded color="secondary" />}
      >
        <ReportMonthlyRevenueChart data={charts.monthly_revenue} />
      </ChartCard>
    </div>
  );
}
