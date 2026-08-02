import {
  GetReportsCardsResponse,
  GetReportsChartsResponse,
} from "@/types/ApiResponesesType";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApiReport = createApi({
  reducerPath: "ApiReport",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
    credentials: "include",
  }),
  tagTypes: ["Charts", "Cards"],
  endpoints: (builder) => ({
    getCharts: builder.query<GetReportsChartsResponse, void>({
      query: () => "reports/charts/",
      providesTags: ["Charts"],
    }),
    getCards: builder.query<GetReportsCardsResponse, void>({
      query: () => "reports/cards/",
      providesTags: ["Cards"],
    }),
  }),
});

export const {
  useGetChartsQuery,
  useGetCardsQuery,
} = ApiReport;
