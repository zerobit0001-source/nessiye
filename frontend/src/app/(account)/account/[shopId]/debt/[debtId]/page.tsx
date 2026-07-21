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

export default function AccountDebtDetailsPage() {
  return (
    <Container>
      <SlideUpAnimation>
        <div className="max-w-4xl m-auto p-4 md:p-0 flex flex-col gap-5 mt-5">
          <Link
            href="/account"
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
                جزئیات سند بدهی #DB-8842
              </Typography>
              <Chip label="پرداخت شده" color="success" />
            </div>
            <div className="w-full flex items-center justify-between">
              <Typography variant="caption">تاریخ ثبت:</Typography>
              <Typography variant="subtitle1" className="font-bold!">
                ۱۴۰۳/۰۲/۱۵
              </Typography>
            </div>
            <div className="w-full flex items-center justify-between">
              <Typography variant="caption">فروشگاه:</Typography>
              <Typography variant="subtitle1" className="font-bold!">
                سوپرمارکت آنلاین کوروش (شعبه سعادت‌آباد)
              </Typography>
            </div>
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
              <div className="w-full flex items-center justify-between bg-gray-100/50 py-2 px-4 rounded-full">
                <div className="flex flex-col gap-2">
                  <Typography variant="caption" className="font-bold!">
                    پرداخت حضوری (کارت‌خوان)
                  </Typography>
                  <Typography variant="caption">تاریخ: ۱۴۰۳/۰۲/۱۸</Typography>
                </div>
                <Typography
                  variant="subtitle1"
                  className="font-bold!"
                  color="success"
                >
                  500,000 تومان
                </Typography>
              </div>
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
                  2,000,000 تومان
                </Typography>
              </div>
              <div className="flex items-center justify-between">
                <Typography variant="caption">مبلغ پرداخت‌شده:</Typography>
                <Typography
                  variant="subtitle1"
                  className="font-bold!"
                  color="success"
                >
                  500,000 تومان
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
                  1,500,000 تومان
                </Typography>
              </div>
            </div>
          </Card>
        </div>
      </SlideUpAnimation>
    </Container>
  );
}
