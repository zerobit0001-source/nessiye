import type { Metadata } from "next";
import Container from "@/components/dash/Container";
import CreatePagesTitle from "@/features/dashboard/childs/components/CreatePagesTitle";
import CreateCustomerForm from "@/features/dashboard/childs/customers/components/CreateCustomerForm";

export const metadata: Metadata = {
  title: "ثبت مشتری جدید",
  description:
    "ثبت مشتری جدید و ایجاد حساب مشتری در فروشگاه با استفاده از نسیه.",
};

export default function CreateCustomerPage() {
  return (
    <Container>
      <CreatePagesTitle
        title="ثبت مشتری جدید"
        subtitle="اطلاعات خواسته شده را تکمیل کنید"
      />
      <CreateCustomerForm />
    </Container>
  );
}
