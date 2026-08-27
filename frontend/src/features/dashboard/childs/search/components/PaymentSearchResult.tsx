import { ArrowForwardIosRounded, PaymentsRounded } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/material";

type Payment = {
  id: number;
  payment_id: string;
  customer_name: string;
  amount: number;
  created_at: string;
};

type Props = {
  payment: Payment;
};

export default function PaymentSearchResult({ payment }: Props) {
  const date = new Date(payment.created_at).toLocaleDateString("fa-IR");

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        px: 2,
        py: 1.5,
        cursor: "pointer",
        transition: "background-color 0.2s",
        "&:hover": {
          bgcolor: "action.hover",
        },
        "&:not(:last-child)": {
          borderBottom: "1px solid",
          borderColor: "divider",
        },
      }}
    >
      {/* Left */}
      <Stack direction="row" alignItems="center" spacing={1.5}>
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{
            width: 42,
            height: 42,
            borderRadius: 2.5,
            bgcolor: "action.hover",
            color: "text.secondary",
            flexShrink: 0,
          }}
        >
          <PaymentsRounded fontSize="small" />
        </Stack>

        <Stack spacing={0.4}>
          <Typography fontWeight={600}>{payment.payment_id}</Typography>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="body2" color="text.secondary">
              {payment.customer_name}
            </Typography>

            <Typography variant="caption" color="text.secondary">
              • {date}
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      {/* Right */}
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography fontWeight={600} color="success.main">
          +{payment.amount.toLocaleString("fa-IR")} تومان
        </Typography>

        <IconButton size="small">
          <ArrowForwardIosRounded
            sx={{
              fontSize: 15,
              transform: "rotate(180deg)",
            }}
          />
        </IconButton>
      </Stack>
    </Stack>
  );
}
