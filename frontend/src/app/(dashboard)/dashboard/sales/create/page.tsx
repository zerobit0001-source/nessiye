import Container from "@/components/dash/Container";
import CreateSaleForm from "@/features/dashboard/childs/sales/components/CreateSaleForm";
import { Typography } from "@mui/material";

export default function CreateSalePage() {
  return (
    <Container>
      <div className="w-full flex items-center justify-between">
        <span>
          <Typography variant="h6">ثبت فروش جدید</Typography>
          <Typography variant="caption">
            ثبت سریع فروش نقدی و کاهش خودکار موجودی انبار.
          </Typography>
        </span>
      </div>
      <div className="flex justify-center w-full">
        <CreateSaleForm />
      </div>
    </Container>
  );
}
