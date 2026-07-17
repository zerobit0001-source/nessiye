import { Box, Typography } from "@mui/material";
import { overdueBranchs, OverdueReports } from "@/data/DashboardOverdue";
import BranchHead from "@/features/dashboard/components/BranchHead";
import { PriorityHighRounded } from "@mui/icons-material";
import OverduesCards from "./OverduesCards";
import OverdueToolbar from "./OverdueToolbar";
import OverdueList from "./OverdueList";

export default function OverduesPage() {
  return (
    <>
      <div className="w-full border border-red-300 rounded-lg px-4 p-2 bg-red-500/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PriorityHighRounded fontSize="large" color="error" />
          <div>
            <Typography color="error" variant="body2" className="font-bold!">
              ۱۲ بدهی معوق نیاز به پیگیری فوری دارد
            </Typography>
            <Typography color="error" variant="caption">
              ۳ مورد بیش از ۳۰ روز از سررسید آن‌ها گذشته است
            </Typography>
          </div>
        </div>
        <div className="flex flex-col">
          <Typography variant="h5" color="error">
            ۴۰,۰۰۰,۰۰۰
          </Typography>
          <Typography variant="body2" color="error">
            تومان مانده معوق
          </Typography>
        </div>
      </div>

      <OverduesCards />
      <OverdueToolbar />
      <OverdueList />
    </>
  );
}
