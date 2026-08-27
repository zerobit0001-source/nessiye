"use client";

import { useSearchDashboardQuery } from "../../dashboard/api/ApiDashboard";


export default function SearchPage({q} : {q: string}) {

    const { data, error, isLoading } = useSearchDashboardQuery(q);

    console.log("SearchPage data:", data);

  return (
    <div>

    </div>
  );
}