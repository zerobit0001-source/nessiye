"use client";
import { OverduesListType } from "@/types/types";
import { formatDate, formatPrice } from "@/utils/formatters";
import Link from "next/link";
import { TableCell, Chip, TableRow } from "@mui/material";
import { CallRounded, SmsRounded } from "@mui/icons-material";

interface OverduesRowsProps {
  Overdue: OverduesListType;
}

const OverdueRow = ({ Overdue }: OverduesRowsProps) => {
  return (
    <TableRow
      key={Overdue.id}
      className="cursor-pointer hover:bg-blue-100/30! group transition-all"
    >
      <TableCell align="center">
        <Link
          href={`/dashboard/debts/${Overdue.debt_id}`}
          className="underline text-blue-400"
        >
          {Overdue.customer_name}
        </Link>
      </TableCell>

      <TableCell align="center">
        {formatPrice(Overdue.remaining_amount)} تومان
      </TableCell>

      <TableCell align="center">
        {formatDate(Overdue.created_at, { dateStyle: "short" })}
      </TableCell>

      <TableCell align="center">
        <Chip label="معوق" variant="filled" color="error" />
      </TableCell>

      <TableCell align="center">
        <div className="flex items-center gap-2">
          <CallRounded color="success" />
          <SmsRounded color="primary" />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default OverdueRow;
