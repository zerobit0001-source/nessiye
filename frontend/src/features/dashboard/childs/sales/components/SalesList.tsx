"use client";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useGetSalesQuery } from "../api/ApiSales";
import SaleRow from "./SaleRow";
import SalesRowSkeleton from "./SalesRowSkeleton";
import { useAppSelector } from "@/lib/redux/hooks";
import AppTable from "../../components/AppTable";

interface Props {
  search?: string;
  status?: string;
  ordering?: string;
  period?: string;
}

const SalesList = ({ search, ordering, status, period }: Props) => {
  const { data, isLoading, error, isSuccess } = useGetSalesQuery({
    search,
    status,
    ordering,
    period,
  });

  const mode = useAppSelector((s) => s.theme);

  if (isLoading) {
    return Array.from({ length: 8 }).map((_, index) => (
      <SalesRowSkeleton key={index} />
    ));
  }
  if (error) {
    return <p>Something went wrong.</p>;
  }

  const sales = data?.results ?? [];

  console.log("this is sales ", sales);
  console.log("this is data ", data);

  return (
    <AppTable
      headers={["شناسه", "مشتری", "جمع", "تاریخ"]}
      data={sales}
      renderRow={(sale) => <SaleRow sale={sale} key={sale.id} />}
    />
  );
};

export default SalesList;

// <TableCell align="center">شناسه</TableCell>
// <TableCell align="center">مشتری</TableCell>
// <TableCell align="center">جمغ</TableCell>
// <TableCell align="center">تاریخ</TableCell>
