import {
  GetDebtByIdResponeseType,
  GetDebtsResponeseType,
  GetSalesResponesType,
  PostSalesType,
} from "@/types/ApiResponesesType";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApiSales = createApi({
  reducerPath: "ApiSales",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
    credentials: "include",
  }),
  tagTypes: ["Sales", "Debts"],
  endpoints: (builder) => ({
    getSales: builder.query<
      GetSalesResponesType,
      {
        search?: string;
        status?: string;
        ordering?: string;
        period?: string;
        page?: number;
      }
    >({
      query: ({ search, status, ordering, period, page }) => ({
        url: "sales/",
        params: {
          search,
          status,
          ordering,
          period,
          page,
        },
      }),
      providesTags: ["Sales"],
    }),
    addSales: builder.mutation<GetSalesResponesType, PostSalesType>({
      query: (data) => ({
        url: "sales/",
        method: "POST",
        body: JSON.stringify(data),
      }),
      invalidatesTags: ["Sales", "Debts"],
    }),
    getDebts: builder.query<
      GetDebtsResponeseType,
      {
        search?: string;
        status?: string;
        ordering?: string;
        period?: string;
        page?: number;
      }
    >({
      query: ({ search, status, ordering, period, page }) => ({
        url: "debts/",
        params: {
          search,
          status,
          ordering,
          period,
          page,
        },
      }),
      providesTags: ["Debts"],
    }),
    getDebtById: builder.query<GetDebtByIdResponeseType, number>({
      query: (id) => `debts/${id}`,
    }),
  }),
});

export const {
  useGetSalesQuery,
  useAddSalesMutation,
  useGetDebtsQuery,
  useGetDebtByIdQuery,
} = ApiSales;
