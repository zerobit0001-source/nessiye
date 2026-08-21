import { api } from "@/services/api";
import {
  GetReportsCardsResponse,
  GetReportsChartsResponse,
  GetReportsTopCustomersResponse,
} from "@/types/ApiResponesesType";

export const ApiReport = api.injectEndpoints({
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
