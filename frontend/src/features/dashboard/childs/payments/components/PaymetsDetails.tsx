"use client";

import { PaymentType } from "@/types/types";
import {
    Box,
    Button,
    Chip,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    List,
    ListItem,
    ListItemText,
    Typography,
    useMediaQuery,
} from "@mui/material";
import React from "react";
import { useGetDebtByIdQuery } from "../../sales/api/ApiSales";
import { formatDate, formatPrice } from "@/utils/formatters";

interface PaymentsDetailsProps {
    open: boolean;
    handleClose: () => void;
    payment: PaymentType;
}

const PaymetsDetails = ({
    open,
    handleClose,
    payment,
}: PaymentsDetailsProps) => {
    const fullScreen = false; //useMediaQuery((theme: any) => theme.breakpoints.down("sm"));

    const { data, isLoading, error } = useGetDebtByIdQuery(payment.debt_id, {
        skip: !open,
    });

    const debt = data?.debt;

    return (
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>جزئیات پرداخت #{payment.payment_id}</DialogTitle>

            <DialogContent dividers>
                {isLoading ? (
                    <Box display="flex" justifyContent="center" py={5}>
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Typography color="error">خطا در دریافت اطلاعات</Typography>
                ) : debt ? (
                    <>
                        <Typography>
                            <strong>نام مشتری:</strong> {debt.customer_name}
                        </Typography>

                        <Typography>
                            <strong>شماره مشتری:</strong> {debt.customer_phone}
                        </Typography>

                        <Typography mt={1}>
                            <strong>توضیحات:</strong> {debt.description || "-"}
                        </Typography>

                        <Box mt={2} mb={2}>
                            <Chip
                                color={debt.is_paid ? "success" : "warning"}
                                label={
                                    debt.is_paid ? "تسویه شده" : "تسویه نشده"
                                }
                            />
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <Typography fontWeight="bold">مبالغ</Typography>

                        <Typography>
                            مبلغ کل: {formatPrice(debt.amount)} تومان
                        </Typography>

                        <Typography color="success.main">
                            پرداخت شده: {formatPrice(debt.paid_amount)} تومان
                        </Typography>

                        <Typography color="error.main">
                            مانده: {formatPrice(debt.remaining)} تومان
                        </Typography>

                        <Divider sx={{ my: 3 }} />

                        <Typography fontWeight="bold" mb={1}>
                            اقلام خرید
                        </Typography>

                        <List dense>
                            {debt.items.map((item) => (
                                <ListItem key={item.id}>
                                    <ListItemText
                                        primary={item.product_name}
                                        secondary={`تعداد: ${
                                            item.quantity
                                        } | قیمت: ${formatPrice(
                                            item.price,
                                        )} تومان`}
                                    />
                                </ListItem>
                            ))}
                        </List>

                        <Divider sx={{ my: 3 }} />

                        <Typography fontWeight="bold" mb={1}>
                            پرداخت‌ها
                        </Typography>

                        <List dense>
                            {debt.payments?.map((pay) => (
                                <ListItem key={pay.id}>
                                    <ListItemText
                                        primary={`${formatPrice(
                                            pay.amount,
                                        )} تومان`}
                                        secondary={formatDate(
                                            pay.created_at,
                                            {},
                                        )}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </>
                ) : (
                    <Typography>اطلاعاتی یافت نشد.</Typography>
                )}
            </DialogContent>

            <DialogActions>
                <Button color="error" variant="contained" onClick={handleClose}>
                    بستن
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PaymetsDetails;
