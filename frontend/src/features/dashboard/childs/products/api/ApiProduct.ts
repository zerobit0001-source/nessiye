import { api } from "@/services/api";
import {
  GetCategoriesResponse,
  GetProductResponse,
  GetProductsResponse,
} from "@/types/ApiResponesesType";
import { ProductModalFormType } from "@/types/modalsTypes";
import { GetProductsParams, ProductType } from "@/types/types";

export const ApiProduct = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<GetProductsResponse, GetProductsParams>({
      query: ({ search, category, page, ordering, status }) => ({
        url: "/products/",
        params: {
          search,
          category,
          page,
          ordering,
          status,
        },
      }),
      providesTags: ["Products"],
    }),
    getProductsCards: builder.query<GetProductsResponse, void>({
      query: () => "products/",
      providesTags: ["Products"],
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
      invalidatesTags: ["Products", "Notifications-count"],
    }),
    deleteProduct: builder.mutation<any, any>({
      query: (id) => ({
        url: `products/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products", "Notifications-count"],
    }),
    updateProduct: builder.mutation<
      { ok: boolean; product: ProductType },
      { id: string; data: Partial<ProductType> }
    >({
      query: ({ id, data }) => ({
        url: `products/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products", "Notifications-count"],
    }),
    getCategories: builder.query<GetCategoriesResponse, void>({
      query: () => "products/categories/",
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsCardsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useGetCategoriesQuery,
} = ApiProduct;
