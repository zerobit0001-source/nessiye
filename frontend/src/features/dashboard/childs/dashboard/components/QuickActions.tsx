import { Avatar, Box, Card, Grid, Stack, Typography } from "@mui/material";

import {
  PointOfSaleOutlined,
  PaymentsOutlined,
  ReceiptLongOutlined,
  PersonAddAltOutlined,
} from "@mui/icons-material";
import Link from "next/link";

const actions = [
  {
    title: "ثبت فروش",
    subtitle: "فاکتور جدید برای مشتری",
    icon: <PointOfSaleOutlined />,
    color: "#2563eb",
    bg: "#eef4ff",
    link: "/dashboard/sales/create",
  },
  {
    title: "ثبت پرداخت",
    subtitle: "دریافت وجه از مشتری",
    icon: <PaymentsOutlined />,
    color: "#10b981",
    bg: "#e9fff5",
    link: "/dashboard/payments/create",
  },
  {
    title: "ثبت بدهی",
    subtitle: "افزودن بدهی جدید",
    icon: <ReceiptLongOutlined />,
    color: "#f59e0b",
    bg: "#fff7e8",
    link: "/dashboard/debts/create",
  },
  {
    title: "افزودن مشتری",
    subtitle: "ثبت مشتری جدید",
    icon: <PersonAddAltOutlined />,
    color: "#9333ea",
    bg: "#f5edff",
    link: "/dashboard/customers/create",
  },
];

export default function QuickActions() {
  return (
    <Card
      sx={{
        p: 2.5,
        borderRadius: 3,
        boxShadow: "0 2px 10px rgba(0,0,0,.08)",
      }}
      className="col-span-full  "
    >
      {/* Title */}
      <Typography fontWeight={700} fontSize={16} mb={2}>
        اقدامات سریع
      </Typography>

      <Grid container spacing={2}>
        {actions.map((action) => (
          <Grid key={action.title} size={{ xs: 12, sm: 6, md: 3 }}>
            <Link href={action.link}>
              <Box
                sx={{
                  border: "1px solid #e5e7eb",
                  borderRadius: 2,
                  p: 2,
                  height: 80,
                  cursor: "pointer",
                  transition: ".2s",

                  "&:hover": {
                    boxShadow: "0 4px 12px rgba(0,0,0,.08)",
                  },
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar
                    sx={{
                      width: 36,
                      height: 36,
                      bgcolor: action.bg,
                      color: action.color,
                    }}
                  >
                    {action.icon}
                  </Avatar>

                  <Box>
                    <Typography fontSize={14} fontWeight={700}>
                      {action.title}
                    </Typography>

                    <Typography fontSize={12} color="text.secondary">
                      {action.subtitle}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Card>
  );
}
