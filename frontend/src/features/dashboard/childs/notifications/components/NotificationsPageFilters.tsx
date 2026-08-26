"use client";

import { useRouter, useSearchParams } from "next/navigation";

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
] as const;

type FilterValue = (typeof filters)[number]["value"];

export default function NotificationsPageFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeFilter =
    (searchParams.get("filter") as FilterValue | null) ?? "all";

  const handleFilterChange = (value: FilterValue) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all") {
      params.delete("filter");
    } else {
      params.set("filter", value);
    }

    params.delete("page");

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      {filters.map((filter) => {
        const isActive = activeFilter === filter.value;

        return (
          <button
            key={filter.value}
            type="button"
            onClick={() => handleFilterChange(filter.value)}
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
