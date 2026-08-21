import { api } from "@/services/api";
import { GetDashboardCardsResponse } from "@/types/ApiResponesesType";

const ApiDashboard = api.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardCards: builder.query<GetDashboardCardsResponse, void>({
      query: () => "dashboard/",
      providesTags: ["Dashboard"],
    }),
  }),
});

export const { useGetDashboardCardsQuery } = ApiDashboard;
