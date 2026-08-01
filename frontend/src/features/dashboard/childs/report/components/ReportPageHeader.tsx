import { Card, Typography } from "@mui/material";
import ReportExportButtons from "./ReportExportButtons";

export default function ReportPageHeader() {
  return (
    <Card
      elevation={1}
      className="w-full flex items-center justify-between p-4"
    >
      <span>
        <Typography variant="h6" className="font-bold!">
          گزارش‌ها و تحلیل‌های مالی
        </Typography>
        <Typography variant="caption">
          مشاهده و بررسی دقیق فروش، بدهی‌ها، دریافتی‌ها و رفتارهای خرید مشتریان.
        </Typography>
      </span>
      <div className="flex items-center gap-2">
        <ReportExportButtons />
      </div>
    </Card>
  );
}
