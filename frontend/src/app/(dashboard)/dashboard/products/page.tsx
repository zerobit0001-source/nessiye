import Container from "@/components/dash/Container";
import DashboardsPageHeader from "@/components/dash/DashboardsPageHeader";
import ProductsList from "@/features/dashboard/childs/products/components/ProductsList";
import ProductsPageCards from "@/features/dashboard/childs/products/components/ProductsPageCards";
import ProductsPageToolbar from "@/features/dashboard/childs/products/components/ProductsPageToolbar";
import LinkButton from "@/features/dashboard/components/LinkButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "محصولات",
  description:
    "مدیریت محصولات فروشگاه، مشاهده موجودی، قیمت‌ها و اطلاعات کالاها.",
};

interface Props {
  searchParams: Promise<{
    search?: string;
    category?: string;
    page?: string;
    ordering?: string;
    status?: string;
  }>;
}
const Products = async ({ searchParams }: Props) => {
  const params = await searchParams;

  return (
    <Container>
      <DashboardsPageHeader title="محصولات" caption="200 محصول">
        <LinkButton
          link="/dashboard/products/create"
          text="افزودن کالا"
          variant="contained"
        />
      </DashboardsPageHeader>
      <ProductsPageCards />
      <ProductsPageToolbar />
      <div className="">
        <ProductsList
          search={params.search}
          category={params.category}
          ordering={params.ordering}
          status={params.status}
          page={params.page}
        />
      </div>
    </Container>
  );
};

export default Products;
