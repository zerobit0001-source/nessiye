import {
  addPaymentResponse,
  GetPaymentsResponse,
  PostPaymentBody,
} from "@/types/ApiResponesesType";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApiPayment = createApi({
  reducerPath: "ApiPayment",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
    credentials: "include",
  }),

  tagTypes: ["Payments"],

  endpoints: (builder) => ({
    getPayments: builder.query<
      GetPaymentsResponse,
      { search?: string; status?: string; ordering?: string; period?: string }
    >({
      query: ({ search, status, ordering, period }) => ({
        url: "payments/",
        params: { search, status, ordering, period },
      }),
      providesTags: ["Payments"],
    }),
    addPayment: builder.mutation<addPaymentResponse, PostPaymentBody>({
      query: (data) => ({
        url: "payments/",
        method: "POST",
        body: JSON.stringify(data),
      }),
      invalidatesTags: ["Payments"],
    }),
  }),
});

export const { useGetPaymentsQuery, useAddPaymentMutation } = ApiPayment;
