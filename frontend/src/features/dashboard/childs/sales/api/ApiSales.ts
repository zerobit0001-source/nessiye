import { api } from "@/services/api";
import {
  GetDebtByIdResponeseType,
  GetDebtsResponeseType,
  GetOverduesResponseType,
  GetSalesResponesType,
  PostSalesType,
} from "@/types/ApiResponesesType";

export const ApiSales = api.injectEndpoints({
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
    getSalesCards: builder.query<GetSalesResponesType, void>({
      query: () => "sales/",
      providesTags: ["Sales"],
    }),
    addSales: builder.mutation<GetSalesResponesType, PostSalesType>({
      query: (data) => ({
        url: "sales/",
        method: "POST",
        body: JSON.stringify(data),
      }),
      invalidatesTags: ["Sales", "Debts", "Dashboard", "Customer" , "Notifications-count"],
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
    getDebtsCards: builder.query<GetDebtsResponeseType, void>({
      query: () => "debts/",
      providesTags: ["Debts"],
    }),
    getDebtById: builder.query<GetDebtByIdResponeseType, number>({
      query: (id) => `debts/${id}`,
    }),
    getOverdues: builder.query<GetOverduesResponseType, void>({
      query: () => ({
        url: "overdues/",
      }),
    }),
  }),
});

export const {
  useGetSalesQuery,
  useGetSalesCardsQuery,
  useAddSalesMutation,
  useGetDebtsQuery,
  useGetDebtsCardsQuery,
  useGetDebtByIdQuery,
  useGetOverduesQuery,
} = ApiSales;
