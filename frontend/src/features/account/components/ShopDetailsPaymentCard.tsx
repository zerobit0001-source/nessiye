import { Box, Button, Card, Chip, Stack, Typography } from "@mui/material";
import { PaymentsRounded } from "@mui/icons-material";
import { PaymentType } from "@/types/types";
import { formatDate, formatPrice } from "@/utils/formatters";
import Link from "next/link";

interface PaymentCardProps {
  payment: PaymentType;
  shopId: number;
}

export default function ShopDetailsPaymentCard({
  payment,
  shopId,
}: PaymentCardProps) {
  return (
    <Card
      elevation={0}
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
          icon={<PaymentsRounded />}
          label="ثبت شده"
          color="success"
          size="small"
        />

        <Box textAlign="right">
          <Typography fontWeight={700}>
            شناسه پرداخت: #{payment.payment_id}
          </Typography>

          <Typography variant="caption" color="text.secondary" mt={0.5}>
            تاریخ پرداخت: {formatDate(payment.created_at)}
          </Typography>
        </Box>
      </Stack>

      {/* Payment Details */}
      <Box
        sx={{
          mt: 3,
          mb: 3,
          bgcolor: "success.50",
          borderRadius: 6,
          px: 4,
          py: 3,
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={4}
          justifyContent="space-between"
        >
          <Box textAlign="center" flex={1}>
            <Typography variant="caption" color="text.secondary">
              مبلغ پرداخت
            </Typography>

            <Typography fontWeight={700} mt={0.5} color="success.main">
              {formatPrice(payment.amount)} تومان
            </Typography>
          </Box>

          <Box textAlign="center" flex={1}>
            <Typography variant="caption" color="text.secondary">
              روش پرداخت
            </Typography>

            <Typography fontWeight={700} mt={0.5}>
              {payment.method ? payment.method : "نامشخص"}
            </Typography>
          </Box>
        </Stack>
      </Box>

      <Link href={`/account/${shopId}/payment/${payment.payment_id}/`}>
        <Button
          fullWidth
          variant="outlined"
          color="success"
          sx={{
            borderRadius: 999,
            py: 1,
            fontWeight: 700,
          }}
        >
          مشاهده جزئیات پرداخت
        </Button>
      </Link>
    </Card>
  );
}
