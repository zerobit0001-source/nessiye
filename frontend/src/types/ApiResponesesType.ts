import { CustomersListType, CustomerType, DebtType, ProductType, SaleType, ShopType } from "./types"




// sales
export interface GetSalesResponesType {
    ok: boolean,
    sales: Array<SaleType>
}

export interface PostSalesType {
    customer_id: number | null,
    items: { product_id: number, quantity: number }[]
}

// debts
export interface GetDebtsResponeseType {
    ok: boolean,
    debts: DebtType[]
}


// products
export interface GetProductsResponse {
    ok: boolean,
    products: ProductType[]
}
export interface GetProductResponse {
    ok: boolean,
    product: ProductType
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
export interface GetMyShopsResponse {
    ok: boolean,
    shops: ShopType[]
}
export interface GetShopDetailResponse {
    ok: boolean,
    sales: SaleType[],
    debts: DebtType[]
}

// payment
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