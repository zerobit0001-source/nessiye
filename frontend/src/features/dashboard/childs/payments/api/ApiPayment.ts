import { addPaymentResponse, GetPaymentsResponse, PostPaymentBody } from "@/types/ApiResponesesType";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const ApiPayment = createApi({
    reducerPath: "ApiPayment",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/",
        credentials: "include",
    }),

    endpoints: (builder) => ({
        getPayments: builder.query<GetPaymentsResponse, void>({
            query: () => "payments/"
        }),
        addPayment: builder.mutation<addPaymentResponse, PostPaymentBody>({
            query: (data) => ({
                url: "payments/",
                method: "POST",
                body: JSON.stringify(data)
            })
        })
    })
})


export const {
    useGetPaymentsQuery,
    useAddPaymentMutation
} = ApiPayment