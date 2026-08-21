import { api } from "@/services/api";
import {
  GetDebtByIdResponeseType,
  GetDebtsResponeseType,
  GetMeResponse,
  GetPaymentByIdResponeseType,
  GetPaymentsResponse,
  GetSaleByIdResponeseType,
  GetSalesResponesType,
  GetShopDetailResponse,
} from "@/types/ApiResponesesType";

export const ApiAccount = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<
      {
        ok: boolean;
        phone_number: string;
        full_name: string;
        is_shop: boolean;
        shop_name: string;
        shop_address: string;
      },
      void
    >({
      query: () => "account/profile/",
      providesTags: ["Shops"],
    }),
    getMe: builder.query<GetMeResponse, void>({
      query: () => "account/me",
      providesTags: ["Shops"],
    }),
    getShop: builder.query<GetShopDetailResponse, string>({
      query: (id) => `account/me/shops/${id}`,
      providesTags: ["Shop"],
    }),
    getShopDebts: builder.query<GetDebtsResponeseType, number>({
      query: (id) => `account/me/shops/${id}/debts`,
      providesTags: ["Shop/Debts"],
    }),
    getShopSales: builder.query<GetSalesResponesType, number>({
      query: (id) => `account/me/shops/${id}/sales`,
      providesTags: ["Shop/Sales"],
    }),
    getShopPayments: builder.query<GetPaymentsResponse, number>({
      query: (id) => `account/me/shops/${id}/payments`,
      providesTags: ["Shop/Payments"],
    }),
    getShopDebtDetails: builder.query<
      GetDebtByIdResponeseType,
      { shopId: number; debtId: string }
    >({
      query: ({ shopId, debtId }) =>
        `account/me/shops/${shopId}/debts/${debtId}`,
      providesTags: ["Shop/Debts"],
    }),
    getShopSaleDetails: builder.query<
      GetSaleByIdResponeseType,
      { shopId: number; saleId: number }
    >({
      query: ({ shopId, saleId }) =>
        `account/me/shops/${shopId}/sales/${saleId}`,
      providesTags: ["Shop/Sales"],
    }),
    getShopPaymentDetails: builder.query<
      GetPaymentByIdResponeseType,
      { shopId: number; paymentId: number }
    >({
      query: ({ shopId, paymentId }) =>
        `account/me/shops/${shopId}/payments/${paymentId}`,
      providesTags: ["Shop/Payments"],
    }),
  }),
});

export const {
  useLazyGetProfileQuery,
  useGetMeQuery,
  useGetShopQuery,
  useGetShopDebtsQuery,
  useGetShopSalesQuery,
  useGetShopPaymentsQuery,
  useGetShopDebtDetailsQuery,
  useGetShopSaleDetailsQuery,
  useGetShopPaymentDetailsQuery,
} = ApiAccount;
