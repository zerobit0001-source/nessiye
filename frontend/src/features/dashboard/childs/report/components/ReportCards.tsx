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
import { ReportCardsType } from "@/types/types";
import { formatPrice } from "@/utils/formatters";

export const REPORT_CARDS_CONFIG = {
  total_sales: {
    title: "کل فروش کل دوره",
    value: "۴۲,۸۵۰,۰۰۰",
    unit: "تومان",
    subtitle: "۱۲.۵٪ افزایش نسبت به ماه قبل",
    subtitleColor: "success.main",
    icon: ShoppingCartRounded,
    iconBg: "#E8F4FD",
    iconColor: "#0288D1",
  },
  total_debt_registered: {
    title: "مجموع تسویه‌جات ثبت‌شده",
    value: "۴۸,۲۰۰,۰۰۰",
    unit: "تومان",
    subtitle: "۸.۳٪ افزایش ثبت تسویه",
    subtitleColor: "error.main",
    icon: ReceiptLongRounded,
    iconBg: "#FDECEC",
    iconColor: "#E53935",
  },
  total_collected: {
    title: "مطالبات وصول‌شده",
    value: "۳۱,۴۵۰,۰۰۰",
    unit: "تومان",
    subtitle: "۶۵٪ نرخ وصول بدهی‌ها",
    subtitleColor: "success.main",
    icon: PaidRounded,
    iconBg: "#E8F8F1",
    iconColor: "#00A76F",
  },
  remaining_debt: {
    title: "باقی‌مانده طلب بازار",
    value: "۱۶,۷۵۰,۰۰۰",
    unit: "تومان",
    subtitle: "در انتظار تسویه مشتریان",
    subtitleColor: "text.secondary",
    icon: SavingsRounded,
    iconBg: "#FFF4E5",
    iconColor: "#EF6C00",
  },
  avg_per_invoice: {
    title: "میانگین هر فاکتور",
    value: "۱۲۷,۰۰۰",
    unit: "تومان",
    subtitle: "سرانه خریدهای جاری",
    subtitleColor: "text.secondary",
    icon: CalculateRounded,
    iconBg: "#F3E8FF",
    iconColor: "#7C3AED",
  },
  open_debts: {
    title: "دفترچه‌های بدهی فعال",
    value: "۴۲",
    unit: "حساب باز",
    subtitle: "۷ حساب نیازمند پیگیری فوری",
    subtitleColor: "error.main",
    icon: MenuBookRounded,
    iconBg: "#FDECEC",
    iconColor: "#D32F2F",
  },
  total_invoices: {
    title: "تعداد تراکنش فروش",
    value: "۱,۱۲۴",
    unit: "فاکتور",
    subtitle: "۵.۴٪ نسبت به هفته قبل",
    subtitleColor: "success.main",
    icon: AccountBalanceWalletRounded,
    iconBg: "#E8F4FD",
    iconColor: "#0288D1",
  },
  total_customers: {
    title: "تعداد کل مشتریان",
    value: "۲۴۸",
    unit: "نفر",
    subtitle: "۱۸ مشتری جدید این ماه",
    subtitleColor: "text.secondary",
    icon: GroupsRounded,
    iconBg: "#F3E8FF",
    iconColor: "#7C3AED",
  },
};

type SummaryKey = keyof typeof REPORT_CARDS_CONFIG;

export default function ReportCards({
  cards,
  isLoading,
}: {
  cards: ReportCardsType;
  isLoading: boolean;
}) {
  return (
    <Grid container spacing={2}>
      {Object.entries(REPORT_CARDS_CONFIG).map(([key, config]) => {
        const Icon = config.icon;

        return (
          <Grid key={config.title} size={{ xs: 12, sm: 6, lg: 3 }}>
            <Card
              elevation={3}
              sx={{
                border: "1px solid",
                borderColor: "divider",
              }}
              className="rounded-lg!"
            >
              <CardContent>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                >
                  <Stack spacing={0.5} alignItems="flex-start">
                    <Typography variant="body2" color="text.secondary">
                      {config.title}
                    </Typography>

                    <Stack direction="row" spacing={0.5} alignItems="baseline">
                      <Typography variant="h6" className="font-bold!">
                        {formatPrice(cards[key as SummaryKey])}
                      </Typography>

                      <Typography variant="caption" color="text.secondary">
                        {config.unit}
                      </Typography>
                    </Stack>

                    <Typography
                      variant="caption"
                      sx={{ color: config.subtitleColor }}
                    >
                      {config.subtitle}
                    </Typography>
                  </Stack>
                  <Avatar
                    sx={{
                      bgcolor: config.iconBg,
                      color: config.iconColor,
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
