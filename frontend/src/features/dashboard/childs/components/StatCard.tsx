import {
  Card,
  CardContent,
  Stack,
  Typography,
  Avatar,
} from "@mui/material";
import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: number | string;
  unit?: string;
  icon: ReactNode;
  iconBg: string;
  iconColor: string;
}

export default function StatsCard({
  title,
  value,
  unit = "",
  icon,
  iconBg,
  iconColor,
}: StatsCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        height: "100%",
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
            {title}
          </Typography>

          <Stack direction="row" spacing={1} alignItems="baseline">
            <Typography
              variant="h4"
              fontWeight={700}
            >
              {value}
            </Typography>

            {unit && (
              <Typography
                variant="body2"
                color="text.secondary"
              >
                {unit}
              </Typography>
            )}
          </Stack>
        </Stack>

        <Avatar
          sx={{
            bgcolor: iconBg,
            color: iconColor,
            width: 54,
            height: 54,
          }}
        >
          {icon}
        </Avatar>
      </CardContent>
    </Card>
  );
}