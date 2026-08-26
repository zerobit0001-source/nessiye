"use client";
import React, { useState } from "react";
import { useGetShopPaymentsQuery } from "../api/ApiAccount";
import ShopDetailsPaymentCard from "./ShopDetailsPaymentCard";
import AppTablePagination from "@/features/dashboard/childs/components/AppTablePagination";

export default function ShopDetailsPaymentTab({ shopId }: { shopId: number }) {
  const [page, setPage] = useState(1);
  const paymentsQuery = useGetShopPaymentsQuery(shopId);

  if (paymentsQuery.isLoading) return <div>Loading...</div>;
  if (paymentsQuery.error)
    return <div>Error: {paymentsQuery.error.message}</div>;
  if (!paymentsQuery.isSuccess) return <div>No data</div>;
 
  return (
    <div className="flex flex-col gap-4">
      {paymentsQuery.data.total_pages > 1 && (
        <AppTablePagination
          page={page}
          totalPages={paymentsQuery.data.total_pages}
          totalItems={paymentsQuery.data.count}
          pageSize={paymentsQuery.data.page_size}
          onChange={setPage}
        />
      )}
      {paymentsQuery.data.results.map((payment) => (
        <ShopDetailsPaymentCard key={payment.id} payment={payment} shopId={shopId} />
      ))}
    </div>
  );
}
