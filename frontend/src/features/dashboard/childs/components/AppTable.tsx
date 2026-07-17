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
}

export default function AppTable<T>({
  headers,
  data,
  renderRow,
}: AppTableProps<T>) {
  const mode = useAppSelector((s) => s.theme);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 800 }}>
        <TableHead>
          <TableRow
            className={mode.mode === "light" ? "bg-gray-200" : "bg-blue-700"}
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
      <AppTablePagination
        page={1}
        totalPages={10}
        totalItems={100}
        pageSize={10}
        onChange={() => {}}
      />
    </TableContainer>
  );
}
