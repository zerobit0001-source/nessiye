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
    <TableRow key={sale.id}>
      <TableCell align="center">
        <Link
          href={`/dashboard/sales/${sale.id}`}
          className="underline text-blue-400"
        >
          {sale.id}
        </Link>
      </TableCell>

      <TableCell align="center">{sale.customer_name}</TableCell>

      <TableCell align="center">{formatPrice(sale.total)} تومان</TableCell>

      <TableCell align="center">
        {formatDate(sale.created_at, { dateStyle: "short" })} تومان
      </TableCell>
    </TableRow>
  );
};

export default SaleRow;

// <Box
//     onClick={() => {
//         console.log(sale);
//     }}
//     className="w-300
//                           xl:w-full
//                           sticky top-0
//                           z-50
//                           grid
//                           grid-cols-4
//                           items-center
//                           justify-between
//                           p-4
//                           border-b
//                           border-gray-400
//                           hover:bg-gray-100
//                           transition-all
//                           cursor-pointer
//                        "
// >
//     <Typography variant="body2" className="text-center">
//         {sale.id}
//     </Typography>
//     <Typography variant="body2" className="text-center">
//         {sale.customer_name || "ناشناس"}
//     </Typography>
//     {/* <Typography variant="body2" className="text-start">
//         {sale.description}
//     </Typography> */}
//     <Typography variant="body2" className="text-center">
//         {sale.total.toLocaleString("fa-IR")} تومان
//     </Typography>
//     {/* <Typography variant="body2" className="text-start">
//         {sale.paid || "-"}
//     </Typography> */}
//     {/* <Typography variant="body2" className="text-start">
//         {sale.total - sale.paid} ریال
//     </Typography> */}
//     <Typography variant="body2" className="text-center">
//         {formatDate(sale.created_at, { dateStyle: "short" })}
//     </Typography>
// </Box>
