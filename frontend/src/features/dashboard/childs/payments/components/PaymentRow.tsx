"use client";

import {
  Box,
  Button,
  Chip,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { PaymentsListType } from "@/types/types";
import { useState } from "react";
import PaymetsDetails from "./PaymetsDetails";
import { formatDate, formatPrice } from "@/utils/formatters";

interface PaymentRowProps {
  payment: PaymentsListType;
}

const PaymentRow = ({ payment }: PaymentRowProps) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <TableRow
        key={payment.id}
        onClick={handleClickOpen}
        className="cursor-pointer hover:bg-blue-100/30! group transition-all"
      >
        <TableCell align="center">{payment.payment_id}</TableCell>

        <TableCell align="center">{payment.customer_name}</TableCell>

        <TableCell align="center">
          {formatPrice(payment.amount)} تومان
        </TableCell>

        <TableCell align="center">درگاه</TableCell>

        <TableCell align="center">
          {formatDate(payment.created_at, { dateStyle: "short" })}
        </TableCell>

        <TableCell align="center">
          <Button variant="text">مشاهده</Button>
        </TableCell>
      </TableRow>
      <PaymetsDetails open={open} handleClose={handleClose} payment={payment} />
    </>
  );
};

export default PaymentRow;

// <>
//     <Box
//         onClick={handleClickOpen}
//         key={payment.id}
//         className="w-300
//                           xl:w-full
//                           sticky top-0
//                           z-50
//                           grid
//                           grid-cols-6
//                           items-center
//                           justify-between
//                           p-4
//                           border-b
//                           border-gray-400
//                           hover:bg-gray-100
//                           transition-all
//                           cursor-pointer
//                        "
//     >
//         <Typography variant="body2" className="text-center">
//             {payment.payment_id}
//         </Typography>
//         <Typography variant="body2" className="text-center">
//             {payment.customer_name}
//         </Typography>
//         <Typography variant="body2" className="text-center">
//             تومان {payment?.amount?.toLocaleString("fa-IR")}
//         </Typography>

//         <Typography
//             variant="body2"
//             className="text-center"
//             color="primary"
//         >
//             درگاه
//         </Typography>

//         <Typography variant="body2" className="text-center">
//             {formatDate(payment.created_at, { dateStyle: "short" })}
//         </Typography>
//         <div className=" flex justify-center ">
//             <Button variant="text">مشاهده</Button>
//         </div>
//     </Box>
//     <PaymetsDetails
//         open={open}
//         handleClose={handleClose}
//         payment={payment}
//     />
// </>
