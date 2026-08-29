import Container from "@/components/dash/Container";
import CreatePagesTitle from "@/features/dashboard/childs/components/CreatePagesTitle";
import CreateSaleForm from "@/features/dashboard/childs/sales/components/CreateSaleForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ثبت فروش جدید",
  description:
    "ثبت فروش جدید، افزودن محصولات خریداری شده و مدیریت تراکنش فروش مشتریان.",
};

interface CreateSalePageProps {
  searchParams?: {
    customerId?: string;
  };
}

export default function CreateSalePage({ searchParams }: CreateSalePageProps) {
  const { customerId } = searchParams ?? {};

  return (
    <Container>
      <CreatePagesTitle
        title="ثبت فروش جدید"
        subtitle="ثبت سریع فروش نقدی و کاهش خودکار موجودی انبار."
      />
      <div className="flex justify-center w-full">
        <CreateSaleForm customerId={customerId} />
      </div>
    </Container>
  );
}
