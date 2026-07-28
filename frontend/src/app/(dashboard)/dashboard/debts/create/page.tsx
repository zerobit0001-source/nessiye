import Container from "@/components/dash/Container";
import CreateDebtForm from "@/features/dashboard/childs/debts/components/CreateDebtForm";
import { Typography } from "@mui/material";

export default function CreateDebtPage() {
  return (
    <Container>
      <div className="w-full flex items-center justify-between">
        <span>
          <Typography variant="h6">ثبت بدهی جدید</Typography>
          <Typography variant="caption">
            افزودن اقلام خریداری شده به صورت نسیه برای مشتری مشخص.
          </Typography>
        </span>
      </div>
      <div className="flex justify-center w-full">
        <CreateDebtForm />
      </div>
    </Container>
  );
}
