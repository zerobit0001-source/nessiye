"use client";
import Container from "@/components/dash/Container";
import SlideUpBoxAnimation from "@/components/SlideUpBoxAnimation";
import { useAppSelector } from "@/lib/redux/hooks";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useGetShopQuery } from "../api/ApiAccount";
import CustomerDetailsDebts from "@/features/dashboard/childs/customers/components/CustomerDetailsDebts";
import CustomerDetailsSales from "@/features/dashboard/childs/customers/components/CustomerDetailsSales";
import ShopDetailsDebts from "./ShopDetailsDebts";

const ShopDetailsPage = ({ id }: { id: string }) => {
  // const user = useAppSelector((s) => s.userInfo);
  // const { data, isLoading, error, isSuccess } = useGetShopQuery(id);

  // if (isLoading) {
  //     return <CircularProgress />;
  // }
  // if (error) {
  //     return <p>something went wrong</p>;
  // }

  // const debts = isSuccess ? data.debts : [];
  // const sales = isSuccess ? data.sales : [];

  return (
    <Container>
      <SlideUpBoxAnimation delay={0}>
        <Box
          sx={{
            bgcolor: "primary.main",
            color: "white",
            borderRadius: 5,
            p: 4,
            mt: 5,
          }}
          className="w-full"
        >
          <div className="">
            <Typography variant="body1">مجموع بدهی</Typography>
            <Typography variant="h4" className="font-bold!">
              31,240,000
            </Typography>
            <Typography variant="body1">تومان</Typography>
          </div>
          <Divider sx={{ borderColor: "rgba(255,255,255,0.18)", my: 2.5 }} />
          <div className="flex gap-4 ">
            <div className="">
              <Typography variant="body1">مشتری</Typography>
              <Typography variant="h6">{user.full_name}</Typography>
            </div>
            <div className="">
              <Typography variant="body1">شماره تماس</Typography>
              <Typography variant="h6">{user.phone_number}</Typography>
            </div>
          </div>
        </Box>
      </SlideUpBoxAnimation>
      <div className="flex items-center gap-5 w-full" style={{ gap: "10px" }}>
        <SlideUpBoxAnimation delay={0.2} className="mx-5!">
          <Link href={"#"}>
            <Button variant="outlined">همه</Button>
          </Link>
        </SlideUpBoxAnimation>
        <SlideUpBoxAnimation delay={0.3}>
          <Link href={"#"}>
            <Button variant="outlined" color="error">
              پرداخت نشده
            </Button>
          </Link>
        </SlideUpBoxAnimation>
        <SlideUpBoxAnimation delay={0.4}>
          <Link href={"#"}>
            <Button variant="outlined" color="warning">
              پرداخت جزئی
            </Button>
          </Link>
        </SlideUpBoxAnimation>
        <SlideUpBoxAnimation delay={0.5}>
          <Link href={"#"}>
            <Button variant="outlined" color="success">
              پرداخت شده
            </Button>
          </Link>
        </SlideUpBoxAnimation>
      </div>

      <div className="flex flex-col ">
        <div className="">
          <Typography variant="h6">نسیه ها</Typography>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {debts.map((debt) => (
            <ShopDetailsDebts debt={debt} key={debt.id} />
          ))}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="">
          <Typography variant="h6">فروش ها</Typography>
        </div>
        <div className="">
          {sales.map((sale) => (
            <CustomerDetailsSales sale={sale} key={sale.id} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default ShopDetailsPage;
