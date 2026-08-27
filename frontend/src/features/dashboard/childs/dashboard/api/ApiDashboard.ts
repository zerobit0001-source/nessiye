import { api } from "@/services/api";
import {
  GetDashboardCardsResponse,
  GetNotificationsResponseType,
  GetSearchResponseType,
} from "@/types/ApiResponesesType";

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
    getNotifications: builder.query<
      GetNotificationsResponseType,
      { is_read: "true" | "false" | "" }
    >({
      query: ({ is_read }) => ({
        url: "notifications/",
        params: {
          is_read,
        },
      }),
      providesTags: ["Notifications"],
    }),
    readMessageById: builder.mutation({
      query: (id) => ({
        url: `notifications/${id}/`,
        method: "POST",
      }),
      invalidatesTags: ["Notifications", "Notifications-count"],
    }),
    searchDashboard: builder.query<GetSearchResponseType, string>({
      query: (query) => ({
        url: "dashboard/search/",
        params: {
          q: query,
        },
      }),
    }),
  }),
});

export const {
  useGetDashboardCardsQuery,
  useGetUnreadedNotificationsCountQuery,
  useGetNotificationsQuery,
  useReadMessageByIdMutation,
  useSearchDashboardQuery,
} = ApiDashboard;
