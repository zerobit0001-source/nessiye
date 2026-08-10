import Container from "@/components/dash/Container";
import CreatePagesTitle from "@/features/dashboard/childs/components/CreatePagesTitle";
import CreatePaymentForm from "@/features/dashboard/childs/payments/components/CreatePaymentForm";
import { Typography } from "@mui/material";

export default function CreatePaymentPage() {
  return (
    <Container>
      <CreatePagesTitle title="ثبت دریافت وجه (تسویه)" subtitle=" ثبت پرداخت‌های نقدی یا کارتخوان مشتری بابت بدهی‌های قبلی." />
      <div className="flex justify-center w-full">
        <CreatePaymentForm />
      </div>
    </Container>
  );
}
