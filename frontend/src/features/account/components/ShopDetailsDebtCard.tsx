import { Box, Button, Card, Chip, Stack, Typography } from "@mui/material";

interface DebtCardProps {
  id: string;
  status: "active" | "settled" | "overdue";
  total: number;
  paid: number;
  remaining: number;
  createdAt: string;
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

export default function ShopDetailsDebtCard({
  id,
  status,
  total,
  paid,
  remaining,
  createdAt,
}: DebtCardProps) {
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
          label={statusConfig[status].label}
          color={statusConfig[status].color}
          size="small"
        />

        <Box textAlign="right">
          <Typography fontWeight={700}>شناسه بدهی: #{id}</Typography>

          <Typography variant="caption" color="text.secondary" mt={0.5}>
            تاریخ ثبت: {createdAt}
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
              {total.toLocaleString()}
            </Typography>
          </Box>

          <Box textAlign="center" flex={1}>
            <Typography variant="caption" color="text.secondary">
              پرداخت شده
            </Typography>

            <Typography fontWeight={700} mt={0.5} color="success.main">
              {paid.toLocaleString()}
            </Typography>
          </Box>

          <Box textAlign="center" flex={1}>
            <Typography variant="caption" color="text.secondary">
              باقیمانده
            </Typography>

            <Typography fontWeight={700} mt={0.5} color="error.main">
              {remaining.toLocaleString()}
            </Typography>
          </Box>
        </Stack>
      </Box>

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
    </Card>
  );
}
