"use client";

import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography,
    useMediaQuery,
} from "@mui/material";
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
        <>
            <Box
                onClick={handleClickOpen}
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

                <Typography
                    variant="body2"
                    className="text-center"
                    color="primary"
                >
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
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    جزئیات پرداخت #{payment.id}
                </DialogTitle>
                <DialogContent>
                    <Typography>نام مشتری : {payment.customer_name}</Typography>
                    <Typography>
                        شماره مشتری : {payment.customer_phone}
                    </Typography>
                    <Typography>
                        مبلغ پرداخت شده :{" "}
                        {payment.paid_amount.toLocaleString("fa-IR")}
                    </Typography>
                    <Typography>
                        مبلغ مانده : {payment.remaining.toLocaleString("fa-IR")}
                    </Typography>
                    <Chip
                        color={payment.is_paid ? "success" : "error"}
                        label={
                            payment.is_paid
                                ? "کامل پرداخت شده"
                                : "کامل پرداخت نشده"
                        }
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus color="error">
                        بستن
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default PaymentRow;
