import Container from "@/components/dash/Container";
import CreatePaymentForm from "@/features/dashboard/childs/payments/components/CreatePaymentForm";
import { Typography } from "@mui/material";

export default function CreatePaymentPage() {
  return (
    <Container>
      <div className="w-full flex items-center justify-between">
        <span>
          <Typography variant="h6">ثبت دریافت وجه (تسویه)</Typography>
          <Typography variant="caption">
            ثبت پرداخت‌های نقدی یا کارتخوان مشتری بابت بدهی‌های قبلی.
          </Typography>
        </span>
      </div>
      <div className="flex justify-center w-full">
        <CreatePaymentForm />
      </div>
    </Container>
  );
}
