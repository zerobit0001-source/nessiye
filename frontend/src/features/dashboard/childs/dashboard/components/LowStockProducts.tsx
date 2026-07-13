import {
  Avatar,
  Box,
  Card,
  Divider,
  Stack,
  Typography,
  Chip,
} from "@mui/material";

import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";

const products = [
  {
    name: "روغن آفتابگردان لادن",
    category: "مواد غذایی",
    count: "۳ عدد",
    danger: false,
  },
  {
    name: "برنج طارم هاشمی ۱۰ کیلویی",
    category: "مواد غذایی",
    count: "ناموجود",
    danger: true,
  },
  {
    name: "پودر شوینده پرسیل ۳ کیلویی",
    category: "شوینده و بهداشتی",
    count: "۵ عدد",
    danger: false,
  },
  {
    name: "شیر پرچرب پگاه ۱ لیتری",
    category: "لبنیات",
    count: "۲ عدد",
    danger: false,
  },
];

export default function LowStockProducts() {
  return (
    <Card
      sx={{
        p: 2.5,
        borderRadius: 3,
        boxShadow: "0 2px 10px rgba(0,0,0,.08)",
      }}
      className="col-span-full lg:col-span-2 "
    >
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography fontWeight={700} fontSize={16}>
          محصولات کم‌موجود
        </Typography>

        <Typography
          color="primary"
          fontSize={13}
          fontWeight={600}
          sx={{ cursor: "pointer" }}
        >
          همه
        </Typography>
      </Stack>

      {products.map((product, index) => (
        <Box key={product.name}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            {/* Product info */}
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: "#eef3f8",
                  color: "#7b8ba1",
                }}
              >
                <Inventory2OutlinedIcon />
              </Avatar>

              <Box>
                <Typography fontSize={14} fontWeight={700}>
                  {product.name}
                </Typography>

                <Typography fontSize={12} color="text.secondary">
                  {product.category}
                </Typography>
              </Box>
            </Stack>

            {/* Count */}
            <Chip
              label={product.count}
              size="small"
              sx={{
                fontWeight: 700,
                fontSize: 12,
                bgcolor: product.danger ? "#ffecec" : "#fff5e6",
                color: product.danger ? "#ef4444" : "#f59e0b",
                borderRadius: 2,
              }}
            />
          </Stack>

          {index !== products.length - 1 && (
            <Divider
              sx={{
                my: 1.5,
                opacity: 0.5,
              }}
            />
          )}
        </Box>
      ))}
    </Card>
  );
}
