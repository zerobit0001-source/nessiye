import {
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
  Avatar,
} from "@mui/material";
import {
  PeopleAltOutlined,
  ReceiptLongOutlined,
  AccessTimeOutlined,
  CheckCircleOutlineOutlined,
  PointOfSaleRounded,
  AttachMoneyRounded,
} from "@mui/icons-material";

const stats = [
  {
    title: "فروش امروز",
    value: 26400000,
    icon: <PointOfSaleRounded />,
    color: "#2563EB",
    bg: "#EEF4FF",
  },
  {
    title: "تعداد فاکتور امروز",
    value: 168,
    icon: <ReceiptLongOutlined />,
    color: "#EF4444",
    bg: "#FEF2F2",
  },
  {
    title: "فروش نقدی این ماه",
    value: 12,
    icon: <AttachMoneyRounded />,
    color: "#22C55E",
    bg: "#F0FDF4",
  },
  {
    title: "فروش نسیه این ماه",
    value: 26400000,
    icon: <CheckCircleOutlineOutlined />,
    color: "#F59E0B",
    bg: "#FFF7ED",
  },
];

export default function SalesPageCards() {
  return (
    <Grid container spacing={2}>
      {stats.map((item) => (
        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={item.title}>
          <Card
            elevation={1}
            sx={{
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              height: "100%",
            }}
          >
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack spacing={0.5}>
                  <Typography variant="body2" color="text.secondary">
                    {item.title}
                  </Typography>

                  <Typography variant="h5" fontWeight={700}>
                    {item.value}
                  </Typography>
                </Stack>

                <Avatar
                  sx={{
                    bgcolor: item.bg,
                    color: item.color,
                    width: 48,
                    height: 48,
                  }}
                >
                  {item.icon}
                </Avatar>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
