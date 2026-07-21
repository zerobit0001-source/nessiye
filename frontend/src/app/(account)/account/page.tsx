"use client";
import Container from "@/components/dash/Container";
import SlideUpAnimation from "@/components/SlideUpAnimation";
import { useGetMeQuery } from "@/features/account/api/ApiAccount";
import ShopsCard from "@/features/account/components/ShopsCard";
import { useAppSelector } from "@/lib/redux/hooks";
import ToggleThemeBtn from "@/theme/ToggleThemeBtn";
import {
  AccountBalanceWallet,
  CheckCircleOutlineRounded,
  ChevronLeftRounded,
  ChevronRightRounded,
  LocationOnRounded,
  LogoutRounded,
  ReceiptLongRounded,
  ReceiptRounded,
  StorefrontRounded,
  StoreRounded,
  WalletRounded,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  IconButton,
  LinearProgress,
  Typography,
} from "@mui/material";
import Link from "next/link";

const page = () => {
  const user = useAppSelector((s) => s.userInfo);
  const { data, isLoading, error, isSuccess } = useGetMeQuery();

  if (isLoading) {
    return <CircularProgress />;
  }
  if (error) {
    return <p>something went wrong</p>;
  }

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
                <LogoutRounded />
              </IconButton>
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <Card
              elevation={1}
              className="border border-red-300 bg-red-200/30! flex flex-col gap-2 rounded-xl! p-4 "
            >
              <AccountBalanceWallet color="error" />
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
              <CheckCircleOutlineRounded color="success" />
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
              className="flex flex-col gap-2 rounded-xl! p-4 "
            >
              <StorefrontRounded color="primary" />
              <span>
                <Typography variant="caption">تعداد فروشگاه‌ها</Typography>
                <Typography
                  variant="subtitle1"
                  className="font-bold!"
                  color="primary"
                >
                  2
                </Typography>
              </span>
            </Card>
            <Card
              elevation={1}
              className="flex flex-col gap-2 rounded-xl! p-4 md:col-span-full lg:col-span-1"
            >
              <ReceiptLongRounded color="warning" />
              <span>
                <Typography variant="caption">بدهی‌های باز</Typography>
                <Typography
                  variant="subtitle1"
                  className="font-bold!"
                  color="warning"
                >
                  5 فقره
                </Typography>
              </span>
            </Card>
          </div>

          <Typography variant="h6" className="font-bold! mt-5!">
            فروشگاه‌های طرف حساب
          </Typography>

          <div className="flex flex-col gap-6">
            <Card
              elevation={1}
              className="flex flex-col p-6 gap-6 rounded-xl! border transition-all! border-gray-200 hover:border-blue-400 "
            >
              <div className="flex items-center gap-2">
                <StorefrontRounded color="primary" />
                <span>
                  <Typography variant="subtitle1" className="font-bold!">
                    سوپرمارکت آنلاین کوروش (شعبه سعادت‌آباد)
                  </Typography>
                  <Typography variant="caption">
                    <LocationOnRounded color="disabled" fontSize="small" />
                    تهران، سعادت‌آباد، بلوار پاکنژاد، پلاک ۱۲
                  </Typography>
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 items-center justify-between gap-2 bg-gray-100/50 py-4 px-6 rounded-full ">
                <div className="text-center">
                  <Typography variant="caption">بدهی باقیمانده</Typography>
                  <Typography
                    variant="subtitle1"
                    color="error"
                    className="font-bold!"
                  >
                    3,200,000 تومان
                  </Typography>
                </div>
                <div className="text-center">
                  <Typography variant="caption">کل پرداختی</Typography>
                  <Typography
                    variant="subtitle1"
                    color="success"
                    className="font-bold!"
                  >
                    8,500,000 تومان
                  </Typography>
                </div>
                <div className="text-center">
                  <Typography variant="caption">بدهی‌های باز</Typography>
                  <Typography variant="subtitle1" className="font-bold!">
                    3 فقره
                  </Typography>
                </div>
                <div className="text-center">
                  <Typography variant="caption">آخرین خرید</Typography>
                  <Typography variant="subtitle1" className="font-bold!">
                    ۱۴۰۳/۰۲/۱۵
                  </Typography>
                </div>
              </div>
              <div>
                <span className="w-full flex items-center justify-between">
                  <Typography variant="caption">میزان تسویه حساب</Typography>
                  <Typography variant="subtitle1" className="font-bold!">
                    62%
                  </Typography>
                </span>
                <LinearProgress
                  variant="determinate"
                  value={62}
                  sx={{ height: 10, borderRadius: 999 }}
                />
              </div>
              <Link href={"account/1"} className="self-end">
                <Button
                  variant="contained"
                  className="rounded-lg!"
                  endIcon={<ChevronLeftRounded />}
                >
                  ورود به فروشگاه
                </Button>
              </Link>
            </Card>
            <Card
              elevation={2}
              className="flex flex-col p-6 gap-6 rounded-xl! border transition-all! border-gray-300 hover:border-blue-400 "
            >
              <div className="flex items-center gap-2">
                <StorefrontRounded color="primary" />
                <span>
                  <Typography variant="subtitle1" className="font-bold!">
                    سوپرمارکت آنلاین کوروش (شعبه سعادت‌آباد)
                  </Typography>
                  <Typography variant="caption">
                    <LocationOnRounded color="disabled" fontSize="small" />
                    تهران، سعادت‌آباد، بلوار پاکنژاد، پلاک ۱۲
                  </Typography>
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div>
                  <Typography variant="caption">بدهی باقیمانده</Typography>
                  <Typography
                    variant="subtitle1"
                    color="error"
                    className="font-bold!"
                  >
                    3,200,000 تومان
                  </Typography>
                </div>
                <div>
                  <Typography variant="caption">کل پرداختی</Typography>
                  <Typography
                    variant="subtitle1"
                    color="success"
                    className="font-bold!"
                  >
                    8,500,000 تومان
                  </Typography>
                </div>
                <div>
                  <Typography variant="caption">بدهی‌های باز</Typography>
                  <Typography variant="subtitle1" className="font-bold!">
                    3 فقره
                  </Typography>
                </div>
                <div>
                  <Typography variant="caption">آخرین خرید</Typography>
                  <Typography variant="subtitle1" className="font-bold!">
                    ۱۴۰۳/۰۲/۱۵
                  </Typography>
                </div>
              </div>
              <div>
                <span className="w-full flex items-center justify-between">
                  <Typography variant="caption">میزان تسویه حساب</Typography>
                  <Typography variant="subtitle1" className="font-bold!">
                    62%
                  </Typography>
                </span>
                <LinearProgress variant="determinate" value={62} />
              </div>
              <Button variant="contained">ورود به فروشگاه</Button>
            </Card>
            <Card
              elevation={2}
              className="flex flex-col p-6 gap-6 rounded-xl! border transition-all! border-gray-300 hover:border-blue-400 "
            >
              <div className="flex items-center gap-2">
                <StorefrontRounded color="primary" />
                <span>
                  <Typography variant="subtitle1" className="font-bold!">
                    سوپرمارکت آنلاین کوروش (شعبه سعادت‌آباد)
                  </Typography>
                  <Typography variant="caption">
                    <LocationOnRounded color="disabled" fontSize="small" />
                    تهران، سعادت‌آباد، بلوار پاکنژاد، پلاک ۱۲
                  </Typography>
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div>
                  <Typography variant="caption">بدهی باقیمانده</Typography>
                  <Typography
                    variant="subtitle1"
                    color="error"
                    className="font-bold!"
                  >
                    3,200,000 تومان
                  </Typography>
                </div>
                <div>
                  <Typography variant="caption">کل پرداختی</Typography>
                  <Typography
                    variant="subtitle1"
                    color="success"
                    className="font-bold!"
                  >
                    8,500,000 تومان
                  </Typography>
                </div>
                <div>
                  <Typography variant="caption">بدهی‌های باز</Typography>
                  <Typography variant="subtitle1" className="font-bold!">
                    3 فقره
                  </Typography>
                </div>
                <div>
                  <Typography variant="caption">آخرین خرید</Typography>
                  <Typography variant="subtitle1" className="font-bold!">
                    ۱۴۰۳/۰۲/۱۵
                  </Typography>
                </div>
              </div>
              <div>
                <span className="w-full flex items-center justify-between">
                  <Typography variant="caption">میزان تسویه حساب</Typography>
                  <Typography variant="subtitle1" className="font-bold!">
                    62%
                  </Typography>
                </span>
                <LinearProgress variant="determinate" value={62} />
              </div>
              <Button variant="contained">ورود به فروشگاه</Button>
            </Card>
          </div>
        </div>
      </SlideUpAnimation>
    </Container>
  );
};

export default page;
