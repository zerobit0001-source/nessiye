"use client";

import Link from "next/link";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useGetDebtsQuery } from "../../sales/api/ApiSales";
import DebtsCreditsRowSkeleton from "./DebtsCreditsRowSkeleton";
import DebtsCreaditsRows from "./DebtsCreaditsRows";
import { useAppSelector } from "@/lib/redux/hooks";
import AppTable from "../../components/AppTable";

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
  const { data, isLoading, error } = useGetDebtsQuery({
    search,
    status,
    ordering,
    period,
  });

  const mode = useAppSelector((s) => s.theme);

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
