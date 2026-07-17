import {
  AddCardRounded,
  AssessmentRounded,
  DashboardRounded,
  HistoryRounded,
  MoneyRounded,
  PeopleOutlineRounded,
  PersonOutlineRounded,
  ProductionQuantityLimitsRounded,
  StoreMallDirectoryRounded,
} from "@mui/icons-material";

export interface LinkItemType {
  group: string;
  items: Array<{ name: string; href: string; icon: any }>;
}

export const links: Array<LinkItemType> = [
  {
    group: "اصلی",
    items: [
      {
        name: "داشبورد",
        href: "/dashboard",
        icon: <DashboardRounded />,
      },
      {
        name: "مشتری ها",
        href: "/dashboard/customers",
        icon: <PeopleOutlineRounded />,
      },
      {
        name: "نسیه ها",
        href: "/dashboard/debts",
        icon: <AddCardRounded />,
      },
      {
        name: "فروش ها",
        href: "/dashboard/sales",
        icon: <AddCardRounded />,
      },
      {
        name: "پرداختی ها",
        href: "/dashboard/payments",
        icon: <MoneyRounded />,
      },
      {
        name: "محصولات",
        href: "/dashboard/products",
        icon: <ProductionQuantityLimitsRounded />,
      },
    ],
  },
  {
    group: "تحلیل",
    items: [
      {
        name: "گزارش ها",
        href: "/dashboard/reports",
        icon: <AssessmentRounded />,
      },
      {
        name: "بدهی‌های معوق",
        href: "/dashboard/overdue",
        icon: <HistoryRounded />,
      },
    ],
  },
  {
    group: "مدیریت",
    items: [
      {
        name: "مارکت ها",
        href: "/dashboard/markets",
        icon: <StoreMallDirectoryRounded />,
      },
      {
        name: "کاربران",
        href: "/dashboard/users",
        icon: <PersonOutlineRounded />,
      },
    ],
  },
];
