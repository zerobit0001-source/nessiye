"use client";

import Container from "@/components/dash/Container";
import SlideUpAnimation from "@/components/SlideUpAnimation";
import {
  ChevronRightRounded,
  HistoryRounded,
  LocalMall,
  LocationOnRounded,
} from "@mui/icons-material";
import { Card, Chip, Divider, Typography } from "@mui/material";
import Link from "next/link";
import { useGetShopSaleDetailsQuery } from "../../api/ApiAccount";
import { formatPrice } from "@/utils/formatters";

export default function AccountSaleDetailsPage({
  shopId,
  saleId,
}: {
  shopId: number;
  saleId: number;
}) {
  const { data, isLoading, error, isSuccess } = useGetShopSaleDetailsQuery({
    shopId,
    saleId,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!isSuccess) return <div>No data</div>;

  const sale = isSuccess ? data?.sale : null;

  console.log(data);
  return (
    <Container>
      <SlideUpAnimation>
        <div className="max-w-4xl m-auto p-4 md:p-0 flex flex-col gap-5 mt-5">
          <Link
            href={`/account/${shopId}`}
            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-primary transition-colors"
          >
            <ChevronRightRounded fontSize="small" />
            بازگشت
          </Link>

          {/* Header */}

          <Card
            elevation={1}
            className="rounded-xl! p-6 border border-gray-200 flex flex-col gap-4"
          >
            <div className="w-full flex items-center justify-between">
              <div className="flex flex-col">
                <Typography variant="h6" className="font-bold!">
                  فاکتور خرید #{sale?.id}
                </Typography>
                <Typography variant="caption">تاریخ ثبت: ۱۴۰۳/۰۲/۱۵</Typography>
              </div>
              <Chip label="پرداخت شده" color="success" />
            </div>
          </Card>

          {/* Products */}

          <Card
            elevation={1}
            className="rounded-xl! p-6 border border-gray-200 flex flex-col gap-4"
          >
            <div className="w-full flex items-center justify-between">
              <Typography variant="h6" className="font-bold!">
                <LocalMall color="primary" /> کالاهای خریده‌شده
              </Typography>
            </div>
            <Divider />
            {sale?.items.map((item, index) => (
              <div
                className="w-full flex items-center justify-between"
                key={index}
              >
                <div className="flex flex-col gap-2">
                  <Typography variant="subtitle1" className="font-bold!">
                    {item.product_name}
                  </Typography>
                  <Typography variant="caption">
                    {formatPrice(item.quantity)} عدد × {formatPrice(item.price)}{" "}
                    تومان
                  </Typography>
                </div>
                <Typography variant="subtitle1" className="font-bold!">
                  {formatPrice(item.quantity * item.price)} تومان
                </Typography>
              </div>
            ))}
          </Card>

          {/* summery */}
          <Card
            elevation={1}
            className="rounded-xl! p-6 border border-gray-200 flex flex-col gap-4"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <Typography variant="subtitle1" className="font-bold!">
                  جمع کل:
                </Typography>
                <Typography variant="h6" className="font-bold!" color="primary">
                  {formatPrice(sale?.total)} تومان
                </Typography>
              </div>
            </div>
          </Card>
        </div>
      </SlideUpAnimation>
    </Container>
  );
}
