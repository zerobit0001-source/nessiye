import { CustomersListType } from "@/types/types";
import {
  Avatar,
  Box,
  Card,
  Divider,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";

interface Employee {
  name: string;
  phone: string;
  amount: number;
  avatar: string;
  progress: number;
}

const employees: Employee[] = [
  {
    name: "محمد کریمی",
    phone: "0912 345 6789",
    amount: 4200000,
    avatar: "م.ک",
    progress: 85,
  },
  {
    name: "سارا طاهری",
    phone: "0935 220 1187",
    amount: 3150000,
    avatar: "س.ط",
    progress: 65,
  },
  {
    name: "حسین نجاتی",
    phone: "0919 004 5521",
    amount: 2680000,
    avatar: "ح.ن",
    progress: 75,
  },
  {
    name: "فاطمه رستمی",
    phone: "0938 771 4402",
    amount: 1920000,
    avatar: "ف.ر",
    progress: 90,
  },
];

interface TopDebtorsProps {
  data: {
    customer_name: string;
    phone_number: string;
    total_debt: number;
    total_paid: number;
    remaining: number;
  }[];
}

export default function TopDebtors({ data }: TopDebtorsProps) {
  const calculateProgress = (remaining: number, total: number) => {
    return (remaining / total) * 100;
  };
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
        <Typography variant="h6" fontWeight={700} fontSize={16}>
          بدهکاران برتر
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

      {data?.map((customer, index) => (
        <Box key={customer.phone_number}>
          <Stack direction="row" alignItems="center" spacing={2}>
            {/* Avatar */}
            <Avatar
              sx={{
                width: 38,
                height: 38,
                bgcolor: "#e4ecff",
                color: "#3568ff",
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              {customer.customer_name[0]}
            </Avatar>

            {/* Name + phone */}
            <Box flex={1}>
              <Typography fontWeight={700} fontSize={14}>
                {customer.customer_name}
              </Typography>

              <Typography color="text.secondary" fontSize={12}>
                {customer.phone_number}
              </Typography>

              <LinearProgress
                variant="determinate"
                value={calculateProgress(
                  customer.remaining,
                  customer.total_debt,
                )}
                sx={{
                  mt: 1,
                  height: 5,
                  borderRadius: 10,
                  bgcolor: "#edf1f5",

                  "& .MuiLinearProgress-bar": {
                    bgcolor: "#ef4050",
                    borderRadius: 10,
                  },
                }}
              />
            </Box>

            {/* Amount */}
            <Typography color="error" fontWeight={700} fontSize={14}>
              {customer.remaining.toLocaleString("fa-IR")}
            </Typography>
          </Stack>

          {index !== data.length - 1 && <Divider sx={{ my: 2 }} />}
        </Box>
      ))}
    </Card>
  );
}
