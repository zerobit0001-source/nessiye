import { api } from "@/services/api";
import { GetDashboardCardsResponse } from "@/types/ApiResponesesType";
import { number } from "framer-motion";

const ApiDashboard = api.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardCards: builder.query<GetDashboardCardsResponse, void>({
      query: () => "dashboard/",
      providesTags: ["Dashboard"],
    }),
    getUnreadedNotificationsCount: builder.query<
      { ok: boolean; unread_count: number },
      void
    >({
      query: () => "notifications/unread-count/",
      providesTags: ["Notifications-count"],
    }),
    getNotifications: builder.query({
      query: ({ type }) => ({
        url: "notifications/",
        params: {
          type,
        },
      }),
      providesTags: ["Notifications"],
    }),
  }),
});

export const {
  useGetDashboardCardsQuery,
  useGetUnreadedNotificationsCountQuery,
  useGetNotificationsQuery,
  
} = ApiDashboard;
