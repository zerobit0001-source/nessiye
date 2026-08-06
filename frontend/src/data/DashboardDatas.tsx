import { ChangeType, MuiColors } from "@/types/handiTypes";
import { PaidRounded, PaymentsRounded, PersonAddRounded, PointOfSaleRounded, ReceiptLongRounded } from "@mui/icons-material";

export interface DashboardCardData {
    id: string;
    title: string;
    unit?: string;
    change: number;
    changeType: ChangeType;
    period: string;
    color: MuiColors;
    key: keyof DashboardData;
    icon? : React.ReactNode
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
        title: "فروش هفته",
        unit: "تومان",
        change: 12.4,
        changeType: "increase",
        period: "این ماه",
        color: "primary",
        key: "total_sales_price",
        icon : <PointOfSaleRounded color="primary" />
    },
    {
        id: "overdueAmount",
        title: "پرداخت‌های هفته",
        unit: "تومان",
        change: 3,
        changeType: "increase",
        period: "این هفته",
        color: "error",
        key: "total_payed_amount",
        icon : <PaymentsRounded color="error" />
    },
    {
        id: "collectedThisMonth",
        title: "بدهی‌های جدید هفته",
        unit: "تومان",
        change: 8.1,
        changeType: "increase",
        period: "نسبت به ماه قبل",
        color: "success",
        key: "total_debts_price",
        icon : <ReceiptLongRounded color="success" />
    },
    {
        id: "activeCredits",
        title: "تعداد مشتریان",
        change: 12,
        changeType: "neutral",
        period: "تسویه شده این ماه",
        color: "secondary",
        key: "number_of_customers",
        unit: "نفر",
        icon : <PersonAddRounded color="secondary" />
    },
];
