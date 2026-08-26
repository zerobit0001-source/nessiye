import { Customers, CustomersPayments, CustomerType, CustomerPayedType } from "@/data/DashboardCustomers";

// تعریف تایپ خروجی تابع
type CustomerResult = {
    customer: CustomerType | undefined;
    payeds: CustomerPayedType[] | undefined;
};

const GetCustomer = (id: string | number): CustomerResult => {
    const numericId = Number(id);

    // پیدا کردن مشتری
    const customer = Customers.find(customer => customer.id === numericId);

    // گرفتن لیست پرداخت‌ها (اگر مشتری پیدا شد)
    // اگر customer وجود نداشته باشه، undefined برمی‌گرده
    const payeds = customer ? CustomersPayments[customer.id] : undefined;
 
    return { customer, payeds };
};

export default GetCustomer;