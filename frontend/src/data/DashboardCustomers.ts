import { CustomerPayedType, CustomerType } from "@/types/customerType";


export const CustomersBranchName: Array<string> = [
    "مشتری", "شماره", "جمع حساب", "پرداخت شده", "باقیمانده", "",
]


export const CustomersPayments: Record<number, CustomerPayedType[]> = {
    1: [ // علیرضا (ترکیبی از کامل و تاخیری)
        { id: "101", amount: 4_000_000, paid: 4_000_000, date: "12 اردیبهشت", status: "settled" },
        { id: "102", amount: 4_000_000, paid: 4_000_000, date: "10 اردیبهشت", status: "settled" },
        { id: "103", amount: 4_000_000, paid: 4_000_000, date: "1 اردیبهشت", status: "settled" },
    ],
    2: [ // مریم حسینی (یک قسط Partial داره)
        { id: "201", amount: 2_500_000, paid: 2_500_000, date: "13 اردیبهشت", status: "settled" },
        { id: "202", amount: 2_500_000, paid: 1_000_000, date: "5 اردیبهشت", status: "partial" }, // نصفه پرداخت شده
    ],
    3: [], // رضا کریمی (هنوز پرداختی نداشته)
    4: [ // فاطمه احمدی (چند قسط Overdue داره)
        { id: "401", amount: 10_000_000, paid: 10_000_000, date: "12 اردیبهشت", status: "settled" },
        { id: "402", amount: 10_000_000, paid: 0, date: "1 اردیبهشت", status: "overdue" }, // زمانش گذشته و پرداخت نشده
        { id: "403", amount: 10_000_000, paid: 0, date: "20 فروردین", status: "overdue" }, // زمانش گذشته و پرداخت نشده
        { id: "404", amount: 10_000_000, paid: 10_000_000, date: "10 فروردین", status: "settled" },
        { id: "405", amount: 10_000_000, paid: 10_000_000, date: "1 فروردین", status: "settled" },
        { id: "406", amount: 9_000_000, paid: 9_000_000, date: "20 اسفند", status: "settled" },
    ],
    5: [ // حسن مرادی (همه Settled هستن چون حسابش تسویه شده)
        { id: "501", amount: 1_000_000, paid: 1_000_000, date: "12 اردیبهشت", status: "settled" },
        { id: "502", amount: 1_000_000, paid: 1_000_000, date: "1 اردیبهشت", status: "settled" },
    ],
    6: [ // کامران تهرانی (یک قسط Partial و یک قسط Overdue)
        { id: "601", amount: 1_500_000, paid: 500_000, date: "12 اردیبهشت", status: "partial" }, // بخشی از قسط
        { id: "602", amount: 1_500_000, paid: 0, date: "5 اردیبهشت", status: "overdue" }, // تاخیری
    ],
    7: [ // کامران تهرانی (همه فعال و کامل)
        { id: "701", amount: 1_500_000, paid: 1_500_000, date: "12 اردیبهشت", status: "settled" },
        { id: "702", amount: 1_500_000, paid: 1_500_000, date: "5 اردیبهشت", status: "settled" },
    ],
    8: [ // کامران تهرانی (ترکیبی)
        { id: "801", amount: 1_500_000, paid: 1_500_000, date: "12 اردیبهشت", status: "settled" },
        { id: "802", amount: 1_500_000, paid: 1_000_000, date: "5 اردیبهشت", status: "partial" }, // ناقص
    ],
};