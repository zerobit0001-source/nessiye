import { DebtType } from "@/types/types";
import {
  ArrowForwardIosRounded,
  ReceiptLongRounded,
} from "@mui/icons-material";
import { Chip, IconButton, Stack, Typography } from "@mui/material";
import Link from "next/link";

export default function DebtSearchResult({ debt }: { debt: DebtType }) {
  const isPaid = debt.remaining === 0;

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
      <Stack direction="row" alignItems="center" spacing={1.5}>
        {/* Icon */}
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
          <ReceiptLongRounded fontSize="small" />
        </Stack>

        {/* Info */}
        <Stack spacing={0.5}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography fontWeight={600}>{debt.debt_id}</Typography>

            <Chip
              label={isPaid ? "تسویه شده" : "باقی‌مانده"}
              size="small"
              color={isPaid ? "success" : "warning"}
              variant="outlined"
              sx={{
                height: 24,
                fontSize: 11,
              }}
            />
          </Stack>

          <Typography variant="body2" color="text.secondary">
            {debt.customer_name}
          </Typography>
        </Stack>
      </Stack>

      {/* Amounts */}
      <Stack direction="row" alignItems="center" spacing={2}>
        <Stack alignItems="flex-end" spacing={0.2}>
          <Typography variant="body2" fontWeight={600}>
            {debt.amount.toLocaleString("fa-IR")} تومان
          </Typography>

          {!isPaid && (
            <Typography variant="caption" color="warning.main">
              باقی‌مانده: {debt.remaining.toLocaleString("fa-IR")} تومان
            </Typography>
          )}
        </Stack>

        <Link href={`/dashboard/debts/${debt.id}`}>
          <IconButton size="small" color="primary">
            <ArrowForwardIosRounded
              sx={{
                fontSize: 15,
                transform: "rotate(180deg)",
              }}
            />
          </IconButton>
        </Link>
      </Stack>
    </Stack>
  );
}
