import Container from "@/components/dash/Container";
import DashboardsPageHeader from "@/components/dash/DashboardsPageHeader";
import AddProductModal from "@/features/dashboard/components/AddProductModal";
import ProductsSearch from "@/features/dashboard/childs/products/components/ProductsSearch";
import ProductsList from "@/features/dashboard/childs/products/components/ProductsList";
import ProductsPageCards from "@/features/dashboard/childs/products/components/ProductsPageCards";
import ProductsPageToolbar from "@/features/dashboard/childs/products/components/ProductsPageToolbar";
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
      <DashboardsPageHeader title="حساب ها" caption="200 محصول">
        <AddProductModal />
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
