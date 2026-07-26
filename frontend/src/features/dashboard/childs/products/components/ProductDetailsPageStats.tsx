"use client";

import { ProductType } from "@/types/types";
import { formatDate, formatPrice } from "@/utils/formatters";
import {
  Inventory2Rounded,
  LocalOfferRounded,
  ShoppingCartRounded,
  TrendingUpRounded,
  SellRounded,
} from "@mui/icons-material";

import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

export const PRODUCT_STATS_CONFIG = {
  stock: {
    title: "موجودی انبار",
    icon: Inventory2Rounded,
    iconBg: "#FFF6E5",
    iconColor: "#D97706",
    valueColor: "#B45309",
    borderColor: "#F6C453",
    unit: "عدد",
  },

  sell_price: {
    title: "قیمت فروش",
    icon: LocalOfferRounded,
    iconBg: "#EEF4FF",
    iconColor: "#2563EB",
    unit: "تومان",
  },

  buy_price: {
    title: "قیمت خرید",
    icon: ShoppingCartRounded,
    iconBg: "#F4F4F5",
    iconColor: "#71717A",
    unit: "تومان",
  },

  profit: {
    title: "سود هر واحد",
    icon: TrendingUpRounded,
    iconBg: "#ECFDF5",
    iconColor: "#059669",
    valueColor: "#059669",
    unit: "تومان",
  },

  created_at: {
    title: "ثبت محصول",
    icon: SellRounded,
    iconBg: "#F5F3FF",
    iconColor: "#7C3AED",
    unit: "",
  },
} as const;

export default function ProductDetailsPageStats({
  product,
}: {
  product: ProductType;
}) {
  const statsData = {
    stock: product.stock,

    sell_price: product.sell_price,

    buy_price: product.buy_price,

    profit: product.sell_price - product.buy_price,

    created_at: formatDate(product.created_at),
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {Object.entries(PRODUCT_STATS_CONFIG).map(([key, config]) => {
        const Icon = config.icon;

        return (
          <Card
            key={key}
            elevation={1}
            sx={{
              height: "100%",
              border: "1px solid",
              borderColor: config.borderColor || "divider",
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
                  {config.title}
                </Typography>

                <Avatar
                  sx={{
                    bgcolor: config.iconBg,
                    color: config.iconColor,
                    width: 42,
                    height: 42,
                  }}
                  variant="rounded"
                >
                  <Icon fontSize="small" />
                </Avatar>
              </Stack>

              <Stack spacing={0.5}>
                <Stack direction="row" spacing={0.5} alignItems="baseline">
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    color={config.valueColor || "text.primary"}
                  >
                    {formatPrice(statsData[key as keyof typeof statsData])}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {config.unit}
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
