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
        getProfile: builder.query<{ ok: boolean, phone_number: string, full_name: string, is_shop: boolean, shop_name: string, shop_address: string }, void>({
            query: () => "account/profile/",
            providesTags: ["Shops"]
        }),
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
    useLazyGetProfileQuery,
    useGetMeQuery,
    useGetShopQuery
} = ApiAccount;