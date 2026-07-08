import { CatergoyType, CustomersListType, CustomerType, DebtsListType, DebtType, ModalCustomersType, ModalProductsType, PaymentsListType, PaymentType, ProductsListType, ProductType, SalesListType, SaleType, ShopType } from "./types"




// sales
export interface GetSalesResponesType {
    ok: boolean,
    sales: SalesListType[]
}

export interface PostSalesType {
    customer_id: number | null,
    items: { product_id: number, quantity: number }[]
}

// debts
export interface GetDebtsResponeseType {
    ok: boolean,
    debts: DebtsListType[]
}
export interface GetDebtByIdResponeseType {
    ok: boolean,
    debt: DebtType
}


// products
export interface GetProductsResponse {
    ok: boolean,
    products: ProductsListType[]
}
export interface GetProductResponse {
    ok: boolean,
    product: ProductType
}
export interface GetCategoriesResponse {
    ok: boolean,
    categories: CatergoyType[]
}
export interface PostProductsType {
    name: string,
    barcode: string,
    buy_price: number,
    sell_price: number,
    exp_date?: string,
    stock: number,
    category?: number | null,
    description?: string
}


// customers
export interface GetCustomersResponse {
    ok: boolean,
    customers: CustomersListType[]
}
export interface GetCustomerResponse {
    ok: boolean,
    customer: CustomerType,
    summary: {
        total_debt: number,
        total_paid: number,
        total_remaining: number
    }
}
export interface GetCustomerDetailsResponse {
    ok: boolean,
    customer: CustomerType,
    sales: SaleType[],
    debts: DebtType[]
}

// account
export interface GetMeResponse {
    ok: boolean,
    total_amount: number,
    number_of_debts: number,

    shops: ShopType[]
}
export interface GetShopDetailResponse {
    ok: boolean,
    sales: SaleType[],
    debts: DebtType[]
}

// payment

export interface GetPaymentsResponse {
    ok: boolean,
    payments: PaymentsListType[]
}

export interface addPaymentResponse {
    ok: boolean,
    message: string,
    error?: string,
    debt: DebtType
}
export interface PostPaymentBody {
    debt_id: number | string,
    amount: number,
    pay_full: boolean
}

// modal customers
export interface GetModalsCustomersResponse {
    ok: boolean,
    customers: ModalCustomersType[]
}

// modal products
export interface GetModalsProductsResponse {
    ok: boolean,
    products: ModalProductsType[]
}

// modal debts
export interface GetModalsDebtsResponse {
    ok: boolean,
    debts: DebtType[]
}