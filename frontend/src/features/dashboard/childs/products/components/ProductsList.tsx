"use client";

import { useState } from "react";
import { useGetProductsQuery } from "../api/ApiProduct";
import Product from "@/features/dashboard/components/Product";
import ProductListLoading from "./ProductSkeletone";
import { useRouter } from "next/navigation";
import ProductRow from "./ProductRow";
import AppTable from "../../components/AppTable";
import AppTablePagination from "../../components/AppTablePagination";

export interface GetProductsParams {
  search?: string;
  category?: string;
  page?: number;
  ordering?: string;
}

const ProductsList = ({ search, category, ordering }: GetProductsParams) => {
  const [page, setPage] = useState(1);

  const { data, error, isLoading, isSuccess } = useGetProductsQuery({
    search,
    category,
    page,
    ordering,
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

  const pagination = {
    page,
    totalPages: data?.total_pages ?? 1,
    totalItems: data?.count ?? 0,
    pageSize: data?.page_size ?? 20,
    onChange: setPage,
  };
  return (
    // <AppTable
    //   data={data.results}
    //   headers={["محصول", "بارکد", "قیمت", "موجودی"]}
    //   renderRow={(product) => <ProductRow key={product.id} product={product} />}
    // />
    <>
      <AppTablePagination {...pagination} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 3xl:grid-cols-6 gap-4 mt-4">
        {isSuccess && data.results.length > 0 ? (
          data.results.map((product) => (
            <Product key={product.id} product={product} />
          ))
        ) : (
          <p className="text-center text-gray-500">محصولی یافت نشد.</p>
        )}
      </div>
    </>
  );
};

export default ProductsList;
