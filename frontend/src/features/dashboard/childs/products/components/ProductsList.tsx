"use client";

import { useState } from "react";
import { useGetProductsQuery } from "../api/ApiProduct";
import Product from "@/features/dashboard/components/Product";
import ProductListLoading from "./ProductSkeletone";
import { useRouter } from "next/navigation";
import ProductRow from "./ProductRow";
import AppTable from "../../components/AppTable";

export interface GetProductsParams {
  search?: string;
  category?: string;
  // page?: number;
  // ordering?: string;
}

const ProductsList = ({ search, category }: GetProductsParams) => {
  const { data, error, isLoading, isSuccess } = useGetProductsQuery({
    search,
    category,
  });

  const router = useRouter();

  if (isLoading) {
    return <ProductListLoading count={5} />;
  }

  if (error) {
    return (
      <p className="w-full text-center text-lg">
        مشکلی در محصولات به وجود آمده
      </p>
    );
  }

  if (!isSuccess) {
    return;
  }
  if (data.results.length <= 0) {
    return <p className="text-center text-gray-500">محصولی یافت نشد.</p>;
  }

  console.log(data);
  return (
    // <AppTable
    //   data={data.results}
    //   headers={["محصول", "بارکد", "قیمت", "موجودی"]}
    //   renderRow={(product) => <ProductRow key={product.id} product={product} />}
    // />
    <>
      {isSuccess && data.results.length > 0 ? (
        data.results.map((product) => (
          <Product key={product.id} product={product} />
        ))
      ) : (
        <p className="text-center text-gray-500">محصولی یافت نشد.</p>
      )}
    </>
  );
};

export default ProductsList;
