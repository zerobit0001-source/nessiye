"use client";
import React, { useState } from "react";
import { useGetShopSalesQuery } from "../api/ApiAccount";
import ShopDetailsSaleCard from "./ShopDetailsSaleCard";
import AppTablePagination from "@/features/dashboard/childs/components/AppTablePagination";

export default function ShopDetailsSaleTab({ shopId }: { shopId: number }) {
  const [page, setPage] = useState(1);
  const salesQuery = useGetShopSalesQuery(shopId);

  if (salesQuery.isLoading) return <div>Loading...</div>;
  if (salesQuery.error) return <div>Error: {salesQuery.error.message}</div>;
  if (!salesQuery.isSuccess) return <div>No data</div>;
 
  return (
    <div className="flex flex-col gap-4">
      {salesQuery.data.total_pages > 1 && (
        <AppTablePagination
          page={page}
          totalPages={salesQuery.data.total_pages}
          totalItems={salesQuery.data.count}
          pageSize={salesQuery.data.page_size}
          onChange={setPage}
        />
      )}
      {salesQuery.data.results.map((sale) => (
        <ShopDetailsSaleCard key={sale.id} sale={sale} />
      ))}
    </div>
  );
}
