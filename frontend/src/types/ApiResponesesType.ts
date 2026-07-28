import {
  ActivityType,
  CatergoyType,
  CustomersListType,
  CustomerType,
  DebtsListType,
  DebtType,
  ModalCustomersType,
  ModalProductsType,
  PaymentsListType,
  PaymentType,
  ProductsListType,
  ProductType,
  SalesListType,
  SaleType,
  ShopDetailType,
  ShopType,
} from "./types";

// sales
export interface GetSalesResponesType {
  ok: boolean;
  count: number;
  page: number;
  page_size: number;
  total_pages: number;
  results: SalesListType[];
  summary: {
    total_count: number;
    total_amount: number;
    today_count: number;
    today_total: number;
    this_month_cash: number;
    this_month_debt: number;
  };
}

export interface GetSaleByIdResponeseType {
  ok: boolean;
  sale: SaleType;
}

export interface PostSalesType {
  customer_id?: number | null;
  items: { product_id: number; quantity: number }[];
  is_debt: boolean;
}

// debts
export interface GetDebtsResponeseType {
  ok: boolean;
  count: number;
  page: number;
  page_size: number;
  total_pages: number;
  results: DebtsListType[];
  summary: {
    total: number;
    total_amount: number;
    settled: number;
    partial: number;
    overdue: number;
  };
}
export interface GetDebtByIdResponeseType {
  ok: boolean;
  debt: DebtType;
}

// products
export interface GetProductsResponse {
  ok: boolean;
  count: number;
  page: number;
  page_size: number;
  total_pages: number;
  results: ProductsListType[];
  summary: {
    total_count: number;
    total_stock: number;
    stocked: number;
    low_stock: number;
    out_of_stock: number;
  };
}
export interface GetProductResponse {
  ok: boolean;
  product: ProductType;
}
export interface GetCategoriesResponse {
  ok: boolean;
  categories: CatergoyType[];
}
export interface PostProductsType {
  name: string;
  barcode: string;
  buy_price: number;
  sell_price: number;
  exp_date?: string;
  stock: number;
  category?: number | null;
  description?: string;
}

// customers
export interface GetCustomersResponse {
  ok: boolean;
  count: number;
  page: number;
  page_size: number;
  total_pages: number;
  results: CustomersListType[];
  summary: {
    total: number;
    new_this_month: number;
    active: number;
    settled: number;
    overdue: number;
  };
}
export interface GetCustomerResponse {
  ok: boolean;
  customer: CustomerType;
  summary: {
    total_debt: number;
    total_paid: number;
    total_remaining: number;
  };
}
export interface GetCustomerDetailsResponse {
  ok: boolean;
  customer: CustomerType;
  sales: SaleType[];
  debts: DebtType[];
}

// account
export interface GetMeResponse {
  ok: boolean;
  full_name: string;
  shops: ShopType[];
  summary: {
    total_paid: number;
    total_remaining: number;
    open_debts_count: number;
    number_of_shops: number;
  };
}
export interface GetShopDetailResponse {
  ok: boolean;
  shop: ShopDetailType;
}

// payment

export interface GetPaymentsResponse {
  ok: boolean;
  count: number;
  page: number;
  page_size: number;
  total_pages: number;
  results: PaymentsListType[];
}

export interface addPaymentResponse {
  ok: boolean;
  message: string;
  error?: string;
  debt: DebtType;
}
export interface PostPaymentBody {
  debt_id: number | string;
  amount: number;
  pay_full: boolean;
}

export interface GetPaymentByIdResponeseType {
  ok: boolean;
  payment: PaymentType;
}

// modal customers
export interface GetModalsCustomersResponse {
  ok: boolean;
  customers: ModalCustomersType[];
}

// modal products
export interface GetModalsProductsResponse {
  ok: boolean;
  products: ModalProductsType[];
}

// modal debts
export interface GetModalsDebtsResponse {
  ok: boolean;
  debts: DebtType[];
}

// dasboard

export interface GetDashboardCardsResponse {
  ok: boolean;
  data: {
    total_sales_price: number;
    total_debts_price: number;
    total_price: number;
    total_payed_amount: number;
    number_of_customers: number;
    low_stock_products: ProductsListType[];
    recent_activities: ActivityType[];
    today_debts: number;
    today_paid: number;
    today_sales: number;
    top_debtors: {
      customer_name: string;
      phone_number: string;
      total_debt: number;
      total_paid: number;
      remaining: number;
    }[];
  };
}
