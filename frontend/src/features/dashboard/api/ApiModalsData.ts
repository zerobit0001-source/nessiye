
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApiModalsData = createApi({
    reducerPath: "ApiModalsData",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/",
        credentials: "include",
    }),
    endpoints: (builder) => ({
        getModalData: builder.query<any, { type: 'products' | 'customers' | 'credits' }>({
            query: ({type}) => `modal?type=${type}`,
        }),
    }),
});

export const {
    useGetModalDataQuery
} = ApiModalsData;