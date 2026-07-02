"use client";
import { CustomerType } from "@/types/customerType";
import { CustomersListType } from "@/types/types";
import { Avatar, Box, Button, Typography } from "@mui/material";

interface CustomerRowProps {
    customer: CustomersListType;
}

const CustomerRow = ({ customer }: CustomerRowProps) => {
    return (
        <Box
            onClick={() => {
                console.log(customer);
            }}
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
            <Box className="flex items-center justify-start gap-2">
                <Avatar alt={customer.full_name}>
                    {customer?.full_name[0]}
                </Avatar>
                <Typography variant="body2" className="text-start">
                    {customer.full_name}
                </Typography>
            </Box>
            <Typography variant="body2" className="text-center">
                {customer.phone_number}
            </Typography>
            <Typography variant="body2" className="text-center" color="primary">
                {customer?.total_debts.toLocaleString("fa-IR")} تومان
            </Typography>
            <Typography variant="body2" className="text-center" color="success">
                {customer?.paid_amount.toLocaleString("fa-IR")} تومان
            </Typography>
            <Typography variant="body2" className="text-center" color="error">
                {customer?.remaining_amount.toLocaleString("fa-IR")} تومان
            </Typography>
            <Button variant="text">پرداخت</Button>
        </Box>
    );
};

export default CustomerRow;
