import { ChartCard } from "@/features/dashboard/components/charts/ChartCard";
import { ReportsChartsType } from "@/types/types";
import ReportSaleTrenChart from "./charts/ReportSaleTrendChart";
import { TrendingUpRounded } from "@mui/icons-material";

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
    </div>
  );
}
