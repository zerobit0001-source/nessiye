import React from "react";
import { PaymentType } from "@/types/types";
import { Box, Button, Typography } from "@mui/material";

interface PaymentRowProps {
    payment: PaymentType;
}

const PaymentRow = ({ payment }: PaymentRowProps) => {
    return (
        <Box
            key={payment.id}
            className="w-300
                                  xl:w-full
                                  sticky top-0
                                  z-50
                                  grid 
                                  grid-cols-6
                                  items-center
                                  justify-between
                                  p-4
                                  border-b
                                  border-gray-400
                                  hover:bg-gray-100
                                  transition-all
                                  cursor-pointer
                               "
        >
            <Typography variant="body2" className="text-start">
                {payment.id}
            </Typography>
            <Typography variant="body2" className="text-start">
                {payment.customer_name}
            </Typography>
            <Typography variant="body2" className="text-start">
                {payment.amount}
            </Typography>

            <Typography variant="body2" className="text-start">
                {payment.method}
            </Typography>

            <Typography variant="body2" className="text-start">
                {payment.created_at}
            </Typography>
            {payment.status === "success" ? (
                <Typography
                    className="bg-green-400/10 text-green-500 rounded-full  text-center w-max px-3"
                    variant="body2"
                >
                    موفق
                </Typography>
            ) : (
                <Typography
                    className="bg-red-400/10 text-red-500 rounded-full  text-center w-max px-3"
                    variant="body2"
                >
                    ناموفق
                </Typography>
            )}
        </Box>
    );
};

export default PaymentRow;
