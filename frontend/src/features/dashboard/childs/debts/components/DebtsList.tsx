"use client";

import Link from "next/link";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useGetDebtsQuery } from "../../sales/api/ApiSales";
import DebtsCreditsRowSkeleton from "./DebtsCreditsRowSkeleton";
import DebtsCreaditsRows from "./DebtsCreaditsRows";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    cursor: "pointer",
    transition: "0.2s",

    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },

    "&:hover": {
        backgroundColor: theme.palette.action.selected,
    },

    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

export default function DebtsList() {
    const { data, isLoading, error } = useGetDebtsQuery();

    if (isLoading) {
        return Array.from({ length: 8 }).map((_, index) => (
            <DebtsCreditsRowSkeleton key={index} />
        ));
    }

    if (error) {
        return <Typography>Something went wrong.</Typography>;
    }

    const debts = data?.results ?? [];

    if (!debts.length) {
        return <Typography>بدهی‌ای یافت نشد.</Typography>;
    }

    return (
        <TableContainer
            component={Paper}
            elevation={0}
            sx={{
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
            }}
        >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">شناسه</TableCell>
                        <TableCell align="center">مشتری</TableCell>
                        <TableCell align="center">جمع بدهی</TableCell>
                        <TableCell align="center">پرداخت شده</TableCell>
                        <TableCell align="center">باقیمانده</TableCell>
                        <TableCell align="center">تاریخ</TableCell>
                        <TableCell align="center">وضعیت</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {debts.map((debt) => (
                        <DebtsCreaditsRows debt={debt} key={debt.id} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
