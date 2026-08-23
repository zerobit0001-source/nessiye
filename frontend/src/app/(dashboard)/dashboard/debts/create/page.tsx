import type { Metadata } from "next";
import Container from "@/components/dash/Container";
import CreatePagesTitle from "@/features/dashboard/childs/components/CreatePagesTitle";
import CreateDebtForm from "@/features/dashboard/childs/debts/components/CreateDebtForm";

interface CreateDebtPageProps {
  searchParams: Promise<{
    customerId?: string;
  }>;
}

export const metadata: Metadata = {
  title: "ثبت بدهی جدید",
  description:
    "ثبت بدهی جدید برای مشتری، افزودن اقلام خریداری شده و مدیریت حساب نسیه.",
};

export default async function CreateDebtPage({
  searchParams,
}: CreateDebtPageProps) {
  const { customerId } = await searchParams;

  return (
    <Container>
      <CreatePagesTitle
        title="ثبت بدهی جدید"
        subtitle="افزودن اقلام خریداری شده به صورت نسیه برای مشتری مشخص."
      />
      <div className="flex justify-center w-full">
        <CreateDebtForm customerId={customerId} />
      </div>
    </Container>
  );
}
