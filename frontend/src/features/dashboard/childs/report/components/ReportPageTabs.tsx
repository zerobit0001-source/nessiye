"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import {
  PointOfSaleRounded,
  PaymentsRounded,
  ReceiptLongRounded,
  PeopleAltRounded,
  Inventory2Rounded,
} from "@mui/icons-material";

const reportTabs = [
  {
    id: 1,
    name: "گزارش فروش",
    value: "/dashboard/reports",
    icon: <PointOfSaleRounded />,
  },
  {
    id: 2,
    name: "گزارش پرداخت‌ها",
    value: "/dashboard/reports/payments",
    icon: <PaymentsRounded />,
  },
  {
    id: 3,
    name: "گزارش بدهی‌ها",
    value: "/dashboard/reports/debts",
    icon: <ReceiptLongRounded />,
  },
  {
    id: 4,
    name: "گزارش مشتریان",
    value: "/dashboard/reports/customers",
    icon: <PeopleAltRounded />,
  },
  {
    id: 5,
    name: "گزارش محصولات",
    value: "/dashboard/reports/products",
    icon: <Inventory2Rounded />,
  },
];

export default function ReportTabs() {
  const pathname = usePathname();

  return (
    <ToggleButtonGroup
      exclusive
      value={pathname}
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 1,
        width: "100%",
        "& .MuiToggleButton-root": {
          flex: {
            xs: "1 1 calc(50% - 4px)",
            sm: "1 1 calc(33.33% - 6px)",
            md: "0 0 auto",
          },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          py: 1.2,
        },
      }}
    >
      {reportTabs.map((item) => (
        <ToggleButton
          key={item.id}
          value={item.value}
          component={Link}
          href={item.value}
        >
          {item.icon}
          {item.name}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
