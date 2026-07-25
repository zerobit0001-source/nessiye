"use client";

import { formatPrice } from "@/utils/formatters";
import {
  Inventory2Outlined,
  LocalOfferOutlined,
  ShoppingCartOutlined,
  TrendingUpOutlined,
  SellOutlined,
} from "@mui/icons-material";

import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

const stats = [
  {
    id: "inventory",
    title: "موجودی انبار",
    value: 2,
    unit: "عدد",
    subtitle: "آستانه هشدار: 5 عدد",
    icon: Inventory2Outlined,
    iconBg: "#FFF6E5",
    iconColor: "#D97706",
    valueColor: "#B45309",
    borderColor: "#F6C453",
  },
  {
    id: "sale-price",
    title: "قیمت فروش",
    value: 110000,
    unit: "تومان",
    subtitle: "قیمت درج شده روی کالا",
    icon: LocalOfferOutlined,
    iconBg: "#EEF4FF",
    iconColor: "#2563EB",
  },
  {
    id: "buy-price",
    title: "قیمت خرید (میانگین)",
    value: 92000,
    unit: "تومان",
    subtitle: "از آخرین خرید غنچه",
    icon: ShoppingCartOutlined,
    iconBg: "#F4F4F5",
    iconColor: "#71717A",
  },
  {
    id: "profit",
    title: "سود تخمینی هر واحد",
    value: 18000,
    unit: "تومان",
    subtitle: "حاشیه سود: 16.2%",
    icon: TrendingUpOutlined,
    iconBg: "#ECFDF5",
    iconColor: "#059669",
    valueColor: "#059669",
  },
  {
    id: "sales",
    title: "فروش کل (ماه جاری)",
    value: 48,
    unit: "عدد",
    subtitle: "ارزش کل: 8,850,000 تومان",
    icon: SellOutlined,
    iconBg: "#F5F3FF",
    iconColor: "#7C3AED",
  },
];

export default function ProductDetailsPageStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <Card
            elevation={0}
            sx={{
              height: "100%",
              border: "1px solid",
              borderColor: item.borderColor || "divider",
              borderRadius: 4,
            }}
          >
            <CardContent
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 3,
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="body2" color="text.secondary">
                  {item.title}
                </Typography>

                <Avatar
                  sx={{
                    bgcolor: item.iconBg,
                    color: item.iconColor,
                    width: 42,
                    height: 42,
                  }}
                >
                  <Icon fontSize="small" />
                </Avatar>
              </Stack>

              <Stack spacing={0.5}>
                <Stack direction="row" spacing={0.5} alignItems="baseline">
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    color={item.valueColor || "text.primary"}
                  >
                    {formatPrice(item.value)}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {item.unit}
                  </Typography>
                </Stack>

                <Typography variant="body2" color="text.secondary">
                  {item.subtitle}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
