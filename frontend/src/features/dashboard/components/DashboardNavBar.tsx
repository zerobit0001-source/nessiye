"use client";

import Link from "next/link";
import ToggleThemeBtn from "@/theme/ToggleThemeBtn";
import { useAppSelector } from "@/lib/redux/hooks";

import {
  Avatar,
  Badge,
  Box,
  IconButton,
  InputBase,
  Paper,
  Typography,
  Divider,
} from "@mui/material";

import {
  NotificationsOutlined,
  Search,
  KeyboardArrowDownRounded,
} from "@mui/icons-material";
import MobileMenu from "@/components/dash/MobileMenu";
import { useGetUnreadedNotificationsCountQuery } from "../childs/dashboard/api/ApiDashboard";

const DashboardNavBar = () => {
  const user = useAppSelector((s) => s.userInfo);
  const notificationCountQuery = useGetUnreadedNotificationsCountQuery();

  return (
    <Box
      component="header"
      sx={{
        height: 70,
        px: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        bgcolor: "background.paper",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      {/* Search */}
      <Paper
        elevation={0}
        sx={{
          width: 380,
          alignItems: "center",
          px: 2,
          py: 0.5,
          borderRadius: 999,
          bgcolor: "action.hover",
          border: 1,
          borderColor: "divider",
        }}
        className="hidden lg:flex"
      >
        <Search
          sx={{
            color: "text.secondary",
            mr: 1,
          }}
        />

        <InputBase
          placeholder="جستجوی مشتری، بدهی یا پرداخت..."
          sx={{
            flex: 1,
          }}
        />
      </Paper>
      <MobileMenu />

      {/* Actions */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <ToggleThemeBtn />

        {/* notification icon */}
        <Link href={"/dashboard/notifications"}>
          <IconButton>
            <Badge
              badgeContent={
                (notificationCountQuery.isLoading
                  ? ".."
                  : notificationCountQuery.data?.unread_count > 99
                    ? "+99"
                    : notificationCountQuery.data?.unread_count) || 0
              }
              color="error"
            >
              <NotificationsOutlined />
            </Badge>
          </IconButton>
        </Link>

        <Divider orientation="vertical" flexItem className="hidden lg:flex" />

        <Link href="/dashboard/profile" className="hidden md:flex">
          <Paper
            elevation={0}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              px: 1.2,
              borderRadius: 3,
              cursor: "pointer",
              transition: ".25s",
              border: 1,
              borderColor: "divider",

              "&:hover": {
                bgcolor: "action.hover",
              },
            }}
          >
            <Avatar
              sx={{
                width: 40,
                height: 40,
                bgcolor: "primary.main",
              }}
            >
              {user.full_name?.charAt(0) ?? "؟"}
            </Avatar>

            <Box>
              <Typography className="font-bold! text-xs!">
                {user.full_name}
              </Typography>

              <Typography variant="caption" color="text.secondary">
                {user.shop_name}
              </Typography>
            </Box>

            <KeyboardArrowDownRounded
              sx={{
                color: "text.secondary",
              }}
            />
          </Paper>
        </Link>
      </Box>
    </Box>
  );
};

export default DashboardNavBar;
