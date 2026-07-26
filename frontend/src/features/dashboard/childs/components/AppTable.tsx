"use client";

import { ReactNode } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useAppSelector } from "@/lib/redux/hooks";
import AppTablePagination from "./AppTablePagination";

interface AppTableProps<T> {
  headers: string[];
  data: T[];
  renderRow: (item: T) => ReactNode;
  pagination?: {
    page: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
    onChange: (page: number) => void;
  };
}

export default function AppTable<T>({
  headers,
  data,
  renderRow,
  pagination,
}: AppTableProps<T>) {
  const mode = useAppSelector((s) => s.theme.mode);

  return (
    <TableContainer component={Paper} className="rounded-xl! overflow-hidden!">
      <Table sx={{ minWidth: 800 }} className="rounded-xl! overflow-hidden">
        <TableHead>
          <TableRow
            className={mode === "light" ? "bg-gray-200" : "bg-blue-700"}
          >
            {headers.map((header) => (
              <TableCell key={header} align="center">
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>{data.map(renderRow)}</TableBody>
      </Table>
      {pagination && <AppTablePagination {...pagination} />}
    </TableContainer>
  );
}
