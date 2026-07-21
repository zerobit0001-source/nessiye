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

export default function AccountSaleDetailsPage() {
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
              <div className="flex flex-col">
                <Typography variant="h6" className="font-bold!">
                  فاکتور خرید #INV-1042
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
