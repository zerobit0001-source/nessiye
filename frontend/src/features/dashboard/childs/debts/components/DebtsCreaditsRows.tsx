"use client";
import { DebtsListType } from "@/types/types";
import { formatDate, formatPrice } from "@/utils/formatters";
import Link from "next/link";
import { TableCell, Chip, TableRow } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/navigation";

interface DebtsRowsProps {
  debt: DebtsListType;
}

const DebtsCreaditsRows = ({ debt }: DebtsRowsProps) => {
  return (
    <TableRow
      key={debt.id}
      className="cursor-pointer hover:bg-blue-100/30! group transition-all"
    >
      <TableCell align="center">
        <Link
          href={`/dashboard/debts/${debt.id}`}
          className="underline text-blue-400"
        >
          {debt.debt_id}
        </Link>
      </TableCell>

      <TableCell align="center">{debt.customer_name}</TableCell>

      <TableCell align="center">
        {formatPrice(debt.total_amount)} تومان
      </TableCell>

      <TableCell align="center">
        {formatPrice(debt.paid_amount)} تومان
      </TableCell>

      <TableCell align="center">
        {formatPrice(debt.remaining_amount)} تومان
      </TableCell>

      <TableCell align="center">
        {formatDate(debt.created_at, { dateStyle: "short" })}
      </TableCell>

      <TableCell align="center">
        <Chip
          size="small"
          label={debt.is_paid ? "تسویه شده" : "فعال"}
          color={debt.is_paid ? "success" : "warning"}
        />
      </TableCell>
    </TableRow>
  );
};

export default DebtsCreaditsRows;
