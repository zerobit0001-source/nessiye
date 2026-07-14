import { CustomerPayedType } from "@/data/DashboardCustomers";
import { Box, Button, Typography } from "@mui/material";
import React from "react";

interface CustomerPayedsProps {
    pay: CustomerPayedType;
}

const CustomersPayeds = ({ pay }: CustomerPayedsProps) => {
    return (
        <Box className="flex items-center justify-between py-2 border-b border-gray-300">
            <Box>
                <Typography variant="caption">تاریخ : {pay.date}</Typography>
                <Typography variant="body1" className="font-bold!">
                    {pay.amount} ریال
                </Typography>
            </Box>
            <Box className="flex items-center gap-2">
                <Typography variant="body1">حساب شده : {pay.paid}</Typography>
                <Typography variant="body2">
                    مانده : {pay.amount - pay.paid} ریال
                </Typography>
                {pay.status === "settled" ? (
                    <Button disabled variant="outlined">
                        پرداخت شده
                    </Button>
                ) : pay.status === "partial" ? (
                    <Button color="warning" variant="outlined">
                        پرداخت
                    </Button>
                ) : (
                    <Button color="error" variant="outlined">
                        پرداخت
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default CustomersPayeds;
