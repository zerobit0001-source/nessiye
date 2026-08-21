import Container from "@/components/dash/Container";
import CreatePagesTitle from "@/features/dashboard/childs/components/CreatePagesTitle";
import CreateSaleForm from "@/features/dashboard/childs/sales/components/CreateSaleForm";
import { Typography } from "@mui/material";

interface CreateSalePageProps {
  searchParams: {
    customerId?: string;
  };
}

export default async function CreateSalePage({
  searchParams,
}: CreateSalePageProps) {
  const { customerId } = await searchParams;
  return (
    <Container>
      <CreatePagesTitle
        title="ثبت فروش جدید"
        subtitle=" ثبت سریع فروش نقدی و کاهش خودکار موجودی انبار."
      />
      <div className="flex justify-center w-full">
        <CreateSaleForm customerId={customerId} />
      </div>
    </Container>
  );
}
