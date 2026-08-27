import {
  ArrowForwardIosRounded,
  ShoppingCartRounded,
} from "@mui/icons-material";
import { Chip, IconButton, Stack, Typography } from "@mui/material";

type Sale = {
  id: number;
  customer_name: string;
  total: number;
  is_debt: boolean;
  created_at: string;
};

type Props = {
  sale: Sale;
};

export default function SaleSearchResult({ sale }: Props) {
  const date = new Date(sale.created_at).toLocaleDateString("fa-IR");

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
          <ShoppingCartRounded fontSize="small" />
        </Stack>

        <Stack spacing={0.4}>
          <Typography fontWeight={600}>{sale.customer_name}</Typography>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="caption" color="text.secondary">
              {date}
            </Typography>

            <Chip
              label={sale.is_debt ? "نسیه" : "نقدی"}
              size="small"
              color={sale.is_debt ? "warning" : "success"}
              variant="outlined"
              sx={{
                height: 23,
                fontSize: 11,
              }}
            />
          </Stack>
        </Stack>
      </Stack>

      {/* Right */}
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography fontWeight={600}>
          {sale.total.toLocaleString("fa-IR")} تومان
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
