import { Box, Button, Card, Stack, Typography } from "@mui/material";
import { ReceiptLongRounded } from "@mui/icons-material";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface SaleCardProps {
  id: string;
  createdAt: string;
  total: number;
  itemsCount: number;
}

export default function ShopDetailsSaleCard({
  id,
  createdAt,
  total,
  itemsCount,
}: SaleCardProps) {
  const pathname = usePathname();

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
        <ReceiptLongRounded color="primary" />

        <Box textAlign="right">
          <Typography fontWeight={700}>شناسه فاکتور: #{id}</Typography>

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
              مبلغ فاکتور
            </Typography>

            <Typography fontWeight={700} mt={0.5} color="primary.main">
              {total.toLocaleString()} تومان
            </Typography>
          </Box>

          <Box textAlign="center" flex={1}>
            <Typography variant="caption" color="text.secondary">
              تعداد کالا
            </Typography>

            <Typography fontWeight={700} mt={0.5}>
              {itemsCount} کالا
            </Typography>
          </Box>
        </Stack>
      </Box>
      <Link href={`${pathname}/sale/${id}`}>
        <Button
          fullWidth
          variant="outlined"
          sx={{
            borderRadius: 999,
            py: 1,
            fontWeight: 700,
          }}
        >
          مشاهده فاکتور
        </Button>
      </Link>
    </Card>
  );
}
