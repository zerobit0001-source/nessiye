import {
  Box,
  Button,
  Chip,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import {
  DeleteOutline,
  EditOutlined,
  AddCircleOutline,
  Inventory2Outlined,
  CalendarTodayOutlined,
  CategoryOutlined,
} from "@mui/icons-material";
import { formatPrice } from "@/utils/formatters";
import Link from "next/link";

interface ProductDetailsPageDetailsProps {
  name: string;
  stock: number;
  barcode?: string;
  category?: string;
  productId?: number;
}

export default function ProductDetailsPageDetails({
  name,
  stock,
  barcode,
  category,
  productId,
}: ProductDetailsPageDetailsProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Stack
        direction={{
          xs: "column",
          md: "row",
        }}
        spacing={2}
        justifyContent="space-between"
        alignItems={{
          xs: "stretch",
          md: "center",
        }}
      >
        {/* اطلاعات */}
        <Stack direction="row" spacing={2} alignItems="center" flex={1}>
          <Box
            sx={{
              width: 72,
              height: 72,
              borderRadius: 3,
              bgcolor: "#FFF7E6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Inventory2Outlined
              sx={{
                color: "#E8A100",
                fontSize: 34,
              }}
            />
          </Box>

          <Stack spacing={1} flex={1}>
            <div className="flex  items-center gap-2 flex-wrap">
              <Typography fontWeight={700} fontSize={20}>
                {name}
              </Typography>
              <Chip
                label={`موجودی : ${formatPrice(stock)}`}
                color="warning"
                size="small"
              />
            </div>
            <Stack direction="row" spacing={2} flexWrap="wrap">
              <Typography variant="body2" color="text.secondary">
                {barcode}
              </Typography>
              <Stack direction="row" spacing={0.5}>
                <CategoryOutlined fontSize="small" />
                <Typography variant="body2">
                  {category ? category : "دسته‌بندی نامشخص"}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={0.5}>
                <CalendarTodayOutlined fontSize="small" />
                <Typography variant="body2">آخرین ورود: ۱۴۰۳/۰۴/۲۰</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>

        {/* اکشن ها */}
        <div className="flex gap-2 items-center justify-between">
          <Button variant="contained" startIcon={<AddCircleOutline />}>
            افزایش موجودی انبار
          </Button>

          <span>
            <Link href={`/dashboard/products/${productId}/edit`}>
              <IconButton color="default">
                <EditOutlined />
              </IconButton>
            </Link>

            <IconButton color="error">
              <DeleteOutline />
            </IconButton>
          </span>
        </div>
      </Stack>
    </Paper>
  );
}
