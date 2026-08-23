import Container from "@/components/dash/Container";
import CreatePagesTitle from "@/features/dashboard/childs/components/CreatePagesTitle";
import CreatePaymentForm from "@/features/dashboard/childs/payments/components/CreatePaymentForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ثبت پرداخت جدید",
  description: "ثبت پرداخت مشتری، تسویه بدهی‌ها و بروزرسانی وضعیت حساب نسیه.",
};

interface CreatePaymentPageProps {
  searchParams: {
    customerId?: string;
    debtId?: string;
  };
}

export default async function CreatePaymentPage({
  searchParams,
}: CreatePaymentPageProps) {
  const { customerId, debtId } = await searchParams;

  return (
    <Container>
      <CreatePagesTitle
        title="ثبت دریافت وجه (تسویه)"
        subtitle=" ثبت پرداخت‌های نقدی یا کارتخوان مشتری بابت بدهی‌های قبلی."
      />
      <div className="flex justify-center w-full">
        <CreatePaymentForm customerId={customerId} debtId={debtId} />
      </div>
    </Container>
  );
}
