import {
  Button,
  Card,
  CardContent,
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import AppTable from "../../components/AppTable";
import { HistoryRounded } from "@mui/icons-material";

export default function ProductRecentActivity() {
  return (
    <Card
      elevation={1}
      sx={{ border: 1, borderColor: "divider", borderRadius: 4 }}
      className="col-span-4"
    >
      <CardContent className="p-0!">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          className="p-4"
        >
          <Box>
            <Typography variant="body1" fontWeight={700}>
              <HistoryRounded color="primary" /> آخرین فاکتورهای شامل این کالا
            </Typography>
          </Box>

          <Typography variant="caption" color="text.secondary">
            نمایش ۱۰ فروش اخیر
          </Typography>
        </Stack>

        {/* Table */}
        {/*<AppTable
          headers={[
            "کد فاکتور",
            "مشتری",
            "تاریخ فروش",
            "تعداد",
            "مبلغ کل",
            "نوع پرداخت",
            "",
          ]}
          data={[
            {
              id: 1,
              sale_code: "SL-8841",
              customer: "رضا کریمی",
              created_at: "...",
              quantity: 2,
              total_price: 210000,
              payment_type: "credit",
            },
            {
              id: 1,
              sale_code: "SL-8841",
              customer: "رضا کریمی",
              created_at: "...",
              quantity: 2,
              total_price: 210000,
              payment_type: "credit",
            },
            {
              id: 1,
              sale_code: "SL-8841",
              customer: "رضا کریمی",
              created_at: "...",
              quantity: 2,
              total_price: 210000,
              payment_type: "credit",
            },
          ]}
          renderRow={(item) => (
            <TableRow>
              <TableCell align="center">{item.sale_code}</TableCell>
              <TableCell align="center">{item.customer}</TableCell>
              <TableCell align="center">{item.created_at}</TableCell>
              <TableCell align="center">{item.quantity}</TableCell>
              <TableCell align="center">{item.total_price}</TableCell>
              <TableCell align="center">{item.payment_type}</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          )}
        />*/}
        <Table sx={{ minWidth: 800 }} className="">
          <TableHead>
            <TableRow className="bg-gray-100/50 rounded-none!">
              {[
                "کد فاکتور",
                "مشتری",
                "تاریخ فروش",
                "تعداد",
                "مبلغ کل",
                "نوع پرداخت",
                "",
              ].map((header) => (
                <TableCell key={header} align="center">
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {[
              {
                id: 1,
                sale_code: "SL-8841",
                customer: "رضا کریمی",
                created_at: "...",
                quantity: 2,
                total_price: 210000,
                payment_type: "credit",
              },
              {
                id: 2,
                sale_code: "SL-8841",
                customer: "رضا کریمی",
                created_at: "...",
                quantity: 2,
                total_price: 210000,
                payment_type: "credit",
              },
              {
                id: 3,
                sale_code: "SL-8841",
                customer: "رضا کریمی",
                created_at: "...",
                quantity: 2,
                total_price: 210000,
                payment_type: "credit",
              },
            ].map((item) => (
              <TableRow key={item.id}>
                <TableCell align="center">{item.sale_code}</TableCell>
                <TableCell align="center">{item.customer}</TableCell>
                <TableCell align="center">{item.created_at}</TableCell>
                <TableCell align="center">{item.quantity}</TableCell>
                <TableCell align="center">{item.total_price}</TableCell>
                <TableCell align="center">{item.payment_type}</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
