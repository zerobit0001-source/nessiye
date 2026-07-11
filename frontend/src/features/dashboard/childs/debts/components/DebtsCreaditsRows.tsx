"use client";
import { DebtsListType } from "@/types/types";
import { formatDate } from "@/utils/formatters";
import { Box, Typography } from "@mui/material";
import Link from "next/link";

interface DebtsRowsProps {
    debt: DebtsListType;
}

const DebtsCreaditsRows = ({ debt }: DebtsRowsProps) => {
    return (
        <Link href={`debts/${debt.id}`}>
            <Box
                onClick={() => {
                    console.log(debt);
                }}
                className="w-300
                                  xl:w-full
                                  sticky top-0
                                  z-50
                                  grid 
                                  grid-cols-7
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
                    {debt.debt_id}
                </Typography>
                <Typography variant="body2" className="text-center">
                    {debt.customer_name}
                </Typography>
                <Typography variant="body2" className="text-center">
                    {debt.total_amount.toLocaleString("fa-IR")} ریال
                </Typography>
                <Typography variant="body2" className="text-center">
                    {debt.paid_amount.toLocaleString("fa-IR")} ریال
                </Typography>
                <Typography variant="body2" className="text-center">
                    {debt.remaining_amount.toLocaleString("fa-IR")} ریال
                </Typography>
                <Typography variant="body2" className="text-center">
                    {formatDate(debt.created_at, { dateStyle: "short" })}
                </Typography>
                <div className="flex justify-center">
                    {/* {debt.status === "active" ? (
                    <Typography
                        className="bg-blue-400/10 text-blue-500 rounded-full  text-center w-max px-3"
                        variant="body2"
                    >
                        باز
                    </Typography>
                ) : debt.status === "overdue" ? (
                    <Typography
                        className="bg-red-400/10 text-red-500 rounded-full  text-center w-max px-3"
                        variant="body2"
                    >
                        نشده
                    </Typography>
                ) : (
                    <Typography
                        className="bg-green-400/10 text-green-500 rounded-full  text-center w-max px-3"
                        variant="body2"
                    >
                        بسته
                    </Typography>
                )} */}
                    {debt.is_paid ? (
                        <Typography
                            className="bg-green-400/10 text-green-500 rounded-full  text-center w-max px-3"
                            variant="body2"
                        >
                            پرداخت شده
                        </Typography>
                    ) : (
                        <Typography
                            className="bg-blue-400/10 text-blue-500 rounded-full  text-center w-max px-3"
                            variant="body2"
                        >
                            پرداخت نشده
                        </Typography>
                    )}
                </div>
            </Box>
        </Link>
    );
};

export default DebtsCreaditsRows;
