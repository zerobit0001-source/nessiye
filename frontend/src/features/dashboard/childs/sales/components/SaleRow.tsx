"use client";
import { SalesListType } from "@/types/types";
import { formatDate, formatPrice } from "@/utils/formatters";
import Link from "next/link";
import { TableCell, Chip, TableRow } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/navigation";

interface SaleRowPropType {
  sale: SalesListType;
}

const SaleRow = ({ sale }: SaleRowPropType) => {
  return (
    <TableRow
      key={sale.id}
      className="cursor-pointer hover:bg-blue-100/30! group transition-all"
    >
      <TableCell align="center">
        <Link
          href={`/dashboard/sales/${sale.id}`}
          className="underline text-blue-400"
        >
          {sale.id}
        </Link>
      </TableCell>

      <TableCell align="center">{sale.customer_name ?? "ناشناس"}</TableCell>

      <TableCell align="center">{formatPrice(sale.total)} تومان</TableCell>

      <TableCell align="center">
        {formatDate(sale.created_at, { dateStyle: "short" })}
      </TableCell>
    </TableRow>
  );
};

export default SaleRow;
