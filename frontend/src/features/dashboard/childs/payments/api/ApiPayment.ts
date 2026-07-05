import { addPaymentResponse, GetPaymentsResponse, PostPaymentBody } from "@/types/ApiResponesesType";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const ApiPayment = createApi({
    reducerPath: "ApiPayment",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/",
        credentials: "include",
    }),

    tagTypes: ['Payments'],

    endpoints: (builder) => ({
        getPayments: builder.query<GetPaymentsResponse, void>({
            query: () => "payments/",
            providesTags: ['Payments']
        }),
        addPayment: builder.mutation<addPaymentResponse, PostPaymentBody>({
            query: (data) => ({
                url: "payments/",
                method: "POST",
                body: JSON.stringify(data)
            }),
            invalidatesTags: ["Payments"]
        })
    })
})


export const {
    useGetPaymentsQuery,
    useAddPaymentMutation
} = ApiPayment