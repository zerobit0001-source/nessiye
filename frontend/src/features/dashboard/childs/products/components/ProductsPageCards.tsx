"use client";
import Grid from "@mui/material/Grid";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Avatar,
  Skeleton,
} from "@mui/material";
import {
  Inventory2Outlined,
  CheckCircleOutline,
  WarningAmberRounded,
  RemoveShoppingCartOutlined,
} from "@mui/icons-material";
import { useGetProductsCardsQuery } from "../api/ApiProduct";
import { formatPrice } from "@/utils/formatters";

// total_count
// total_stock
// stocked
// low_stock
// out_of_stock

const PRODUCTS_CARDS_CONFIG = {
  total_count: {
    title: "تعداد کل محصولات",
    value: 384,
    color: "#4F46E5",
    bg: "#EEF2FF",
    icon: <Inventory2Outlined />,
  },
  total_stock: {
    title: "موجود در انبار",
    value: 349,
    color: "#22C55E",
    bg: "#E9F8EE",
    icon: <CheckCircleOutline />,
  },
  low_stock: {
    title: "کمبود موجود",
    value: 27,
    color: "#F59E0B",
    bg: "#FFF5E8",
    icon: <WarningAmberRounded />,
  },
  out_of_stock: {
    title: "ناموجود",
    value: 8,
    color: "#EF4444",
    bg: "#FDECEC",
    icon: <RemoveShoppingCartOutlined />,
  },
} as const;

type SummaryKey = keyof typeof PRODUCTS_CARDS_CONFIG;

export default function ProductsPageCards() {
  const { data, isLoading, error } = useGetProductsCardsQuery();

  const summary = data?.summary ?? {
    total_count: 0,
    total_stock: 0,
    low_stock: 0,
    out_of_stock: 0,
  };
  return (
    <Grid container spacing={2}>
      {Object.entries(PRODUCTS_CARDS_CONFIG).map(([key, config]) => (
        <Grid key={config.title} size={{ xs: 12, sm: 6, lg: 3 }}>
          <Card
            elevation={3}
            sx={{
              border: "1px solid",
              borderColor: "divider",
            }}
            className="rounded-lg!"
          >
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                py: 2.5,
              }}
            >
              <Stack spacing={0.5}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight={500}
                >
                  {config.title}
                </Typography>

                <Stack direction="row" spacing={1} alignItems="baseline">
                  <Typography variant="h6" fontWeight={700}>
                    {isLoading ? (
                      <Skeleton variant="text" width={80} />
                    ) : (
                      formatPrice(summary[key as SummaryKey])
                    )}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    قلم
                  </Typography>
                </Stack>
              </Stack>

              <Avatar
                sx={{
                  bgcolor: config.bg,
                  color: config.color,
                  width: 54,
                  height: 54,
                }}
              >
                {config.icon}
              </Avatar>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
