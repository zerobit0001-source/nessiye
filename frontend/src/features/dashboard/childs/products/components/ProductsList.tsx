"use client";

import { useState } from "react";
import { useGetProductsQuery } from "../api/ApiProduct";
import Product from "@/features/dashboard/components/Product";
import ProductListLoading from "./ProductSkeletone";
import { useRouter } from "next/navigation";

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
    return (
        <>
            {isSuccess && data.products.length > 0 ? (
                data.products.map((product) => (
                    <Product key={product.id} product={product} />
                ))
            ) : (
                <p className="text-center text-gray-500">محصولی یافت نشد.</p>
            )}
        </>
    );
};

export default ProductsList;
