"use client";
import { CustomerType } from "@/types/customerType";
import { CustomersListType } from "@/types/types";
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
                {customer.total_debts}
            </TableCell>
            <TableCell align="center" sx={{ color: "success.main" }}>
                {customer.paid_amount}
            </TableCell>
            <TableCell align="center" sx={{ color: "error.main" }}>
                {customer.remaining_amount}
            </TableCell>
            <TableCell align="center">
                <RemoveRedEyeRounded className="text-white/0  transition-all  group-hover:text-gray-400" />
            </TableCell>
        </TableRow>
    );
};

export default CustomerRow;

// <Box
//     onClick={() => {
//         console.log(customer);
//     }}
//     className="w-300
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
// >
//     <Box className="flex items-center justify-start gap-2">
//         <Avatar alt={customer.full_name}>
//             {customer?.full_name[0]}
//         </Avatar>
//         <Typography variant="body2" className="text-start">
//             {customer.full_name}
//         </Typography>
//     </Box>
//     <Typography variant="body2" className="text-center">
//         {customer.phone_number}
//     </Typography>
//     <Typography variant="body2" className="text-center" color="primary">
//         {customer?.total_debts.toLocaleString("fa-IR")} تومان
//     </Typography>
//     <Typography variant="body2" className="text-center" color="success">
//         {customer?.paid_amount.toLocaleString("fa-IR")} تومان
//     </Typography>
//     <Typography variant="body2" className="text-center" color="error">
//         {customer?.remaining_amount.toLocaleString("fa-IR")} تومان
//     </Typography>
//     <Button variant="text">پرداخت</Button>
// </Box>
