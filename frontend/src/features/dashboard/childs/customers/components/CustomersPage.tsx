"use client";
import { AddRounded } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CircularProgress,
  Typography,
} from "@mui/material";
import {
  useGetCustomerCreditsQuery,
  useGetCustomerQuery,
} from "../api/ApiCustomer";
import Container from "@/components/dash/Container";
import CustomerDetailsDebts from "./CustomerDetailsDebts";
import CustomerDetailsSales from "./CustomerDetailsSales";
import AddDebtForCustomerModal from "../../components/AddDebtForCustomerModal";
import AddSaleForCustomerModal from "../../components/AddSaleForCustomerModal";

const CustomersPage = ({ id }: { id: string }) => {
  const {
    data: credits,
    isLoading: creditsLoading,
    error: creditsError,
    isSuccess: creditsSuccess,
  } = useGetCustomerCreditsQuery(id);

  const {
    data: profile,
    isLoading: profileLoading,
    error: profileError,
    isSuccess: profileSuccess,
  } = useGetCustomerQuery(id);

  const customer = profileSuccess ? profile.customer : null;
  const summary = profileSuccess ? profile.summary : null;
  const sales = creditsSuccess ? credits.sales : [];
  const debts = creditsSuccess ? credits.debts : [];

  console.log(customer, summary);

  if (creditsLoading || profileLoading) {
    return (
      <Container>
        <div className="w-full h-screen flex items-center justify-center">
          <CircularProgress aria-label="loading..." />
        </div>
      </Container>
    );
  }

  if (!customer) {
    return (
      <Container>
        <div className="w-full h-screen flex items-center justify-center">
          <Typography variant="h6">مشتری یافت نشد</Typography>
        </div>
      </Container>
    );
  }

  return (
    <>
      <Card className="flex flex-wrap items-center justify-center md:justify-between p-6 rounded-lg!">
        <Box className="flex items-center gap-4">
          <Avatar
            alt={customer.full_name}
            variant="rounded"
            className="w-20! h-20! rounded-lg!"
          >
            {customer.full_name[0]}
          </Avatar>
          <Box className="flex flex-col ">
            <Typography variant="h5" className="font-bold!">
              {customer.full_name}
            </Typography>
            <Box className="flex gap-2">
              <Typography variant="body2">{customer.phone_number}</Typography>
              <Typography variant="body2">.</Typography>
              {customer.status === "active" ? (
                <Typography
                  className="bg-blue-400/10 text-blue-500 rounded-full  text-center w-max px-3"
                  variant="body2"
                >
                  فعال
                </Typography>
              ) : customer.status === "overdue" ? (
                <Typography
                  className="bg-red-400/10 text-red-500 rounded-full  text-center w-max px-3"
                  variant="body2"
                >
                  غیر فعال
                </Typography>
              ) : (
                <Typography
                  className="bg-green-400/10 text-green-500 rounded-full  text-center w-max px-3"
                  variant="body2"
                >
                  عالی
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
        <Box className="flex gap-4">
          <Box className="flex flex-col gap-0 items-center">
            <Typography variant="h6" color="info">
              {summary?.total_debt.toLocaleString("fa")} تومان
            </Typography>
            <Typography variant="caption">جمع کل حساب</Typography>
          </Box>
          <Box className="flex flex-col gap-0 items-center">
            <Typography variant="h6" color="success">
              {summary?.total_paid.toLocaleString("fa")} تومان
            </Typography>
            <Typography variant="caption">حساب شده</Typography>
          </Box>
          <Box className="flex flex-col gap-0 items-center">
            <Typography variant="h6" color="warning">
              {summary?.total_remaining.toLocaleString("fa")} تومان
            </Typography>
            <Typography variant="caption">باقی مانده</Typography>
          </Box>
        </Box>
      </Card>

      {/* each debt for customer */}

      <div>
        <Card
          className="flex flex-col p-4 border-b border-gray-400 "
          sx={{
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 0,
          }}
        >
          <Box className="flex items-center justify-between ">
            <Typography variant="h6" className="font-bold!">
              جدول اقساط
            </Typography>
          </Box>
        </Card>
        <Card
          className="flex flex-col"
          sx={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
        >
          {debts?.map((debt) => (
            <CustomerDetailsDebts key={debt.id} debt={debt} />
          ))}
        </Card>
      </div>

      {/* each sale for customer */}

      <div className="">
        <Card
          className="flex flex-col p-4 border-b border-gray-400"
          sx={{
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 0,
          }}
        >
          <Box className="flex items-center justify-between">
            <Typography variant="h6" className="font-bold!">
              جدول فروش ها
            </Typography>
          </Box>
        </Card>
        <Card
          className="flex flex-col"
          sx={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
        >
          {sales?.map((sale) => (
            <CustomerDetailsSales key={sale.id} sale={sale} />
          ))}
        </Card>
      </div>
    </>
  );
};

export default CustomersPage;
