"use client";
import { CustomerType } from "@/types/customerType";
import { Avatar, Box, Button, Typography } from "@mui/material";

interface CustomerRowProps {
    customer: CustomerType;
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
            <Box className="flex items-center gap-2">
                <Avatar alt={customer.full_name}>{customer?.full_name[0]}</Avatar>
                <Typography variant="body2" className="text-start">
                    {customer.full_name}
                </Typography>
            </Box>
            <Typography variant="body2" className="text-start">
                {customer.phone_number}
            </Typography>
            <Typography variant="body2" className="text-start">
                {customer?.totalCredit} ریال
            </Typography>
            <Typography variant="body2" className="text-start">
                {customer?.paid} ریال
            </Typography>
            <Typography variant="body2" className="text-start">
                {customer?.totalCredit - customer?.paid} ریال
            </Typography>
            <Button variant="text">پرداخت</Button>
        </Box>
    );
};

export default CustomerRow;
