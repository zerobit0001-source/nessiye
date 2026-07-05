"use client";

import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { PaymentType } from "@/types/types";
import { theme } from "@/theme/theme";
import { useState } from "react";

interface PaymentRowProps {
    payment: PaymentType;
}

const PaymentRow = ({ payment }: PaymentRowProps) => {
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
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
            <Typography variant="body2" className="text-center">
                {payment.id}
            </Typography>
            <Typography variant="body2" className="text-center">
                {payment.customer_name}
            </Typography>
            <Typography variant="body2" className="text-center">
                تومان {payment.paid_amount.toLocaleString("fa-IR")}
            </Typography>

            <Typography variant="body2" className="text-center" color="primary">
                درگاه
            </Typography>

            <Typography variant="body2" className="text-center">
                {payment.created_at}
            </Typography>
            <div className=" flex justify-center ">
                {payment.is_paid ? (
                    <Typography
                        className="bg-green-400/10 text-green-500 rounded-full  text-center w-max px-3"
                        variant="body2"
                    >
                        تکمیل
                    </Typography>
                ) : (
                    <Typography
                        className="bg-red-400/10 text-red-500 rounded-full  text-center w-max px-3"
                        variant="body2"
                    >
                        ناقص
                    </Typography>
                )}
            </div>
        </Box>
    );
};

export default PaymentRow;
