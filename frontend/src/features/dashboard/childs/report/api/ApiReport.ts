import { GetReportsChartsResponse } from "@/types/ApiResponesesType";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApiReport = createApi({
  reducerPath: "ApiReport",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
    credentials: "include",
  }),
  tagTypes: ["charts"],
  endpoints: (builder) => ({
    getCharts: builder.query<GetReportsChartsResponse , void>({
      query: () => "reports/charts/",
      providesTags: ["charts"],
    }),
  }),
});

export const {
  useGetChartsQuery ,
} = ApiReport;
