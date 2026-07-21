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

const ShopDetailsPage = ({
  id,
  status,
}: {
  id: string;
  status?: "active" | "settled" | "overdue";
}) => {
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
              سوپرمارکت آنلاین کوروش (شعبه سعادت‌آباد)
            </Typography>
            <Typography variant="caption">
              <LocationOnRounded color="disabled" fontSize="small" /> تهران،
              سعادت‌آباد، بلوار پاکنژاد، پلاک ۱۲
            </Typography>
          </Card>

          {/* Customer Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Card
              elevation={1}
              className="border border-red-300 bg-red-200/30! flex flex-col gap-2 rounded-xl! p-4 "
            >
              <span>
                <Typography variant="caption">کل بدهی باقیمانده</Typography>
                <Typography
                  variant="subtitle1"
                  className="font-bold!"
                  color="error"
                >
                  4,850,000 تومان
                </Typography>
              </span>
            </Card>
            <Card
              elevation={1}
              className="border border-green-300 bg-green-200/30! flex flex-col gap-2 rounded-xl! p-4 "
            >
              <span>
                <Typography variant="caption">کل مبلغ پرداختی</Typography>
                <Typography
                  variant="subtitle1"
                  className="font-bold!"
                  color="success"
                >
                  12,400,000 تومان
                </Typography>
              </span>
            </Card>
            <Card
              elevation={1}
              className="flex flex-col gap-2 rounded-xl! p-4 col-span-full md:col-span-1 border border-gray-200 "
            >
              <span>
                <Typography variant="caption">مجموع کل خریدها</Typography>
                <Typography
                  variant="subtitle1"
                  className="font-bold!"
                  color="primary"
                >
                  11,700,000 تومان
                </Typography>
              </span>
            </Card>
          </div>

          {/* Filter boxs */}
          <ShopStatusFilter />

          {/* Tabs */}
          <ShopDetailsTab />

          
          
        </div>
      </SlideUpAnimation>
    </Container>
  );
};

export default ShopDetailsPage;
