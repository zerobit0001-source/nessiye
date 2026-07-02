type statusType = "active" | "overdue" | "settled" | "partial"

export type CustomerType = {
    id: number,
    full_name: string,
    phone_number: string,
    totalCredit?: number,
    paid?: number,
    status?: statusType,
    lastPayment?: string
}



export interface CustomerPayedType {
    id: string,
    amount: number,
    paid: number
    date: string,
    status: statusType
}
