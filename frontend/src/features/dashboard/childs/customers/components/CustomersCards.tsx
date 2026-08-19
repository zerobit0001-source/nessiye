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
import { useGetCustomersSummaryQuery } from "../api/ApiCustomer";
import { formatPrice } from "@/utils/formatters";

const CUSTOMERS_STATS_CONFIG = {
  total: {
    title: "کل مشتریان",
    value: 423,
    icon: <PeopleAltOutlined />,
    color: "#2563EB",
    bg: "#EEF4FF",
  },
  active: {
    title: "دارای بدهی باز",
    value: 168,
    icon: <ReceiptLongOutlined />,
    color: "#EF4444",
    bg: "#FEF2F2",
  },
  overdue: {
    title: "بدهی معوق",
    value: 12,
    icon: <AccessTimeOutlined />,
    color: "#F59E0B",
    bg: "#FFF7ED",
  },
  settled: {
    title: "تسویه‌حساب کامل",
    value: 264,
    icon: <CheckCircleOutlineOutlined />,
    color: "#22C55E",
    bg: "#F0FDF4",
  },
};

export default function CustomerCards() {
  const { data, isLoading, error, isSuccess } = useGetCustomersSummaryQuery();

  const summary = isSuccess ? data.summary : [];

  return (
    <Grid container spacing={2}>
      {Object.entries(CUSTOMERS_STATS_CONFIG).map(([key, config], index) => (
        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={config.title}>
          <SlideUpBoxAnimation key={config.title} delay={index / 15 + 0.1}>
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

                    <Typography variant="h6" fontWeight={700}>
                      {isLoading ? (
                        <Skeleton variant="text" width={100} height={24} />
                      ) : (
                        formatPrice(summary[key])
                      )}
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
