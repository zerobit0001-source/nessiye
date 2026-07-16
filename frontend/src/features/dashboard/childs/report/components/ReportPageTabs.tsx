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
    <ToggleButtonGroup exclusive value={pathname}>
      {reportTabs.map((item) => (
        <ToggleButton
          key={item.id}
          value={item.value}
          component={Link}
          href={item.value}
          className="flex gap-2"
        >
          {item.icon}
          {item.name}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
