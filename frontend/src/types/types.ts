export interface DebtType {
    id: number,
    customer: number,
    customer_name: string,
    customer_phone: string,
    sale: number,
    amount: number,
    paid_amount: number,
    remaining: number,
    is_paid: boolean,
    items: {
        id: number;
        product_id: number;
        product_name: string;
        quantity: number;
        price: number;
    }[];
    description: string,
    created_at: string,
    status: "active" | "overdue" | "settled"
}

export interface SaleType {
    id: number,
    shop: number,
    customer: number,
    customer_name: string,
    items: {
        id: number,
        product_id: number,
        product_name: string,
        quantity: number,
        price: number
    }[],
    total: number,
}

export type ProductType = {
    id: number;
    name: string;
    barcode?: string;
    buy_price: number;
    sell_price: number;
    exp_date?: string;
    image?: string;
    category: string;
    stock: number;
    description?: string;
}

export interface CustomerType {
    id: number | string,
    phone_number: string,
    full_name: string
}

export interface CustomersListType {
    id: number | string,
    phone_number: string,
    full_name: string,
    paid_amount: number,
    remaining_amount: number,
    total_debts: number
}

export interface ShopType {
    shop_id: number,
    shop_name: string,
    shop_address: string,
    total_amount: number,
    number_of_debts: number
}

export interface ModalCustomersType {
    id: number,
    full_name: string,
    phone_number: string,
}

export interface ModalProductsType {
    id: number,
    name: string,
    barcode?: string,
    sell_price: number,
}

export interface ModalDebtsType {
    id: number,
    remaining: number,
    created_at: string,
    is_paid: boolean,
}


// products search params
export interface GetProductsParams {
    search?: string;
    category?: string;
    // page?: number;
    // ordering?: string;
}