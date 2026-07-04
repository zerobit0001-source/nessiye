import { GetMeResponse, GetShopDetailResponse } from "@/types/ApiResponesesType";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApiAccount = createApi({
    reducerPath: "ApiAccount",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/",
        credentials: "include",
    }),
    tagTypes: ["Shops", "Shop"],
    endpoints: (builder) => ({
        getMe: builder.query<GetMeResponse, void>({
            query: () => "account/me",
            providesTags: ["Shops"]
        }),
        getShop: builder.query<GetShopDetailResponse, string>({
            query: (id) => `account/my_shops/${id}/history`,
            providesTags: ["Shop"]
        })
    })
});

export const {
    useGetMeQuery,
    useGetShopQuery
} = ApiAccount;