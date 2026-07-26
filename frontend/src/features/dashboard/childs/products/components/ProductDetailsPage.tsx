"use client";

import Container from "@/components/dash/Container";
import CopyButtonSku from "@/features/dashboard/components/CopyButtonSku";
import ProductPageHeader from "@/features/dashboard/components/ProductPageHeader";
import { Avatar, Card, Typography } from "@mui/material";
import { useGetProductByIdQuery } from "../api/ApiProduct";
import ProductDetailsPageDetails from "./ProductDetailsPageDetails";
import ProductDetailsPageStats from "./ProductDetailsPageStats";
import ProductRecentActivity from "./ProductRecentActivity";

const ProductDetailsPage = ({ id }: { id: number }) => {
  const { data, isLoading, isSuccess, error } = useGetProductByIdQuery(id);

  const product = isSuccess ? data.product : null;

  const formatter = new Intl.NumberFormat("fa-IR", {
    style: "currency",
    currency: "IRR",
  });
  const dateFormatter = new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (isLoading) {
    return (
      <Container>
        <div className="w-full h-screen flex items-center justify-center">
          <Typography variant="h6">در حال بارگذاری...</Typography>
        </div>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container>
        <div className="w-full h-screen flex items-center justify-center">
          <Typography variant="h6">محصول یافت نشد</Typography>
        </div>
      </Container>
    );
  }

  console.log(product);
  return (
    <Container>
      <ProductPageHeader id={id} />
      <ProductDetailsPageDetails
        name={product.name}
        stock={product.stock}
        barcode={product.barcode}
        category={product.category}
        productId={id}
      />
      <ProductDetailsPageStats product={product} />

      <div className="w-full grid grid-cols-6">
        <ProductRecentActivity />
      </div>
    </Container>
  );
};

export default ProductDetailsPage;
