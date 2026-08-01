"use client";

import {
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
  Avatar,
} from "@mui/material";
import {
  ShoppingCartRounded,
  GroupsRounded,
  ReceiptLongRounded,
  MenuBookRounded,
  CalculateRounded,
  SavingsRounded,
  AccountBalanceWalletRounded,
  PaidRounded,
} from "@mui/icons-material";

export const reportCards = [
  {
    title: "کل فروش کل دوره",
    value: "۴۲,۸۵۰,۰۰۰",
    unit: "تومان",
    subtitle: "۱۲.۵٪ افزایش نسبت به ماه قبل",
    subtitleColor: "success.main",
    icon: ShoppingCartRounded,
    iconBg: "#E8F4FD",
    iconColor: "#0288D1",
  },
  {
    title: "مجموع تسویه‌جات ثبت‌شده",
    value: "۴۸,۲۰۰,۰۰۰",
    unit: "تومان",
    subtitle: "۸.۳٪ افزایش ثبت تسویه",
    subtitleColor: "error.main",
    icon: ReceiptLongRounded,
    iconBg: "#FDECEC",
    iconColor: "#E53935",
  },
  {
    title: "مطالبات وصول‌شده",
    value: "۳۱,۴۵۰,۰۰۰",
    unit: "تومان",
    subtitle: "۶۵٪ نرخ وصول بدهی‌ها",
    subtitleColor: "success.main",
    icon: PaidRounded,
    iconBg: "#E8F8F1",
    iconColor: "#00A76F",
  },
  {
    title: "باقی‌مانده طلب بازار",
    value: "۱۶,۷۵۰,۰۰۰",
    unit: "تومان",
    subtitle: "در انتظار تسویه مشتریان",
    subtitleColor: "text.secondary",
    icon: SavingsRounded,
    iconBg: "#FFF4E5",
    iconColor: "#EF6C00",
  },
  {
    title: "میانگین هر فاکتور",
    value: "۱۲۷,۰۰۰",
    unit: "تومان",
    subtitle: "سرانه خریدهای جاری",
    subtitleColor: "text.secondary",
    icon: CalculateRounded,
    iconBg: "#F3E8FF",
    iconColor: "#7C3AED",
  },
  {
    title: "دفترچه‌های بدهی فعال",
    value: "۴۲",
    unit: "حساب باز",
    subtitle: "۷ حساب نیازمند پیگیری فوری",
    subtitleColor: "error.main",
    icon: MenuBookRounded,
    iconBg: "#FDECEC",
    iconColor: "#D32F2F",
  },
  {
    title: "تعداد تراکنش فروش",
    value: "۱,۱۲۴",
    unit: "فاکتور",
    subtitle: "۵.۴٪ نسبت به هفته قبل",
    subtitleColor: "success.main",
    icon: AccountBalanceWalletRounded,
    iconBg: "#E8F4FD",
    iconColor: "#0288D1",
  },
  {
    title: "تعداد کل مشتریان",
    value: "۲۴۸",
    unit: "نفر",
    subtitle: "۱۸ مشتری جدید این ماه",
    subtitleColor: "text.secondary",
    icon: GroupsRounded,
    iconBg: "#F3E8FF",
    iconColor: "#7C3AED",
  },
];
export default function ReportCards() {
  return (
    <Grid container spacing={2}>
      {reportCards.map((card) => {
        const Icon = card.icon;

        return (
          <Grid key={card.title} size={{ xs: 12, sm: 6, lg: 3 }}>
            <Card
              elevation={0}
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 4,
              }}
            >
              <CardContent>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                >
                  <Stack spacing={0.5} alignItems="flex-start">
                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {card.title}
                    </Typography>

                    <Stack direction="row" spacing={0.5} alignItems="baseline">
                      <Typography variant="h6" className="font-bold!">
                        {card.value}
                      </Typography>

                      <Typography variant="caption" color="text.secondary">
                        {card.unit}
                      </Typography>
                    </Stack>

                    <Typography
                      variant="caption"
                      sx={{ color: card.subtitleColor }}
                    >
                      {card.subtitle}
                    </Typography>
                  </Stack>
                  <Avatar
                    sx={{
                      bgcolor: card.iconBg,
                      color: card.iconColor,
                      width: 42,
                      height: 42,
                    }}
                  >
                    <Icon fontSize="small" />
                  </Avatar>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
