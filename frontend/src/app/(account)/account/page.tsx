"use client";
import Container from "@/components/dash/Container";
import SlideUpAnimation from "@/components/SlideUpAnimation";
import { useGetMeQuery } from "@/features/account/api/ApiAccount";
import AccountPageCards from "@/features/account/components/AccountPageCards";
import AccountPageShopCard from "@/features/account/components/AccountPageShopCard";
import AccountPageSkeleton from "@/features/account/components/AccountPageSkeleton";
import LogoutBtn from "@/features/account/components/LogoutBtn";
import ShopsCard from "@/features/account/components/ShopsCard";
import { useAppSelector } from "@/lib/redux/hooks";
import ToggleThemeBtn from "@/theme/ToggleThemeBtn";
import {
  AccountBalanceWallet,
  CheckCircleOutlineRounded,
  ChevronLeftRounded,
  LocationOnRounded,
  ReceiptLongRounded,
  StorefrontRounded,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  IconButton,
  LinearProgress,
  Modal,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";

const page = () => {
  const user = useAppSelector((s) => s.userInfo);

  const { data, isLoading, error, isSuccess } = useGetMeQuery();

  if (isLoading) {
    return <AccountPageSkeleton />;
  }
  if (error) {
    return <p>something went wrong</p>;
  }

  const summary = isSuccess
    ? data.summary
    : {
        total_paid: 0,
        total_remaining: 0,
        open_debts_count: 0,
        number_of_shops: 0,
      };
  const my_shops = isSuccess ? data.shops : [];

  console.log(data);

  return (
    <Container>
      <SlideUpAnimation>
        <div className="max-w-4xl m-auto p-4 md:p-0 flex flex-col gap-5 mt-5">
          <div className="flex justify-between items-center">
            <span>
              <Typography variant="h5" className="font-bold!">
                سلام ، {user?.full_name} 👋
              </Typography>
              <Typography variant="caption">
                خلاصه وضعیت حساب و بدهی‌های شما در پورتال نسیه
              </Typography>
            </span>
            <span>
              <ToggleThemeBtn />
              <IconButton>
                <LogoutBtn />
              </IconButton>
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <AccountPageCards summary={summary} />
          </div>

          <Typography variant="h6" className="font-bold! mt-5!">
            فروشگاه‌های طرف حساب
          </Typography>

          <div className="flex flex-col gap-6">
            {my_shops.map((shop) => (
              <AccountPageShopCard key={shop.shop_id} shopData={shop} />
            ))}
          </div>
        </div>
      </SlideUpAnimation>
    </Container>
  );
};

export default page;
