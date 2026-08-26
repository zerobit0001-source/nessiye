"use client";
import Container from "@/components/dash/Container";
import SlideUpBoxAnimation from "@/components/SlideUpBoxAnimation";
import { useAppSelector } from "@/lib/redux/hooks";
import {
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useGetShopQuery } from "../api/ApiAccount";
import CustomerDetailsDebts from "@/features/dashboard/childs/customers/components/CustomerDetailsDebts";
import CustomerDetailsSales from "@/features/dashboard/childs/customers/components/CustomerDetailsSales";
import ShopDetailsDebts from "./ShopDetailsDebts";
import SlideUpAnimation from "@/components/SlideUpAnimation";
import {
  ChevronLeftRounded,
  ChevronRightRounded,
  LocationOnRounded,
} from "@mui/icons-material";
import ShopStatusFilter from "./ShopStatusFilter";
import ShopDetailsTab from "./ShopDetailsTab";
import ShopDetailsPageCards from "./ShopDetailsPageCards";

const ShopDetailsPage = ({
  shopId,
  status,
}: {
  shopId: string;
  status?: "active" | "settled" | "overdue";
}) => {
  const { data, isLoading, error, isSuccess } = useGetShopQuery(shopId);

  if (isLoading) {
    return <CircularProgress />;
  }
  if (error) {
    return <p>something went wrong</p>;
  }

  // const debts = isSuccess ? data.debts : [];
  // const sales = isSuccess ? data.sales : [];
  const summary = isSuccess
    ? {
        total_purchase: data.shop.total_purchase,
        total_debt: data.shop.total_debt,
        total_paid: data.shop.total_paid,
        total_remaining: data.shop.total_remaining,
      }
    : {
        total_purchase: 0,
        total_debt: 0,
        total_paid: 0,
        total_remaining: 0,
      };
 
  return (
    <Container>
      <SlideUpAnimation>
        <div className="max-w-4xl m-auto p-4 md:p-0 flex flex-col gap-5 mt-5">
          {/* Back link */}
          <Link
            href="/account"
            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-primary transition-colors"
          >
            <ChevronRightRounded fontSize="small" />
            بازگشت
          </Link>

          {/* Shop details card */}
          <Card
            elevation={1}
            className="rounded-xl! p-6 border border-gray-200"
          >
            <Typography variant="h6" className="font-bold!">
              {data?.shop.shop_name}
            </Typography>
            <Typography variant="caption">
              <LocationOnRounded color="disabled" fontSize="small" />
              {data?.shop.shop_address}
            </Typography>
          </Card>

          {/* Customer Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <ShopDetailsPageCards summary={summary} />
          </div>

          {/* Filter boxs */}
          <ShopStatusFilter />

          {/* Tabs */}
          <ShopDetailsTab shopId={shopId} />
        </div>
      </SlideUpAnimation>
    </Container>
  );
};

export default ShopDetailsPage;
