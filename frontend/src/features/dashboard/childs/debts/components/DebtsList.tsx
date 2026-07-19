"use client";

import { Typography } from "@mui/material";
import { useGetDebtsQuery } from "../../sales/api/ApiSales";
import DebtsCreditsRowSkeleton from "./DebtsCreditsRowSkeleton";
import DebtsCreaditsRows from "./DebtsCreaditsRows";
import AppTable from "../../components/AppTable";
import { useState } from "react";

interface DebtsListProps {
  search?: string;
  status?: string;
  ordering?: string;
  period?: string;
}

export default function DebtsList({
  search,
  status,
  ordering,
  period,
}: DebtsListProps) {
  const [page, setPage] = useState(1);


  const { data, isLoading, error } = useGetDebtsQuery({
    search,
    status,
    ordering,
    period,
    page,
  });

  if (isLoading) {
    return Array.from({ length: 8 }).map((_, index) => (
      <DebtsCreditsRowSkeleton key={index} />
    ));
  }

  if (error) {
    return <Typography>Something went wrong.</Typography>;
  }

  const debts = data?.results ?? [];

  if (!debts.length) {
    return <Typography>بدهی‌ای یافت نشد.</Typography>;
  }

  console.log(data);

  return (
    <AppTable
      headers={[
        "شناسه",
        "مشتری",
        "جمع بدهی",
        "پرداخت شده",
        "باقیمانده",
        "تاریخ",
        "وضعیت",
      ]}
      data={debts}
      renderRow={(debt) => <DebtsCreaditsRows debt={debt} key={debt.id} />}
      pagination={{
        page,
        totalPages: data?.total_pages ?? 1,
        totalItems: data?.count ?? 0,
        pageSize: data?.page_size ?? 20,
        onChange: setPage,
      }}
    />
  );
}

// <TableCell align="center">شناسه</TableCell>
// <TableCell align="center">مشتری</TableCell>
// <TableCell align="center">جمع بدهی</TableCell>
// <TableCell align="center">پرداخت شده</TableCell>
// <TableCell align="center">باقیمانده</TableCell>
// <TableCell align="center">تاریخ</TableCell>
// <TableCell align="center">وضعیت</TableCell>
