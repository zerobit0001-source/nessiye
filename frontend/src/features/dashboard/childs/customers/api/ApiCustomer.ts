import { api } from "@/services/api";
import {
  GetCustomerDetailsResponse,
  GetCustomerResponse,
  GetCustomersResponse,
} from "@/types/ApiResponesesType";
import { CustomerModalFormType } from "@/types/modalsTypes";
import { CustomerType } from "@/types/types";

export const ApiCustomer = api.injectEndpoints({
  endpoints: (builder) => ({
    getCustomers: builder.query<
      GetCustomersResponse,
      { search?: string; page?: string; ordering?: string; filtering?: string }
    >({
      query: ({ search, page, ordering, filtering }) => ({
        url: "customers/",
        params: {
          search,
          page,
          ordering,
          filtering,
        },
      }),

      providesTags: ["Customers"],
    }),
    getCustomersSummary: builder.query<GetCustomersResponse, void>({
      query: () => "customers/",
    }),
    getCustomer: builder.query<GetCustomerResponse, string>({
      query: (id) => `customers/${id}/`,
      providesTags: ["Customer"],
    }),
    getCustomerCredits: builder.query<
      GetCustomerDetailsResponse,
      string | number
    >({
      query: (id) => `customers/${id}/history/`,
      providesTags: ["Credits"],
    }),
    addCustomer: builder.mutation<GetCustomersResponse, CustomerModalFormType>({
      query: (data) => ({
        url: "customers/",
        method: "POST",
        body: JSON.stringify(data),
      }),
      invalidatesTags: ["Customers"],
    }),
    verifyCustomer: builder.mutation<
      { ok: boolean; message: string; customer: CustomerType },
      { phone_number: string | number; code: string | number }
    >({
      query: (data) => ({
        url: "customers/verify",
        method: "POST",
        body: JSON.stringify(data),
      }),
      invalidatesTags: ["Customers"],
    }),
  }),
});

export const {
  useGetCustomersQuery,
  useGetCustomersSummaryQuery,
  useAddCustomerMutation,
  useGetCustomerCreditsQuery,
  useLazyGetCustomerCreditsQuery,
  useGetCustomerQuery,
  useVerifyCustomerMutation,
} = ApiCustomer;
