import { Avatar, Card, Divider, Stack, Typography, Box } from "@mui/material";

import {
  PaymentsOutlined,
  ShoppingCartOutlined,
  ReceiptLongOutlined,
  PersonAddAltOutlined,
  WarningAmberOutlined,
} from "@mui/icons-material";
import { ActivityType } from "@/types/types";
import { timeAgo } from "@/utils/formatters";

// const activities = [
//   {
//     title: "علی موسوی مبلغ ۵۰۰,۰۰۰ تومان پرداخت کرد",
//     time: "۵ دقیقه پیش",
//     icon: <PaymentsOutlined />,
//     color: "#12b76a",
//     bg: "#e8fff4",
//   },
//   {
//     title: "فاکتور جدید برای نگار صادقی ثبت شد",
//     time: "۲۲ دقیقه پیش",
//     icon: <ShoppingCartOutlined />,
//     color: "#2563eb",
//     bg: "#edf3ff",
//   },
//   {
//     title: "بدهی جدید برای محمد کریمی ثبت شد",
//     time: "۴۵ دقیقه پیش",
//     icon: <ReceiptLongOutlined />,
//     color: "#f59e0b",
//     bg: "#fff7e6",
//   },
//   {
//     title: "مشتری جدید یاسمین قاسمی اضافه شد",
//     time: "۱ ساعت پیش",
//     icon: <PersonAddAltOutlined />,
//     color: "#9333ea",
//     bg: "#f5edff",
//   },
//   {
//     title: "بدهی حسین نجاتی ۱۰ روز معوق شد",
//     time: "۱ ساعت پیش",
//     icon: <WarningAmberOutlined />,
//     color: "#ef4444",
//     bg: "#ffeded",
//   },
// ];

interface RecentActivitiesProps {
  data: ActivityType[];
}

export default function RecentActivities({ data }: RecentActivitiesProps) {
  const getLigthColor = (entity: string) => {
    switch (entity) {
      case "payment":
        return "success.light";
      case "debt":
        return "warning.light";
      case "customer":
        return "secondary.light";
      default:
        return "info.light";
    }
  };

  const getDarkColor = (entity: string) => {
    switch (entity) {
      case "payment":
        return "success.dark";
      case "debt":
        return "warning.dark";
      case "customer":
        return "secondary.dark";
      default:
        return "info.dark";
    }
  };

  const getIcon = (entity: string) => {
    switch (entity) {
      case "payment":
        return <PaymentsOutlined />;
      case "debt":
        return <ReceiptLongOutlined />;
      case "customer":
        return <PersonAddAltOutlined />;
      default:
        return <ShoppingCartOutlined />;
    }
  };

  return (
    <Card
      sx={{
        p: 2.5,
        borderRadius: 3,
        boxShadow: "0 2px 10px rgba(0,0,0,.08)",
      }}
      className="col-span-full lg:col-span-2 "
    >
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography fontWeight={700} fontSize={16}>
          فعالیت‌های اخیر
        </Typography>

        <Typography
          color="primary"
          fontSize={13}
          fontWeight={600}
          sx={{ cursor: "pointer" }}
        >
          همه
        </Typography>
      </Stack>

      {data.map((item, index) => (
        <Box key={index}>
          <Stack direction="row" alignItems="center" spacing={2}>
            {/* Icon */}
            <Avatar
              sx={{
                width: 38,
                height: 38,
                bgcolor: getLigthColor(item.entity),
                color: getDarkColor(item.entity),
              }}
            >
              {getIcon(item.entity)}
            </Avatar>

            {/* Text */}
            <Box>
              <Typography fontSize={14} fontWeight={600}>
                {item.title}
              </Typography>

              <Typography fontSize={12} color="text.secondary" mt={0.3}>
                {timeAgo(item.created_at)}
              </Typography>
            </Box>
          </Stack>

          {index !== data.length - 1 && (
            <Divider
              sx={{
                my: 1.8,
                opacity: 0.4,
              }}
            />
          )}
        </Box>
      ))}
    </Card>
  );
}
