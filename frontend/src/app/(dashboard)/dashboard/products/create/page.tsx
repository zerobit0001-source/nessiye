import Container from "@/components/dash/Container";
import CreatePagesTitle from "@/features/dashboard/childs/components/CreatePagesTitle";
import CreateProductForm from "@/features/dashboard/childs/products/components/CreateProductForm";
import { Typography } from "@mui/material";

export default function CreateProductPage() {
  return (
    <Container>
        <CreatePagesTitle title="افزودن محصول جدید" subtitle="اطلاعات کالا را جهت ثبت در انبار و فروشگاه وارد نمایید." />
        <div className=" w-full flex items-center justify-center">
          <CreateProductForm />
        </div>
    </Container>
  );
}
