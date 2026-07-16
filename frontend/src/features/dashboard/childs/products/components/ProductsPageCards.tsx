import Grid from "@mui/material/Grid";
import { Card, CardContent, Typography, Stack, Avatar } from "@mui/material";
import {
  Inventory2Outlined,
  CheckCircleOutline,
  WarningAmberRounded,
  RemoveShoppingCartOutlined,
} from "@mui/icons-material";

const stats = [
  {
    title: "تعداد کل محصولات",
    value: 384,
    color: "#4F46E5",
    bg: "#EEF2FF",
    icon: <Inventory2Outlined />,
  },
  {
    title: "موجود در انبار",
    value: 349,
    color: "#22C55E",
    bg: "#E9F8EE",
    icon: <CheckCircleOutline />,
  },
  {
    title: "کمبود موجود",
    value: 27,
    color: "#F59E0B",
    bg: "#FFF5E8",
    icon: <WarningAmberRounded />,
  },
  {
    title: "ناموجود",
    value: 8,
    color: "#EF4444",
    bg: "#FDECEC",
    icon: <RemoveShoppingCartOutlined />,
  },
];

export default function ProductsPageCards() {
  return (
    <Grid container spacing={2}>
      {stats.map((item) => (
        <Grid key={item.title} size={{ xs: 12, sm: 6, lg: 3 }}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 4,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                py: 2.5,
              }}
            >
              <Stack spacing={0.5}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight={500}
                >
                  {item.title}
                </Typography>

                <Stack direction="row" spacing={1} alignItems="baseline">
                  <Typography variant="h5" fontWeight={700}>
                    {item.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    قلم
                  </Typography>
                </Stack>
              </Stack>

              <Avatar
                sx={{
                  bgcolor: item.bg,
                  color: item.color,
                  width: 54,
                  height: 54,
                }}
              >
                {item.icon}
              </Avatar>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
