"use client";
import {
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
  Avatar,
  Skeleton,
} from "@mui/material";
import {
  PeopleAltOutlined,
  ReceiptLongOutlined,
  AccessTimeOutlined,
  CheckCircleOutlineOutlined,
  PointOfSaleRounded,
  AttachMoneyRounded,
} from "@mui/icons-material";
import SlideUpBoxAnimation from "@/components/SlideUpBoxAnimation";
import { useGetSalesCardsQuery } from "../api/ApiSales";
import { formatPrice } from "@/utils/formatters";

// today_total
// today_count
// this_month_cash
// this_month_debt

const SALES_STATS_CONFIG = {
  today_total: {
    title: "فروش امروز",
    value: 26400000,
    icon: <PointOfSaleRounded />,
    color: "#2563EB",
    bg: "#EEF4FF",
    unit: "تومان",
  },
  today_count: {
    title: "تعداد فاکتور امروز",
    value: 168,
    icon: <ReceiptLongOutlined />,
    color: "#EF4444",
    bg: "#FEF2F2",
    unit: "عدد",
  },
  this_month_cash: {
    title: "فروش نقدی این ماه",
    value: 12,
    icon: <AttachMoneyRounded />,
    color: "#22C55E",
    bg: "#F0FDF4",
    unit: "تومان",
  },
  this_month_debt: {
    title: "فروش نسیه این ماه",
    value: 26400000,
    icon: <CheckCircleOutlineOutlined />,
    color: "#F59E0B",
    bg: "#FFF7ED",
    unit: "تومان",
  },
};

export default function SalesPageCards() {
  const { data, isLoading, error, isSuccess } = useGetSalesCardsQuery();

  const summary = isSuccess ? data.summary : null;

  return (
    <Grid container spacing={2}>
      {Object.entries(SALES_STATS_CONFIG).map(([key, config], index) => (
        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={config.title}>
          <SlideUpBoxAnimation delay={index / 15 + 0.1}>
            <Card
              elevation={3}
              sx={{
                border: "1px solid",
                borderColor: "divider",
                height: "100%",
              }}
              className="rounded-lg!"
            >
              <CardContent>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack spacing={0.5}>
                    <Typography variant="body2" color="text.secondary">
                      {config.title}
                    </Typography>

                    <Typography
                      variant="h6"
                      fontWeight={700}
                      className="flex items-center gap-2"
                    >
                      <span>
                        {isLoading ? (
                          <Skeleton variant="text" width={70} />
                        ) : (
                          formatPrice(summary[key])
                        )}
                      </span>
                      <Typography variant="body1">{config.unit}</Typography>
                    </Typography>
                  </Stack>

                  <Avatar
                    sx={{
                      bgcolor: config.bg,
                      color: config.color,
                      width: 48,
                      height: 48,
                    }}
                  >
                    {config.icon}
                  </Avatar>
                </Stack>
              </CardContent>
            </Card>
          </SlideUpBoxAnimation>
        </Grid>
      ))}
    </Grid>
  );
}
