"use client";

import { useGetNotificationsQuery } from "../../dashboard/api/ApiDashboard";
import NotificationsList from "./NotificationsList";

export default function Notifications() {
  const { data, isLoading, isError, refetch } = useGetNotificationsQuery({
    is_read: "",
  });

  if (isLoading) {
    return <NotificationsList notifications={[]} />;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-sm font-medium text-slate-700">
          دریافت اعلان‌ها با خطا مواجه شد
        </p>

        <button
          type="button"
          onClick={refetch}
          className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
        >
          تلاش مجدد
        </button>
      </div>
    );
  }

  return <NotificationsList notifications={data?.results ?? []} />;
}
