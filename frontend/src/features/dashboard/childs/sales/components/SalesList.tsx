"use client";

import { useGetSalesQuery } from "../api/ApiSales";
import SaleRow from "./SaleRow";
import SalesRowSkeleton from "./SalesRowSkeleton";
import AppTable from "../../components/AppTable";
import { useState } from "react";
import { Alert } from "@mui/material";

interface Props {
  search?: string;
  status?: string;
  ordering?: string;
  period?: string;
}

const headers = ["شناسه", "مشتری", "جمع", "تاریخ"];

const SalesList = ({ search, ordering, status, period }: Props) => {
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useGetSalesQuery({
    search,
    status,
    ordering,
    period,
    page,
  });

  if (isLoading) {
    return Array.from({ length: 8 }).map((_, i) => (
      <SalesRowSkeleton key={i} />
    ));
  }

  if (error) {
    return <Alert severity="error">خطایی رخ داد.</Alert>;
  }

  const sales = data?.results ?? [];

  return (
    <AppTable
      headers={headers}
      data={sales}
      renderRow={(sale) => <SaleRow key={sale.id} sale={sale} />}
      pagination={{
        page,
        totalPages: data?.total_pages ?? 1,
        totalItems: data?.count ?? 0,
        pageSize: data?.page_size ?? 20,
        onChange: setPage,
      }}
    />
  );
};

export default SalesList;

// <TableCell align="center">شناسه</TableCell>
// <TableCell align="center">مشتری</TableCell>
// <TableCell align="center">جمغ</TableCell>
// <TableCell align="center">تاریخ</TableCell>
