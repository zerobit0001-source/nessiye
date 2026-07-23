"use client";
import React, { useState } from "react";
import { useGetShopDebtsQuery } from "../api/ApiAccount";
import ShopDetailsDebtCard from "./ShopDetailsDebtCard";
import AppTablePagination from "@/features/dashboard/childs/components/AppTablePagination";

export default function ShopDetailsDebtTab({ shopId }: { shopId: number }) {
  const [page, setPage] = useState(1);

  const debtsQuery = useGetShopDebtsQuery(shopId);

  if (debtsQuery.isLoading) return <div>Loading...</div>;
  if (debtsQuery.error) return <div>Error: {debtsQuery.error.message}</div>;
  if (!debtsQuery.isSuccess) return <div>No data</div>;

  console.log("this is customers debts : ", debtsQuery.data);

  return (
    <div className="flex flex-col gap-4">
      {debtsQuery.data.total_pages > 1 && (
        <AppTablePagination
          page={page}
          totalPages={debtsQuery.data.total_pages}
          totalItems={debtsQuery.data.count}
          pageSize={debtsQuery.data.page_size}
          onChange={setPage}
        />
      )}
      {debtsQuery.data.results.map((debt) => (
        <ShopDetailsDebtCard key={debt.id} debt={debt} />
      ))}
    </div>
  );
}
