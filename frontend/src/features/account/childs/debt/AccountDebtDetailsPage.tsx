"use client";

import Container from "@/components/dash/Container";
import SlideUpAnimation from "@/components/SlideUpAnimation";
import { useGetDebtByIdQuery } from "@/features/dashboard/childs/sales/api/ApiSales";
import {
  ChevronRightRounded,
  HistoryRounded,
  LocalMall,
} from "@mui/icons-material";
import { Card, Chip, Divider, Typography } from "@mui/material";
import { useGetShopDebtDetailsQuery } from "../../api/ApiAccount";
import { formatDate } from "@/utils/formatters";
import Link from "next/link";

export default function AccountDebtDetailsPage({
  debtId,
  shopId,
}: {
  debtId: string;
  shopId: number;
}) {
  const id = debtId;
  const { data, isLoading, error, isSuccess } = useGetShopDebtDetailsQuery({
    shopId,
    debtId,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!isSuccess) return <div>No data</div>;

  const debt = isSuccess ? data?.debt : null;

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
              <Typography variant="h6" className="font-bold!">
                جزئیات سند بدهی #{debt?.debt_id}
              </Typography>
              <Chip
                label={debt?.is_paid ? "پرداخت شده" : "در انتظار پرداخت"}
                color={debt?.is_paid ? "success" : "warning"}
              />
            </div>
            <div className="w-full flex items-center justify-between">
              <Typography variant="caption">تاریخ ثبت:</Typography>
              <Typography variant="subtitle1" className="font-bold!">
                {formatDate(debt?.created_at)}
              </Typography>
            </div>
            {/*<div className="w-full flex items-center justify-between">
              <Typography variant="caption">فروشگاه:</Typography>
              <Typography variant="subtitle1" className="font-bold!">
                سوپرمارکت آنلاین کوروش (شعبه سعادت‌آباد)
              </Typography>
            </div>*/}
          </Card>

          {/* Products */}

          <Card
            elevation={1}
            className="rounded-xl! p-6 border border-gray-200 flex flex-col gap-4"
          >
            <div className="w-full flex items-center justify-between">
              <Typography variant="h6" className="font-bold!">
                <LocalMall color="primary" /> اقلام شامل این سند بدهی
              </Typography>
            </div>
            <Divider />
            <div className="w-full flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <Typography variant="subtitle1" className="font-bold!">
                  روغن سرخ‌کردنی بهار (۲ لیتری)
                </Typography>
                <Typography variant="caption">۲ عدد × ۱۴۵,۰۰۰ تومان</Typography>
              </div>
              <Typography variant="subtitle1" className="font-bold!">
                ۲۹۰,۰۰۰ تومان{" "}
              </Typography>
            </div>
            <div className="w-full flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <Typography variant="subtitle1" className="font-bold!">
                  روغن سرخ‌کردنی بهار (۲ لیتری)
                </Typography>
                <Typography variant="caption">۲ عدد × ۱۴۵,۰۰۰ تومان</Typography>
              </div>
              <Typography variant="subtitle1" className="font-bold!">
                ۲۹۰,۰۰۰ تومان{" "}
              </Typography>
            </div>
            <div className="w-full flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <Typography variant="subtitle1" className="font-bold!">
                  روغن سرخ‌کردنی بهار (۲ لیتری)
                </Typography>
                <Typography variant="caption">۲ عدد × ۱۴۵,۰۰۰ تومان</Typography>
              </div>
              <Typography variant="subtitle1" className="font-bold!">
                ۲۹۰,۰۰۰ تومان{" "}
              </Typography>
            </div>
          </Card>

          {/* Payment history */}

          <Card
            elevation={1}
            className="rounded-xl! p-6 border border-gray-200 flex flex-col gap-4"
          >
            <div className="w-full flex items-center justify-between">
              <Typography variant="h6" className="font-bold!">
                <HistoryRounded color="primary" /> تاریخچه پرداختی‌های این بدهی
              </Typography>
            </div>
            <Divider />
            <div className=" flex flex-col gap-2">
              {debt?.payments?.map((payment) => (
                <div
                  className="w-full flex items-center justify-between bg-gray-100/50 py-2 px-4 rounded-full"
                  key={payment.id}
                >
                  <div className="flex flex-col gap-2">
                    <Typography variant="caption" className="font-bold!">
                      پرداخت حضوری (کارت‌خوان)
                    </Typography>
                    <Typography variant="caption">
                      تاریخ: {formatDate(payment.created_at)}
                    </Typography>
                  </div>
                  <Typography
                    variant="subtitle1"
                    className="font-bold!"
                    color="success"
                  >
                    {payment.amount} تومان
                  </Typography>
                </div>
              ))}
            </div>
          </Card>

          {/* summery */}
          <Card
            elevation={1}
            className="rounded-xl! p-6 border border-red-300 bg-red-100/50! flex flex-col gap-4"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <Typography variant="caption">مبلغ کل بدهی:</Typography>
                <Typography variant="subtitle1" className="font-bold!">
                  {debt?.total_amount} تومان
                </Typography>
              </div>
              <div className="flex items-center justify-between">
                <Typography variant="caption">مبلغ پرداخت‌شده:</Typography>
                <Typography
                  variant="subtitle1"
                  className="font-bold!"
                  color="success"
                >
                  {debt?.paid_amount} تومان
                </Typography>
              </div>
              <Divider />

              <div className="flex items-center justify-between">
                <Typography
                  variant="subtitle1"
                  className="font-bold!"
                  color="error"
                >
                  بدهی باقیمانده:
                </Typography>
                <Typography variant="h6" className="font-bold!" color="error">
                  {debt?.remaining} تومان
                </Typography>
              </div>
            </div>
          </Card>
        </div>
      </SlideUpAnimation>
    </Container>
  );
}
