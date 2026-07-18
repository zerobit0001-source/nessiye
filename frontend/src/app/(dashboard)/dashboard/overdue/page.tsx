import Container from "@/components/dash/Container";
import DashboardsPageHeader from "@/components/dash/DashboardsPageHeader";
import { overdueBranchs, OverdueReports } from "@/data/DashboardOverdue";
import OverduesPage from "@/features/dashboard/childs/overdue/components/OverduesPage";
import BranchHead from "@/features/dashboard/components/BranchHead";
import { PriorityHighRounded } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { Suspense } from "react";

const Overdues = () => {
  return (
    <Container>
      <DashboardsPageHeader
        title="اقساط سررسید گذشته"
        caption="7 تا نسیه که تاخیر دارن ، جمع مبالغ 43 م ریال"
      >
        <div className=""></div>
      </DashboardsPageHeader>
      <Suspense fallback={<div>Loading...</div>}>
        <OverduesPage />
      </Suspense>
      {/*<Box className="w-full overflow-x-scroll xl:overflow-auto">
        <BranchHead branches={overdueBranchs} />
        {OverdueReports.map((overdue) => (
          <Box
            key={overdue.id}
            className="w-300
                                  xl:w-full
                                  sticky top-0
                                  z-50
                                  grid
                                  grid-cols-6
                                  items-center
                                  justify-between
                                  p-4
                                  border-b
                                  border-gray-400
                                  hover:bg-gray-100
                                  transition-all
                                  cursor-pointer
                               "
          >
            <Typography variant="body2" className="text-start">
              {overdue.customer}
            </Typography>
            <Typography variant="body2" className="text-start">
              {overdue.overdueDate}
            </Typography>
            <Typography variant="body2" className="text-start">
              {overdue.days} روز
            </Typography>
            <Typography variant="body2" className="text-start">
              {overdue.overdueAmount} ریال
            </Typography>
            <Typography variant="body2" className="text-start">
              {overdue.totalRemaining} ریال
            </Typography>
            <Box className="flex gap-2">
              <Button variant="contained">پرداخت</Button>
              <Button variant="outlined" color="error">
                تماس
              </Button>
            </Box>
          </Box>
        ))}*/}
      {/*</Box>*/}
    </Container>
  );
};

export default Overdues;
