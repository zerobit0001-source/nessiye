import { api } from "@/services/api";
import {
  addPaymentResponse,
  GetPaymentsResponse,
  PostPaymentBody,
} from "@/types/ApiResponesesType";

export const ApiPayment = api.injectEndpoints({
  endpoints: (builder) => ({
    getPayments: builder.query<
      GetPaymentsResponse,
      {
        search?: string;
        status?: string;
        ordering?: string;
        period?: string;
        page?: number;
      }
    >({
      query: ({ search, status, ordering, period, page }) => ({
        url: "payments/",
        params: { search, status, ordering, period, page },
      }),
      providesTags: ["Payments"],
    }),
    addPayment: builder.mutation<addPaymentResponse, PostPaymentBody>({
      query: (data) => ({
        url: "payments/",
        method: "POST",
        body: JSON.stringify(data),
      }),
      invalidatesTags: [
        "Payments",
        "Dashboard",
        "Debts",
        "Notifications-count",
      ],
    }),
  }),
});

export const { useGetPaymentsQuery, useAddPaymentMutation } = ApiPayment;
