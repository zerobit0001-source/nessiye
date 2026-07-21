import {
  Box,
  Button,
  Card,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { PaymentsRounded } from "@mui/icons-material";

interface PaymentCardProps {
  id: string;
  amount: number;
  createdAt: string;
  method?: string;
}

export default function ShopDetailsPaymentCard({
  id,
  amount,
  createdAt,
  method = "پرداخت نقدی",
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
            شناسه پرداخت: #{id}
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
            mt={0.5}
          >
            تاریخ پرداخت: {createdAt}
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
            <Typography
              variant="caption"
              color="text.secondary"
            >
              مبلغ پرداخت
            </Typography>

            <Typography
              fontWeight={700}
              mt={0.5}
              color="success.main"
            >
              {amount.toLocaleString()} تومان
            </Typography>
          </Box>

          <Box textAlign="center" flex={1}>
            <Typography
              variant="caption"
              color="text.secondary"
            >
              روش پرداخت
            </Typography>

            <Typography
              fontWeight={700}
              mt={0.5}
            >
              {method}
            </Typography>
          </Box>
        </Stack>
      </Box>

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
    </Card>
  );
}