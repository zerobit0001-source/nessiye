"use client";

import { Avatar, Card, Stack, Typography, Box } from "@mui/material";
import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  iconBgColor?: string;
  iconColor?: string;
}

export default function PaymentsPageCards({
  title,
  value,
  subtitle,
  icon,
  iconBgColor = "#EEF2FF",
  iconColor = "#4F46E5",
}: StatsCardProps) {
  return (
    <Card
      elevation={3}
      sx={{
        p: 2.5,
        border: "1px solid",
        borderColor: "divider",
      }}
      className="rounded-lg!"
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="body2" color="text.secondary" mb={1}>
            {title}
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="h5" fontWeight={700}>
              {value}
            </Typography>

            {subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Stack>
        </Box>

        <Avatar
          sx={{
            bgcolor: iconBgColor,
            color: iconColor,
            width: 54,
            height: 54,
          }}
        >
          {icon}
        </Avatar>
      </Stack>
    </Card>
  );
}
