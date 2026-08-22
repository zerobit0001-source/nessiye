import type { Metadata } from "next";
import Container from "@/components/dash/Container";
import CustomerPageHeader from "@/features/dashboard/components/CustomerPageHeader";
import CustomersPage from "@/features/dashboard/childs/customers/components/CustomersPage";

interface CustomerProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: CustomerProps): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `مشتری ${id}`,
    description: `مشاهده اطلاعات، بدهی‌ها، فروش‌ها و وضعیت حساب مشتری ${id}`,
  };
}

const Customer = async ({ params }: CustomerProps) => {
  const { id } = await params;

  return (
    <Container>
      <CustomerPageHeader id={id} />
      <CustomersPage id={id} />
    </Container>
  );
};

export default Customer;
