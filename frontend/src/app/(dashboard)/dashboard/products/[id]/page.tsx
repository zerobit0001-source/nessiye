import type { Metadata } from "next";
import ProductDetailsPage from "@/features/dashboard/childs/products/components/ProductDetailsPage";

interface ProductProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProductProps): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `محصول ${id}`,
    description: `مشاهده جزئیات محصول شماره ${id}، قیمت و اطلاعات کالا.`,
  };
}

const Product = async ({ params }: ProductProps) => {
  const { id } = await params;

  return <ProductDetailsPage id={id} />;
};

export default Product;
