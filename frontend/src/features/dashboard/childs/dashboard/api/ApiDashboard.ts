import { api } from "@/services/api";
import { GetDashboardCardsResponse } from "@/types/ApiResponesesType";

export const ApiDashboard = api.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardCards: builder.query<GetDashboardCardsResponse, void>({
      query: () => "dashboard/",
    }),
  }),
});

export const { useGetDashboardCardsQuery } = ApiDashboard;
