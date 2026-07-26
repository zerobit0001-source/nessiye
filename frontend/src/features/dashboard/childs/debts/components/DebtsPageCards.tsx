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
} from "@mui/icons-material";
import SlideUpBoxAnimation from "@/components/SlideUpBoxAnimation";
import { useGetDebtsCardsQuery } from "../../sales/api/ApiSales";

// total
// total_amount
// settled
// partial
// overdue

const DEBTS_STATS_CONFIG = {
  total: {
    title: "کل بدهی‌ها",
    icon: <PeopleAltOutlined />,
    color: "#2563EB",
    bg: "#EEF4FF",
    unit: "عدد",
  },
  settled: {
    title: "تسویه‌شده",
    icon: <CheckCircleOutlineOutlined />,
    color: "#22C55E",
    bg: "#F0FDF4",
    unit: "عدد",
  },
  partial: {
    title: "پرداخت جزئی",
    icon: <AccessTimeOutlined />,
    color: "#F59E0B",
    bg: "#FFF7ED",
    unit: "عدد",
  },
  overdue: {
    title: "معوق",
    icon: <ReceiptLongOutlined />,
    color: "#EF4444",
    bg: "#FEF2F2",
    unit: "عدد",
  },
} satisfies Record<
  string,
  {
    title: string;
    icon: React.ReactNode;
    color: string;
    bg: string;
    unit: string;
  }
>;

export default function DebtsCards() {
  const { data, isLoading, error, isSuccess } = useGetDebtsCardsQuery();

  const summary = isSuccess
    ? data?.summary
    : {
        total: 0,
        settled: 0,
        partial: 0,
        overdue: 0,
      };

  return (
    <Grid container spacing={2}>
      {(
        Object.entries(DEBTS_STATS_CONFIG) as [
          keyof typeof DEBTS_STATS_CONFIG,
          (typeof DEBTS_STATS_CONFIG)[keyof typeof DEBTS_STATS_CONFIG],
        ][]
      ).map(([key, config], index) => (
        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={config.title}>
          <SlideUpBoxAnimation delay={index / 15 + 0.1}>
            <Card
              elevation={1}
              sx={{
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                height: "100%",
              }}
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

                    <Typography variant="h6" fontWeight={700}>
                      {isLoading ? <Skeleton variant="text" /> : summary[key]}{" "}
                      {config.unit}
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
