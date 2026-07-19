"use client";

import React from "react";
import { useGetCustomersQuery } from "../api/ApiCustomer";
import CustomerRow from "./CustomerRow";
import Link from "next/link";
import CustomerRowSkeleton from "./CustomerRowSkeleton";
import {
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/redux/hooks";

export interface GetCustomersParams {
  search?: string;
  page?: number;
  ordering?: string;
  filtering?: string;
}

const CustomersList = ({
  search,
  page,
  ordering,
  filtering,
}: GetCustomersParams) => {
  const { data, isLoading, error } = useGetCustomersQuery({
    search,
    page,
    ordering,
    filtering,
  });

  const mode = useAppSelector((s) => s.theme);

  if (isLoading) {
    return Array.from({ length: 8 }).map((_, index) => (
      <CustomerRowSkeleton key={index} />
    ));
  }
  if (error) {
    return <p>Something went wrong.</p>;
  }

  const customers = data?.customers ?? [];
  console.log(customers);

  return (
    <>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 700 }}
          className="rounded-xl! overflow-hidden"
          aria-label="customized table"
        >
          <TableHead>
            <TableRow
              className={`${mode.mode == "light" ? "bg-gray-200" : "bg-blue-700"}`}
            >
              <TableCell align="center">مشتری</TableCell>
              <TableCell align="center">شماره</TableCell>
              <TableCell align="center">جمع حساب</TableCell>
              <TableCell align="center">پرداخت شده</TableCell>
              <TableCell align="center">باقیمانده</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <CustomerRow customer={customer} key={customer.id} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* {customers.map((customer) => (
                <Link href={`customers/${customer.id}`} key={customer.id}>
                    <CustomerRow customer={customer} />
                </Link>
            ))} */}
    </>
  );
};

export default CustomersList;

{
  /* <TablePagination
                    count={data.count} // تعداد کل مشتری‌ها
                    page={page}
                    rowsPerPage={10}
                    onPageChange={(_, newPage) => {
                        setPage(newPage);
                        refetch({
                            page: newPage + 1, // چون Django از 1 شروع می‌کنه
                        });
                    }}
                />
            </TableContainer> */
}
