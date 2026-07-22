import { ShopType } from "@/types/types";
import { formatDate, formatPrice } from "@/utils/formatters";
import {
  ChevronLeftRounded,
  LocationOnRounded,
  StorefrontRounded,
} from "@mui/icons-material";
import { Button, Card, LinearProgress, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

interface AccountPageShopCardProps {
  shopData: ShopType;
}

export default function AccountPageShopCard({
  shopData,
}: AccountPageShopCardProps) {
  return (
    <Card
      elevation={1}
      className="flex flex-col p-6 gap-6 rounded-xl! border transition-all! border-gray-200 hover:border-blue-400 "
    >
      <div className="flex items-center gap-2">
        <StorefrontRounded color="primary" />
        <span>
          <Typography variant="subtitle1" className="font-bold!">
            {shopData.shop_name}
          </Typography>
          <Typography variant="caption">
            <LocationOnRounded color="disabled" fontSize="small" />
            {shopData.shop_address}
          </Typography>
        </span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 items-center justify-between gap-2 bg-gray-100/50 py-4 px-6 rounded-full ">
        <div className="text-center">
          <Typography variant="caption">بدهی باقیمانده</Typography>
          <Typography variant="subtitle1" color="error" className="font-bold!">
            {formatPrice(shopData.total_remaining)} تومان
          </Typography>
        </div>
        <div className="text-center">
          <Typography variant="caption">کل پرداختی</Typography>
          <Typography
            variant="subtitle1"
            color="success"
            className="font-bold!"
          >
            {formatPrice(shopData.total_paid)} تومان
          </Typography>
        </div>
        <div className="text-center">
          <Typography variant="caption">بدهی‌های باز</Typography>
          <Typography variant="subtitle1" className="font-bold!">
            {shopData.open_debts_count} فقره
          </Typography>
        </div>
        <div className="text-center">
          <Typography variant="caption">آخرین خرید</Typography>
          <Typography variant="subtitle1" className="font-bold!">
            {formatDate(shopData.last_purchase, { dateStyle: "full" })}
          </Typography>
        </div>
      </div>
      <div>
        <span className="w-full flex items-center justify-between">
          <Typography variant="caption">میزان تسویه حساب</Typography>
          <Typography variant="subtitle1" className="font-bold!">
            {shopData.settlement_percentage}%
          </Typography>
        </span>
        <LinearProgress
          variant="determinate"
          value={shopData.settlement_percentage}
          sx={{ height: 10, borderRadius: 999 }}
        />
      </div>
      <Link href={`account/${shopData.shop_id}`} className="self-end">
        <Button
          variant="contained"
          className="rounded-lg!"
          endIcon={<ChevronLeftRounded />}
        >
          ورود به فروشگاه
        </Button>
      </Link>
    </Card>
  );
}
