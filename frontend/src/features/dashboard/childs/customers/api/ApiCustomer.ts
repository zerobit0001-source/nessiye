import { GetCustomerDetailsResponse, GetCustomerResponse, GetCustomersResponse } from "@/types/ApiResponesesType";
import { CustomerModalFormType } from "@/types/modalsTypes";
import { CustomerType } from "@/types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const ApiCustomer = createApi({
    reducerPath: "ApiCustomer",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/",
        credentials: "include",
    }),
    tagTypes: ["Customers", "Customer", "Credits"],
    endpoints: (builder) => ({
        getCustomers: builder.query<GetCustomersResponse, { search: string }>({
            query: ({ search }) => ({
                url: "customers/",
                params: {
                    search,
                },
            }),

            providesTags: ["Customers"]
        }),
        getCustomer: builder.query<GetCustomerResponse, string>({
            query: (id) => `customers/${id}/`,
            providesTags: ["Customer"]
        }),
        getCustomerCredits: builder.query<GetCustomerDetailsResponse, string | number>({
            query: (id) => `customers/${id}/history/`,
            providesTags: ["Credits"]
        }),
        addCustomer: builder.mutation<GetCustomersResponse, CustomerModalFormType>({
            query: (data) => ({
                url: "customers/",
                method: "POST",
                body: JSON.stringify(data)
            }),
            invalidatesTags: ["Customers"]
        }),
        verifyCustomer: builder.mutation<{ ok: boolean, message: string, customer: CustomerType }, { phone_number: string | number, code: string | number }>({
            query: (data) => ({
                url: "customers/verify",
                method: "POST",
                body: JSON.stringify(data)
            }),
            invalidatesTags: ["Customers"]
        })
    })
})

export const {
    useGetCustomersQuery,
    useAddCustomerMutation,
    useGetCustomerCreditsQuery,
    useLazyGetCustomerCreditsQuery,
    useGetCustomerQuery,
    useVerifyCustomerMutation
} = ApiCustomer