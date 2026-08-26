"use client";
import React, { useState } from "react";
import { useGetOverduesQuery } from "../../sales/api/ApiSales";
import AppTable from "../../components/AppTable";
import OverdueRow from "./OverdueRow";

export default function OverdueList() {
  const [page, setPage] = useState(1);

  const overdueQuery = useGetOverduesQuery();
 
  const overdues = overdueQuery.data?.results ?? [];

  return (
    <AppTable
      headers={["مشتری", "مانده مبلغ", "تاریخ ثبت", "وضعیت", "اقدام سریع"]}
      data={overdues}
      renderRow={(overdue) => <OverdueRow Overdue={overdue} key={overdue.id} />}
      pagination={{
        page,
        totalPages: overdueQuery.data?.total_pages ?? 1,
        totalItems: overdueQuery.data?.count ?? 0,
        pageSize: overdueQuery.data?.page_size ?? 20,
        onChange: setPage,
      }}
      loading={overdueQuery.isLoading}
    />
  );
}
