import { CustomerType } from "@/types/customerType";
import { ArrowForwardIosRounded, PersonRounded } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/material";
import Link from "next/link";

export default function CustomerSearchResult({
  customer,
}: {
  customer: CustomerType;
}) {
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
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{
            width: 42,
            height: 42,
            borderRadius: 2.5,
            bgcolor: "action.hover",
            color: "text.secondary",
          }}
        >
          <PersonRounded fontSize="small" />
        </Stack>

        <Stack spacing={0.3}>
          <Typography fontWeight={600}>{customer.full_name}</Typography>

          <Typography variant="body2" color="text.secondary" dir="ltr">
            {customer.phone_number}
          </Typography>
        </Stack>
      </Stack>

      <Link href={`/dashboard/customers/${customer.id}`}>
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
  );
}
