import { CustomersUsernameAndId } from "@/data/AutoCompletesData";
import { formPayMethod, MetodsType } from "./methods";
import { BranchMap, categories, Category } from "@/utils/filteringData";
import { CatergoyType, ProductType } from "./types";




export interface DebtModalFormType {
    customer_id?: CustomersUsernameAndId | null,
    items?: ProductType[] | [],
    price?: string | number,
}



export interface PaymentModalFormType {
    customer?: CustomersUsernameAndId | null,
    debts?: CustomersUsernameAndId | null,
    price?: string | number,
    method: formPayMethod | null,
    date?: string,
    description?: string
}


export interface CustomerModalFormType {
    phone_number: string | number,
    code : string | number
}

export interface ProductModalFormType {
    name: string,
    barcode?: string | number,
    buy_price: string | number,
    sell_price: string | number,
    exp_date?: string | number,
    category?: number | null,
    description?: string
    stock?: number,
}