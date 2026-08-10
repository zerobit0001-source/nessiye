import Container from "@/components/dash/Container";
import CreatePagesTitle from "@/features/dashboard/childs/components/CreatePagesTitle";
import CreateSaleForm from "@/features/dashboard/childs/sales/components/CreateSaleForm";
import { Typography } from "@mui/material";

export default function CreateSalePage() {
  return (
    <Container>
      <CreatePagesTitle title="ثبت فروش جدید" subtitle=" ثبت سریع فروش نقدی و کاهش خودکار موجودی انبار." />
      <div className="flex justify-center w-full">
        <CreateSaleForm />
      </div>
    </Container>
  );
}
