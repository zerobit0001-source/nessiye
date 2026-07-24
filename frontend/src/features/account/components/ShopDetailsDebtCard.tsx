import { DebtType } from "@/types/types";
import { formatDate, formatPrice } from "@/utils/formatters";
import { Box, Button, Card, Chip, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DebtCardProps {
  debt: DebtType;
}

const statusConfig = {
  active: {
    label: "فعال",
    color: "warning",
  },
  settled: {
    label: "تسویه شده",
    color: "success",
  },
  overdue: {
    label: "سررسید شده",
    color: "error",
  },
} as const;

export default function ShopDetailsDebtCard({ debt }: DebtCardProps) {
  const pathname = usePathname();

  return (
    <Card
      elevation={1}
      sx={{
        p: 3,
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Chip
          label={debt.is_paid ? "پرداخت شده" : "پرداخت نشده"}
          color={debt.is_paid ? "success" : "error"}
          size="small"
        />

        <Box textAlign="right">
          <Typography fontWeight={700}>شناسه بدهی: #{debt.debt_id}</Typography>

          <Typography variant="caption" color="text.secondary" mt={0.5}>
            تاریخ ثبت: {formatDate(debt.created_at)}
          </Typography>
        </Box>
      </Stack>

      {/* Stats */}
      <Box
        sx={{
          mt: 3,
          mb: 3,
          borderRadius: 6,
          px: 4,
          py: 3,
        }}
        className="bg-gray-100/50"
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={4}
          justifyContent="space-between"
        >
          <Box textAlign="center" flex={1}>
            <Typography variant="caption" color="text.secondary">
              مبلغ کل
            </Typography>

            <Typography fontWeight={700} mt={0.5}>
              {formatPrice(debt.total_amount)}
            </Typography>
          </Box>

          <Box textAlign="center" flex={1}>
            <Typography variant="caption" color="text.secondary">
              پرداخت شده
            </Typography>

            <Typography fontWeight={700} mt={0.5} color="success.main">
              {formatPrice(debt.paid_amount)}
            </Typography>
          </Box>

          <Box textAlign="center" flex={1}>
            <Typography variant="caption" color="text.secondary">
              باقیمانده
            </Typography>

            <Typography fontWeight={700} mt={0.5} color="error.main">
              {formatPrice(debt.remaining)}
            </Typography>
          </Box>
        </Stack>
      </Box>

      <Link href={`${pathname}/debt/${debt.debt_id}`}>
        <Button
          fullWidth
          variant="outlined"
          sx={{
            borderRadius: 999,
            py: 1,
            fontWeight: 700,
          }}
        >
          مشاهده جزئیات بدهی
        </Button>
      </Link>
    </Card>
  );
}
