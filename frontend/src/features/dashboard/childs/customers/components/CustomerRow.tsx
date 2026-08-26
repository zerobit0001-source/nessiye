"use client";
import { CustomerType } from "@/types/customerType";
import { CustomersListType } from "@/types/types";
import { formatPrice } from "@/utils/formatters";
import { RemoveRedEyeRounded } from "@mui/icons-material";
import { TableCell, TableRow } from "@mui/material";
import { useRouter } from "next/navigation";

interface CustomerRowProps {
  customer: CustomersListType;
}

const CustomerRow = ({ customer }: CustomerRowProps) => {
  const router = useRouter();

  return (
    <TableRow
      key={customer.id}
      hover
      className="cursor-pointer hover:bg-blue-100/30! group transition-all"
      onClick={() => router.push(`customers/${customer.id}`)}
    >
      <TableCell align="center">{customer.full_name}</TableCell>
      <TableCell align="center">{customer.phone_number}</TableCell>
      <TableCell align="center" sx={{ color: "primary.main" }}>
        {formatPrice(customer.total_debts)}
      </TableCell>
      <TableCell align="center" sx={{ color: "success.main" }}>
        {formatPrice(customer.paid_amount)}
      </TableCell>
      <TableCell align="center" sx={{ color: "error.main" }}>
        {formatPrice(customer.remaining_amount)}
      </TableCell>
      <TableCell align="center">
        <RemoveRedEyeRounded className="text-white/0  transition-all  group-hover:text-gray-400" />
      </TableCell>
    </TableRow>
  );
};

export default CustomerRow;

