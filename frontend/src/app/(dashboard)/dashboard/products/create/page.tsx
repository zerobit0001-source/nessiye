import Container from "@/components/dash/Container";
import CreateProductForm from "@/features/dashboard/childs/products/components/CreateProductForm";
import { Typography } from "@mui/material";

export default function CreateProductPage() {
  return (
    <Container>
        <div className="w-full flex items-center justify-between">
          <span>
            <Typography variant="h6">افزودن محصول جدید</Typography>
            <Typography variant="caption">
              اطلاعات کالا را جهت ثبت در انبار و فروشگاه وارد نمایید.
            </Typography>
          </span>
        </div>
        <div className=" w-full flex items-center justify-center">
          <CreateProductForm />
        </div>
    </Container>
  );
}
