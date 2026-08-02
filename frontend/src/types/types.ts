// debts

import { PublicTurborepoAccessTraceResult } from "next/dist/build/turborepo-access-trace/types";

export interface DebtType {
  id: number;
  debt_id: string;
  customer: number;
  customer_name: string;
  customer_phone: string;
  sale: number;
  amount: number;
  paid_amount: number;
  remaining: number;
  is_paid: boolean;
  items: {
    id: number;
    product_id: number;
    product_name: string;
    quantity: number;
    price: number;
    total: number;
  }[];
  description: string;
  created_at: string;
  payments?: PaymentType[];
  status: "active" | "overdue" | "settled";
}

export interface DebtsListType {
  id: number;
  debt_id: string;
  customer_name: string;
  total_amount: number;
  paid_amount: number;
  remaining_amount: number;
  is_paid: boolean;
  created_at: string;
}

// sales

export interface SaleType {
  id: number;
  shop: number;
  customer: number;
  customer_name: string;
  items: {
    id: number;
    product_id: number;
    product_name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
}

export interface SalesListType {
  id: number;
  customer_name: string;
  total: number;
  created_at: string;
}

// products
export type ProductType = {
  id: number;
  name: string;
  barcode?: string;
  buy_price: number;
  sell_price: number;
  exp_date?: string;
  image?: string;
  category?: number;
  category_name?: string;
  stock: number;
  description?: string;
};
export type ProductsListType = {
  id: number;
  name: string;
  barcode?: string;
  sell_price: number;
  image?: string;
  stock: number;
};

export interface CatergoyType {
  id: number;
  name: string;
}

// customers

export interface CustomerType {
  id: number | string;
  phone_number: string;
  full_name: string;
}

export interface CustomersListType {
  id: number | string;
  phone_number: string;
  full_name: string;
  paid_amount: number;
  remaining_amount: number;
  total_debts: number;
}

// shop

export interface ShopType {
  shop_id: number;
  shop_name: string;
  shop_address: string;
  total_amount: number;
  open_debts_count: number;
  total_paid: number;
  total_remaining: number;
  last_purchase: string;
  settlement_percentage: number;
}
export interface ShopDetailType {
  shop_id: number;
  shop_name: string;
  shop_address: string;
  open_debts_count: number;
  total_paid: number;
  total_remaining: number;
  last_purchase: string;
  settlement_percentage: number;
}

// modals
export interface ModalCustomersType {
  id: number;
  full_name: string;
  phone_number: string;
}

export interface ModalProductsType {
  id: number;
  name: string;
  barcode?: string;
  sell_price: number;
}

export interface ModalDebtsType {
  id: number;
  remaining: number;
  created_at: string;
  is_paid: boolean;
}

// products search params
export interface GetProductsParams {
  search?: string;
  category?: string;
  page?: number;
  ordering?: string;
  stock_status?: string;
}

// payments

export interface PaymentType {
  id: number;
  customer_name: string;
  customer_phone: string;
  amount: number;
  created_at: string;
  debt_id: number;
  payment_id: string;
}
export interface PaymentsListType {
  id: number;
  customer_name: string;
  customer_phone: string;
  amount: number;
  created_at: string;
  debt_id: number;
  payment_id: string;
}

//  activity

export interface ActivityType {
  id: number;
  action: "create" | "update" | "delete";
  created_at: string;
  entity: "customer" | "product" | "debt" | "sale" | "payment";
  title: string;
  object_id: number;
}

//  reports

export type SalesTrend = {
  date: string;
  cash: number;
  debt: number;
  total: number;
};

export type PaymentsTrend = {
  date: string;
  total: number;
  count: number;
};

export type DebtsTrend = {
  date: string;
  total: number;
  count: number;
};

export type ComposedTrend = {
  date: string;
  sales: number;
  payments: number;
};

export type PaymentDistribution = {
  cash: number;
  debt: number;
};

export type MonthlyRevenue = {
  month: string;
  total: number;
};

export type ReportsChartsType = {
  sales_trend: SalesTrend[];
  payments_trend: PaymentsTrend[];
  debts_trend: DebtsTrend[];
  composed_trend: ComposedTrend[];
  payment_distribution: PaymentDistribution;
  monthly_revenue: MonthlyRevenue[];
};
