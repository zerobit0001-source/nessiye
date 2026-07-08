import { GetCategoriesResponse, GetProductResponse, GetProductsResponse } from "@/types/ApiResponesesType";
import { ProductModalFormType } from "@/types/modalsTypes";
import { GetProductsParams, ProductType } from "@/types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApiProduct = createApi({
    reducerPath: "ApiProduct",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/",
        credentials: "include",
    }),
    tagTypes: ["Products"],
    endpoints: (builder) => ({
        getProducts: builder.query<GetProductsResponse, GetProductsParams>({
            query: ({ search, category }) => ({
                url: "/products/",
                params: {
                    search,
                    category,
                },
            }),
            providesTags: ['Products']
        }),
        getProductById: builder.query<GetProductResponse, string>({
            query: (id) => `products/${id}/`,
            providesTags: ["Products"],
        }),
        addProduct: builder.mutation<GetProductResponse, ProductModalFormType>({
            query: (newProduct) => ({
                url: "products/",
                method: "POST",
                body: newProduct,
            }),
            invalidatesTags: ["Products"],
        }),
        deleteProduct: builder.mutation<any, any>({
            query: (id) => ({
                url: `products/${id}/`,
                method: "DELETE",
            }),
            invalidatesTags: ["Products"]
        }),
        updateProduct: builder.mutation<{ ok: boolean; product: ProductType }, { id: string; data: Partial<ProductType> }>({
            query: ({ id, data }) => ({
                url: `products/${id}/`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Products"],
        }),
        getCategories: builder.query<GetCategoriesResponse , void>({
            query: () => "products/categories/"
        })

    }),
});

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useAddProductMutation,
    useDeleteProductMutation,
    useUpdateProductMutation,
    useGetCategoriesQuery,
} = ApiProduct;