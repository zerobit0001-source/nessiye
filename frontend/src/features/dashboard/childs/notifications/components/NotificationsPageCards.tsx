"use client";

import { Card } from "@mui/material";
import { useGetNotificationsQuery } from "../../dashboard/api/ApiDashboard";

export default function NotificationsPageCards() {
  const { data, isLoading, isError } = useGetNotificationsQuery({
    is_read: "",
  });

  const cards = [
    {
      title: "همه اعلان‌ها",
      value: data?.count ?? 0,
      iconClass: "text-slate-900",
    },
    {
      title: "خوانده نشده",
      value: data?.unread_count ?? 0,
      iconClass: "text-emerald-500",
    },
    {
      title: "امروز",
      value: 6,
      iconClass: "text-blue-600",
    },
  ];

  return (
    <div className="w-full flex items-center gap-2">
      {cards.map((card) => (
        <Card
          key={card.title}
          className="
            flex-1
            h-14
            px-4
            rounded-xl!
            flex
            items-center
            justify-between
            transition-all
            duration-200
          "
          elevation={3}
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-600">
              {card.value.toLocaleString("fa-IR")}
            </span>
          </div>

          <span className="text-xs font-semibold text-slate-500">
            {card.title}
          </span>
        </Card>
      ))}
    </div>
  );
}
