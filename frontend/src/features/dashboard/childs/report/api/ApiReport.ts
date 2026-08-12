import {
  GetReportsCardsResponse,
  GetReportsChartsResponse,
  GetReportsTopCustomersResponse,
} from "@/types/ApiResponesesType";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApiReport = createApi({
  reducerPath: "ApiReport",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
    credentials: "include",
  }),
  tagTypes: ["Charts", "Cards", "TopCustomers", "TopDebtors", "TopProducts"],
  endpoints: (builder) => ({
    getCharts: builder.query<GetReportsChartsResponse, void>({
      query: () => "reports/charts/",
      providesTags: ["Charts"],
    }),
    getCards: builder.query<GetReportsCardsResponse, void>({
      query: () => "reports/cards/",
      providesTags: ["Cards"],
    }),
    getTopCustomers: builder.query<GetReportsTopCustomersResponse, void>({
      query: () => "reports/tops/customers/",
      providesTags: ["TopCustomers"],
    }),
    getTopDebtors: builder.query<GetReportsChartsResponse, void>({
      query: () => "reports/tops/debtors/",
      providesTags: ["TopDebtors"],
    }),
    getTopProducts: builder.query<GetReportsChartsResponse, void>({
      query: () => "reports/tops/products/",
      providesTags: ["TopProducts"],
    }),
  }),
});

export const {
  useGetChartsQuery,
  useGetCardsQuery,
  useGetTopCustomersQuery,
  useGetTopDebtorsQuery,
  useGetTopProductsQuery,
} = ApiReport;
