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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 3xl:grid-cols-6 gap-4">
        <ProductsList search={params.search} category={params.category} />
      </div>
    </Container>
  );
};

export default Products;
