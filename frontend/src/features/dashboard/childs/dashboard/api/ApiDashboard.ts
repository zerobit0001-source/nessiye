import { GetDashboardCardsResponse } from "@/types/ApiResponesesType";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";




export const ApiDashboard = createApi({
    reducerPath: "ApiDashboard",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/",
        credentials: "include",
    }),
    endpoints: (builder) => ({
        getDashboardCards: builder.query<GetDashboardCardsResponse, void>({
            query: () => "dashboard/",
        }),
    })
})

export const {
    useGetDashboardCardsQuery
} = ApiDashboard