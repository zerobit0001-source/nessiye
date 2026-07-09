import { ChangeType, MuiColors } from "@/types/handiTypes";

export interface DashboardCardData {
    id: string;
    title: string;
    unit?: string;
    change: number;
    changeType: ChangeType;
    period: string;
    color: MuiColors;
    key: keyof DashboardData;
}

export interface DashboardData {
    total_sales_price: number;
    total_debts_price: number;
    total_price: number;
    total_payed_amount: number;
    number_of_customers: number;
}

export const dashboardCards: DashboardCardData[] = [
    {
        id: "totalOutstanding",
        title: "مجموع مطالبات",
        unit: "تومان",
        change: 12.4,
        changeType: "increase",
        period: "این ماه",
        color: "primary",
        key: "total_price",
    },
    {
        id: "overdueAmount",
        title: "مجموع بدهی‌ها",
        unit: "تومان",
        change: 3,
        changeType: "increase",
        period: "این هفته",
        color: "error",
        key: "total_debts_price",
    },
    {
        id: "collectedThisMonth",
        title: "فروش کل",
        unit: "تومان",
        change: 8.1,
        changeType: "increase",
        period: "نسبت به ماه قبل",
        color: "success",
        key: "total_sales_price",
    },
    {
        id: "activeCustomers",
        title: "مبلغ پرداخت شده",
        unit: "تومان",
        change: 6,
        changeType: "increase",
        period: "این ماه",
        color: "info",
        key: "total_payed_amount",
    },
    {
        id: "activeCredits",
        title: "تعداد مشتریان",
        change: 12,
        changeType: "neutral",
        period: "تسویه شده این ماه",
        color: "secondary",
        key: "number_of_customers",
    },
];