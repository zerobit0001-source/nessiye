"use client";

import { useState } from "react";

const filters = [
  {
    label: "همه",
    value: "all",
  },
  {
    label: "خوانده نشده",
    value: "unread",
  },
  {
    label: "خوانده شده",
    value: "read",
  },
];

export default function NotificationsPageFilter() {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <div className="flex items-center gap-2">
      {filters.map((filter) => {
        const isActive = activeFilter === filter.value;

        return (
          <button
            key={filter.value}
            type="button"
            onClick={() => setActiveFilter(filter.value)}
            className={`
              h-9
              px-4
              rounded-full
              border
              text-xs
              font-semibold
              transition-all
              duration-200
              ${
                isActive
                  ? "border-slate-900 bg-slate-900 text-white shadow-sm"
                  : "border-slate-300 bg-white text-slate-500 hover:border-slate-400 hover:text-slate-700"
              }
            `}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
